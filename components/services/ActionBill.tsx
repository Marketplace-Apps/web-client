import { Fragment, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { Domain, DomainService, Order, ServiceProvider, ServiceProviderAction, User } from "../../types"
import { Bill } from "./Bill"
import useTranslation from 'next-translate/useTranslation'

export interface PriceFunctionContext { 
    domain: Domain,
    domain_service: DomainService,
    action: ServiceProviderAction
    user: User,
    order?: Order,
    payload?: any
}

export type ActionBill = Omit<PriceFunctionContext, "user" | "payload">

export const ActionBill = (props: ActionBill) => {

    const form = useFormContext()
    const user = useCurrentUser()
    const payload = form.watch()
    const ctx: PriceFunctionContext = { ...props, user, payload }
    const action = props.action
    const { t } = useTranslation('common')

    const total_bill = useMemo<number>(() => {
        try {
            return action?.price ? SanboxJS.eval(action?.price, ctx) : 0
        } catch (e) {
            return 0
        }
    }, [props])

    return total_bill != 0 && (
        <Fragment>
            <Bill total={total_bill} text={t('order_total')} />
            <Bill
                total={user?.balance}
                text={t('my_balance')}
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 