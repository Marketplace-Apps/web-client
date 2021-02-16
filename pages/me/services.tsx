import useTranslation from "next-translate/useTranslation"
import React from "react"
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { IoIosAddCircle } from "react-icons/io"
import { AppRouteList } from "../../AppRouteList"
import { SettingPrice } from "../../components/me/SettingPrice"
import { MainLayout } from "../../layouts/MainLayout"



export const ServiceConfigPage = () => {

    const { t } = useTranslation('common')

    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.ServiceManager.name}>
            <Row>
                <Col xs={12} className="text-right">
                    <Button>{t('create')}</Button>
                </Col>
                {
                    [1, 2, 3, 4, 5, 6].map(i => (
                        <Col xs={12} md={6} xl={3} lg={4} className="p-2">
                            <Card>
                                <Card.Header>
                                    <Badge variant="dark">{i}</Badge>
                                    <span className="ml-2">ADMIN {i}</span>
                                </Card.Header>
                                <Card.Body className="p-2">
                                    Dành cho đại lý
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