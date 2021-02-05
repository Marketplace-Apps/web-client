



import { useRouter } from 'next/router'
import React from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { useCollectionData, useDocumentData, Response } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProvider, ServiceProviderAction } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { ActionModal } from '../../../components/services/ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { ServiceOrderHistory } from '../../../components/services/ServiceOrderHistory'
import { ActionApiDocument } from '../../../components/services/ApiDocument'
import { ApiDocumentTab } from '../../../components/services/ApiDocumentList'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ServiceNav } from '../../../components/services/ServiceNav'

const ServiceOrdersPage = ({ service }: { service: ServiceProvider<any> }) => {


    return (
        <MainLayout title={{ en: 'Order', vi: 'Order' }}>

            <Row style={{ marginTop: 10, marginBottom: 15 }}>
                <Col xs={12}> <ServiceNav service={service} /> </Col>
                <Col xs={12}>
                    <ServiceOrderHistory />
                </Col>
            </Row>



        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const services = await fetch(`https://api.ongmatmedia.com/livequery/services`).then(r => r.json()) as Response<ServiceProvider<any>>
    return {
        fallback: true,
        paths: services.data.items.map(s => `/services/${s.id}/history`)
    }
}

export const getStaticProps: GetStaticProps<{}> = async ctx => {
    const { service_id } = ctx.params
    const service = await fetch(`https://api.ongmatmedia.com/livequery/services/${service_id}`).then(r => r.json()) as ServiceProvider<any>
    return { props: { service } }
}


export default ServiceOrdersPage
