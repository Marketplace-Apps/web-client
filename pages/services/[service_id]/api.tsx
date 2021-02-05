import { useRouter } from 'next/router'
import React from 'react'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { Response } from 'react-livequery-hooks'
import { ServiceProvider, ServiceProviderAction } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ActionApiDocument } from '../../../components/services/ApiDocument'
import { ServiceNav } from '../../../components/services/ServiceNav'


export type ServiceApiPage = {
    service: ServiceProvider<any>
    actions: ServiceProviderAction[]
}

const ServiceApiPage = ({ actions = [], service  }: ServiceApiPage) => {

    const create_action = actions.filter(action => action.id == 'create')[0]
    const another_action = actions.filter(action => action.id != 'create')

    return (
        <MainLayout title={service?.name || { en: 'Services', vi: 'Dịch vụ' }}>

            <Row style={{ marginTop: 10, marginBottom: 15 }}>

                <Col xs={12}> <ServiceNav />     </Col>
                <Col xs={12}>
                    <Row noGutters >
                        <Col xs={12}>
                            {create_action && <ActionApiDocument action={create_action} />}
                            {
                                another_action.map(action => <ActionApiDocument
                                    action={action}
                                    key={action.id}
                                />)
                            }

                        </Col>
                    </Row>
                </Col>
            </Row>



        </MainLayout>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    const services = await fetch(`https://api.ongmatmedia.com/livequery/services`).then(r => r.json()) as Response<ServiceProvider<any>>
    return {
        fallback: true,
        paths: services.data.items.map(s => `/services/${s.id}/api`)
    }
}

export const getStaticProps: GetStaticProps<ServiceApiPage> = async ctx => {

    const { service_id } = ctx.params
    const service = await fetch(`https://api.ongmatmedia.com/livequery/services/${service_id}`).then(r => r.json()) as ServiceProvider<any>
    const { data: { items: actions } } = await fetch(`https://api.ongmatmedia.com/livequery/services/${service_id}/actions`)
        .then(r => r.json()) as Response<ServiceProviderAction>

    return { props: { service, actions } }
}

export default ServiceApiPage
