
import { useRouter } from 'next/router'
import React from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { useDocumentData, Response } from 'react-livequery-hooks'
import { ServiceProvider, ServiceProviderAction } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { ActionModal } from '../../../components/services/ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ServiceNav } from '../../../components/services/ServiceNav'
import { BASE_URL } from '../../../const'

export type ServiceCreateOrderPage = {
	create_action: ServiceProviderAction
	service: ServiceProvider
}

const ServiceCreateOrderPage = ({ create_action, service }: ServiceCreateOrderPage) => {

	const router = useRouter()
	const { t } = useTranslation('common')

	const { item: domain_service } = useDocumentData<ServiceProvider>(create_action && `services/${create_action.service_id}`)

	return (
		<MainLayout title={domain_service?.name || { en: 'Services', vi: 'Dịch vụ' }}>

			<Row style={{ marginTop: 10, marginBottom: 15 }}>

				<Col xs={12} ><ServiceNav service={service} />	</Col>
				<Col xs={12}>
					{create_action && <ActionModal
						service_id={create_action.service_id}
						onSuccess={() => {
							router.push(`/services/${router.query.service_id}/history`)
							setTimeout(() => window.scroll(0, 0), 1000)
						}}
						action={create_action}
					/>}
				</Col>
			</Row>



		</MainLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const services = await fetch(`${BASE_URL}services`).then(r => r.json()) as Response<ServiceProvider>
	return {
		fallback: true,
		paths: services.data.items.map(s => `/services/${s.id}`)
	}
}

export const getStaticProps: GetStaticProps<{}> = async ctx => {
	const { service_id } = ctx.params
	const service = await fetch(`${BASE_URL}services/${service_id}`).then(r => r.json()) as ServiceProvider
	const create_action = await fetch(`${BASE_URL}services/${service_id}/actions/create`).then(r => r.json()) as ServiceProviderAction
	return { props: { create_action, service } }
}


export default ServiceCreateOrderPage
