import { Fragment, useMemo } from "react"
import { useDocumentData } from "react-livequery-hooks"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { Order, Prices, ServiceProvider } from "../../types"
import { Bill } from "./Bill"

export type ActionBill = {
    service: ServiceProvider<any>,
    type: keyof Prices<any>,
    data: any,
    order?: Order
}
export const ActionBill = (props: ActionBill) => {

    const domain = useDomain()

    const me = useCurrentUser()

    const { item: prices } = useDocumentData(domain && `domains/${domain.id}/services/${props.service.id}`)

    const price_function = props.service.prices[props.type]
    const total_bill = useMemo<number>(() => prices && price_function ? SanboxJS.eval(price_function, {
        data: props.data,
        ...prices,
        ...props.order || {}
    }) : 0, [props.data])

    return total_bill != 0 && (
        <Fragment>
            <Bill total={total_bill} text="Tổng tiền" />
            <Bill
                total={me?.balance}
                text="Số dư của bạn"
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 