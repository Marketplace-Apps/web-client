import { Fragment, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { Order, PriceFunctionParams, PricePackage, Prices, ServiceProviderAction, User } from "../../types"
import { Bill } from "./Bill"
import useTranslation from 'next-translate/useTranslation'
import { Alert, Button, FormControl, InputGroup } from "react-bootstrap"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { caculate_voucher } from "../../helpers/caculate_voucher"
import { useDomain } from "../../hooks/useDomain"
import { useMyDefaultPricesPackage } from "../../hooks/usePricePackages"



export type ActionBill = {
    order?: Order,
    fn: string,
    can_use_voucher?: boolean,
    service_id: string
}


export const ActionBill = (props: ActionBill) => {


    const form = useFormContext()
    const user = useCurrentUser()
    const domain = useDomain()
    const payload = form.watch()
    const { t } = useTranslation('common')

    const my_prices_package = useMyDefaultPricesPackage()

    const ctx: PriceFunctionParams = { ...props, user, payload, package_prices: my_prices_package?.prices[props.service_id] }

    const total_bill = useMemo<ReturnType<ServiceProviderAction['price']>>(() => {
        if (!user || !my_prices_package) return 0
        try {
            return SanboxJS.eval(props.fn, ctx)
        } catch (e) {
            console.error(e)
            return null
        }
    }, [ctx])

    const { data, loading, excute, clear } = useAction(user && `domains/${user.domain_id}/vouchers`, 'GET')
    const voucher = (data?.data?.items || [])[0]

    function check_voucher() {
        const code = (document.querySelector('#voucher-input') as any).value.trim()
        excute({}, { code })
    }

    const discount = voucher ? caculate_voucher(voucher, props.service_id, user, total_bill.total, payload?.server || 1) : 0

    return total_bill && (
        <Fragment>

            {props.can_use_voucher && (
                <Controller
                    name="voucher"
                    control={form.control}
                    render={({ onChange, value }) => (
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Voucher"
                                id="voucher-input"
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                onBlur={check_voucher}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => { clear(), form.setValue('voucher', '') }}
                                >{t('cancel')}</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    )}

                />
            )}

            {((data && !voucher) || (voucher && discount == 0)) && <Alert variant="danger">{t('vouchers.invalid')}</Alert>}

            {
                discount > 0 && <Bill
                    total={-discount}
                    text={t('orders.discount')}
                />
            }

            <Bill
                total={total_bill.price}
                text={t('price')}
                background="linear-gradient(to right, #ff512f, #f09819)"
            />

            <Bill
                total={total_bill.total - discount}
                text={t('order_total')}
                old_value={discount > 0 && total_bill.total}
            />

            <Bill
                total={user?.balance}
                text={t('my_balance')}
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 