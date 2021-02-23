import React from "react"
import { Col } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AppRouteList } from "../../AppRouteList"
import { PricePackageManagerCategory } from "../../components/me/price-package-manager/PricePackageManagerCategory"
import { PricePackageManagerContext } from "../../components/me/price-package-manager/PricePackageManagerContext"
import { ServiceList } from "../../const"
import { useDomainUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { useUserDefaultPricesPackage } from "../../hooks/usePricePackages"
import { useGroupedServices } from "../../hooks/useServices"
import { MainLayout } from "../../layouts/MainLayout"



export const PricesPage = () => {
    const grouped_services = useGroupedServices()
    const { current_domain, root_domain } = useDomain()
    const me = useDomainUser(root_domain || current_domain)
    const form = useForm() as any
    const import_price = useUserDefaultPricesPackage(me)

    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.Prices.name}>
            {
                ServiceList.map(category => (
                    <Col xs={12} className="p-0 mt-3">
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