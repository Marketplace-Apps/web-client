import { useAuth } from "firebase-easy-hooks"
import React from "react"
import { Col } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDocumentData } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { PricePackageManagerCategory } from "../../components/me/price-package-manager/PricePackageManagerCategory"
import { PricePackageManagerContext } from "../../components/me/price-package-manager/PricePackageManagerContext"
import { ServiceList } from "../../const"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { useGroupedServices } from "../../hooks/useServices"
import { MainLayout } from "../../layouts/MainLayout"
import { PricePackage } from "../../types"



export const PricesPage = () => { 
    const grouped_services = useGroupedServices()
    const domain = useDomain()
    const me = useCurrentUser()

    const default_level = me?.id == 'qWaArilaFUZqsq2vQ7lg5OkUnt32' ? 'root' : 'default'
    const { item: import_price } = useDocumentData<PricePackage>(domain && me && default_level && `domains/${domain.id}/packages/${me?.level || default_level}`)
    const form = useForm() as any
    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.Prices.name}>
            {
                ServiceList.map(category => (
                    <Col xs={12} className="pt-2 pl-4 pr-4 pb-2">
                        {import_price && <PricePackageManagerContext.Provider value={{
                            edit_mode: false,
                            form,
                            import_price,
                        }}>
                            <PricePackageManagerCategory
                                category={category}
                                services={[
                                    ...grouped_services.get(category.id)?.values() || []
                                ]}
                            />
                        </PricePackageManagerContext.Provider>}
                    </Col>
                ))
            }
        </MainLayout>
    )
}


export default PricesPage