import { useAuth } from "firebase-easy-hooks"
import React from "react"
import { AppRouteList } from "../../AppRouteList"
import { SettingPrice } from "../../components/me/SettingPrice"
import { MainLayout } from "../../layouts/MainLayout"



export const PricesPage = () => {
    const { user } = useAuth()
    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.Prices.name}>
            <SettingPrice 
            user_id={user.uid} 
            import_prices_only
            />
        </MainLayout>
    )
}


export default PricesPage