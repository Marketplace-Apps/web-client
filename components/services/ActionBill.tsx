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

    const { item: package_prices } = useDocumentData<PricePackage>(domain && user && `domains/${domain.id}/packages/${user?.level || 'default'}`)

    const ctx: PriceFunctionParams = { ...props, user, payload, package_prices: package_prices?.prices[props.service_id] }

    const total_bill = useMemo<ReturnType<ServiceProviderAction['price']>>(() => {
        if (!user || !package_prices) return 0
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

    const discount = 0//voucher ? caculate_voucher(voucher, props.service_id, user, total_bill.total, payload?.server || 1) : 0

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
                                ref={form.register}
                                disabled={voucher}
                                name="voucher"
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-primary"
                                    onClick={voucher ? clear : check_voucher}
                                    disabled={loading}
                                >{voucher ? t('edit') : t('check')}</Button>
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