
import { useRouter } from 'next/router'
import React from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { useCollectionData, useDocumentData, Response } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProvider, ServiceProviderAction } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { ActionModal } from '../../../components/services/ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ServiceNav } from '../../../components/services/ServiceNav'

export type ServiceCreateOrderPage = {
	create_action: ServiceProviderAction
	service: ServiceProvider<any>
}

const ServiceCreateOrderPage = ({ create_action, service }: ServiceCreateOrderPage) => {

	const domain = useDomain()
	const router = useRouter()
	const { t } = useTranslation('common')

	const { item: domain_service } = useDocumentData<DomainService>(domain && create_action && `domains/${domain.id}/services/${create_action.service_id}`)

	return (
		<MainLayout title={domain_service?.name || { en: 'Services', vi: 'Dịch vụ' }}>

			<Row style={{ marginTop: 10, marginBottom: 15 }}>

				<Col xs={12} ><ServiceNav service={service} />	</Col>
				<Col xs={12}>
					<ActionModal
						domain_service={domain_service}
						onSuccess={() => {
							router.push(`/services/${router.query.service_id}/history`)
							setTimeout(() => window.scroll(0, 0), 1000)
						}}
						action={create_action}
					/>
				</Col>
			</Row>



		</MainLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const services = await fetch(`https://api.ongmatmedia.com/livequery/services`).then(r => r.json()) as Response<ServiceProvider<any>>
	return {
		fallback: true,
		paths: services.data.items.map(s => `/services/${s.id}`)
	}
}

export const getStaticProps: GetStaticProps<{}> = async ctx => {
	const { service_id } = ctx.params
	const service = await fetch(`https://api.ongmatmedia.com/livequery/services/${service_id}`).then(r => r.json()) as ServiceProvider<any>
	const create_action = await fetch(`https://api.ongmatmedia.com/livequery/services/${service_id}/actions/create`).then(r => r.json()) as ServiceProviderAction
	return { props: { create_action, service } }
}


export default ServiceCreateOrderPage
