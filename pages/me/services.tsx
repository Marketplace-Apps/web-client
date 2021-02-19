import useTranslation from "next-translate/useTranslation"
import React from "react"
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { FcSalesPerformance, FcUnlock, FcWorkflow } from "react-icons/fc"
import { useCollectionData } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { IconButton } from "../../components/common/IconButton"
import { usePricePackageManagerModal } from "../../components/me/price-package-manager/PricePackageManagerModal"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"
import { PricePackage } from "../../types"



export const ServiceConfigPage = () => {

    const { t } = useTranslation('common')
    const domain = useDomain()
    const me = useCurrentUser()
    const { showPricePackageManagerModal, PricePackageManagerModal, loading } = usePricePackageManagerModal()
    const { items: packages } = useCollectionData<PricePackage>(domain && `domains/${domain.id}/packages`)
    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.ServiceManager.name}>
            {PricePackageManagerModal}
            <Row>
                <Col xs={12} className="text-right">
                    <IconButton
                        onClick={() => showPricePackageManagerModal()}
                        disabled={loading}
                    > {t('create')}</IconButton>

                </Col>
                {
                    packages.map((price_package, index) => (
                        <Col xs={12} md={6} xl={3} lg={4} className="p-2">
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={() => showPricePackageManagerModal(price_package)}
                            >
                                <Card.Header>
                                    {price_package.id == 'root' && <FcUnlock size={25} className="mr-1" />}
                                    {price_package.id == 'default' && <FcWorkflow size={25} className="mr-1" />}
                                    {['default', 'root'].every(id => id != price_package.id) && <FcSalesPerformance size={25} className="mr-1" />}
                                    <span className="ml-2">
                                        {price_package.name}
                                    </span>
                                    {price_package.id == 'default' && <Badge className="ml-1" variant="primary">Default</Badge>}
                                </Card.Header>
                                <Card.Body className="p-2">
                                    {price_package.description || '*'}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </MainLayout>
    )
}


export default ServiceConfigPage