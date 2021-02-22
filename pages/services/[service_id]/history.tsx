import React from 'react'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { Response } from 'react-livequery-hooks'
import { Order, ServiceProvider } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { ServiceOrderHistory } from '../../../components/services/ServiceOrderHistory'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ServiceNav } from '../../../components/services/ServiceNav'
import { BASE_URL } from '../../../const'

const ServiceOrdersPage = ({ service }: { service: ServiceProvider }) => {


    return (
        <MainLayout title={{ en: 'Order', vi: 'Order' }}>

            <Row style={{ marginTop: 10, marginBottom: 15 }}>
                <Col xs={12}  > <ServiceNav service={service} /> </Col>
                <Col xs={12}>
                    <ServiceOrderHistory />
                </Col>
            </Row>



        </MainLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const services = await fetch(`${BASE_URL}services`).then(r => r.json()) as Response<ServiceProvider>
    return {
        fallback: true,
        paths: services.data.items.map(s => `/services/${s.id}/history`)
    }
}

export const getStaticProps: GetStaticProps<{}> = async ctx => {
    const { service_id } = ctx.params
    const service = await fetch(`${BASE_URL}services/${service_id}`).then(r => r.json()) as ServiceProvider
    return { props: { service }, revalidate: 60 }
}


export default ServiceOrdersPage
