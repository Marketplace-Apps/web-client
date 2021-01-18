import { Fragment, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { DomainService, DomainServicePrice, Order, User } from "../../types"
import { Bill } from "./Bill"
import useTranslation from 'next-translate/useTranslation'
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useAction } from "react-livequery-hooks"
import { caculate_voucher } from "../../helpers/caculate_voucher"



export type ActionBill = {
    domain_service: DomainService,
    order?: Order,
    fn: string,
    can_use_voucher?: boolean
}

export type PriceFunctionParams<T> = {
    domain_service: DomainService,
    user: User,
    order?: Order,
    payload?: T,
    prices: DomainServicePrice
}

export const ActionBill = (props: ActionBill) => {

    const form = useFormContext()
    const user = useCurrentUser()
    const payload = form.watch()
    const { t } = useTranslation('common')

    const server = props.order?.server || payload.server || 1
    const prices = user?.prices[props.domain_service.id][`SV${server}`] || props.domain_service?.prices[`SV${server}`]

    const ctx: PriceFunctionParams<any> = { ...props, user, payload, prices }


    const total_bill = useMemo<number>(() => {
        if (!user || !prices) return 0
        try {
            return SanboxJS.eval(props.fn, ctx)
        } catch (e) {
            console.error(e)
            return 0
        }
    }, [ctx])

    const { data, loading, excute, clear } = useAction(user && `domains/${user.domain_id}/vouchers`, 'GET')
    const voucher = (data?.data?.items || [])[0]

    function check_voucher() {
        const code = (document.querySelector('#voucher-input') as any).value.trim()
        excute({}, { code })
    }

    const discount = caculate_voucher(voucher, props.domain_service, user, total_bill, server)

    return total_bill != 0 && (
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
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-primary"
                                    onClick={voucher ? clear : check_voucher}
                                    disabled={loading}
                                >{voucher ? t('edit') : t('check')}</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    )}

                />
            )}

            <Bill
                total={total_bill - discount}
                text={t('order_total')}
                old_value={discount}
            />

            <Bill
                total={user?.balance}
                text={t('my_balance')}
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 