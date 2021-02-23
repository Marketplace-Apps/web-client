import { Fragment, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useDomainUser } from "../../hooks/useCurrentUser"
import { Order, PriceFunctionParams, PricePackage, Prices, ServiceProviderAction, User } from "../../types"
import { Bill } from "./Bill"
import useTranslation from 'next-translate/useTranslation'
import { Alert, Button, FormControl, InputGroup } from "react-bootstrap"
import { useVoucher } from "../../hooks/useVoucher"
import { useDomain } from "../../hooks/useDomain"
import { useUserDefaultPricesPackage } from "../../hooks/usePricePackages"



export type ActionBill = {
    user: User,
    order?: Order,
    fn: string,
    can_use_voucher?: boolean,
    service_id: string
}


export const ActionBill = (props: ActionBill) => {

    const form = useFormContext()
    const payload = form.watch()
    const { t } = useTranslation('common')

    const my_prices_package = useUserDefaultPricesPackage(props.user)

    const ctx: PriceFunctionParams = { ...props, user:props.user, payload, package_prices: my_prices_package?.prices[props.service_id] }

    const total_bill = useMemo<ReturnType<ServiceProviderAction['price']>>(() => {
        if (!props.user || !my_prices_package) return 0
        try {
            return SanboxJS.eval(props.fn, ctx)
        } catch (e) {
            console.error(e)
            return null
        }
    }, [ctx])

    const { discount, check, clear, error } = useVoucher(props.service_id, props.user, total_bill.total, payload.server || 1)

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
                                onChange={e => onChange(e.target.value.toUpperCase())}
                                onBlur={e => check(e.target.value)}
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

            {error && <Alert variant="danger">{error}</Alert>}

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
                total={props.user?.balance}
                text={t('my_balance')}
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 