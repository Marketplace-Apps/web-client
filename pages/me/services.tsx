import React from "react"
import { AppRouteList } from "../../AppRouteList"
import { SettingPrice } from "../../components/me/SettingPrice"
import { MainLayout } from "../../layouts/MainLayout"



export const ServiceConfigPage = () => {
    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.ServiceManager.name}>
            <SettingPrice />
        </MainLayout>
    )
}


export default ServiceConfigPage