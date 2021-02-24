import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { SanboxJS } from "../helpers/sandboxjs";
import { Order, PriceFunctionParams, ServiceProviderAction, User } from "../types";
import { useUserDefaultPricesPackage } from "./usePricePackages";
import { useVoucher } from "./useVoucher";


export type usePriceCaculator = {
    user: User,
    action: ServiceProviderAction
    payload: any
    order?: Order,
}

const usePriceCaculator = (props: usePriceCaculator) => {
    const { user, payload, action, order } = props
    const my_prices_package = useUserDefaultPricesPackage(user)
    const ctx: PriceFunctionParams = {
        user,
        payload,
        package_prices: my_prices_package?.prices[action.service_id]
    }

    const bill = useMemo<ReturnType<ServiceProviderAction['price']>>(() => {
        if (!user || !my_prices_package) return 0
        try {
            return SanboxJS.eval(action.price, ctx)
        } catch (e) {
            console.error(e)
            return 0
        }
    }, [ctx])

    const voucher = useVoucher(
        action.service_id,
        user,
        bill.total,
        payload.server || order.server || 1
    )

    return {
        ...voucher,
        ...bill,
        final_total: bill.total - voucher.discount,
        action,
        user
    }
}

const PriceCaculatorContext = createContext<ReturnType<typeof usePriceCaculator>>(null)


export const PriceCaculatorContextProvider = (props: PropsWithChildren<usePriceCaculator>) => {
    const ctx = usePriceCaculator(props)
    return (
        <PriceCaculatorContext.Provider value={ctx}>
            {props.children}
        </PriceCaculatorContext.Provider>
    )
}

export const usePriceCaculatorContext = () => useContext(PriceCaculatorContext)