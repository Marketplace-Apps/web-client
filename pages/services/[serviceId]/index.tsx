
import { useRouter } from 'next/router'
import React from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { useCollectionData, useDocumentData } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProviderAction } from '../../../types'
import { MainLayout } from '../../../layouts/MainLayout'
import { ActionModal } from '../../../components/services/ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { ServiceOrderHistory } from '../../../components/services/ServiceOrderHistory'

const ServiceDetailPage = () => {

	const domain = useDomain()
	const router = useRouter()
	const { t } = useTranslation('common')

	const { serviceId } = router.query

	const { item: domain_service } = useDocumentData<DomainService>(domain && serviceId && `domains/${domain.id}/services/${serviceId}`)
	const { item: create_action } = useDocumentData<ServiceProviderAction>(serviceId && `services/${serviceId}/actions/create`)

	return (
		<MainLayout title={domain_service?.name || { en: 'Services', vi: 'Dịch vụ' }}>

			<Row style={{ marginTop: 10, marginBottom: 15 }}>
				<Col xs={12} lg={6} className="d-flex justify-content-start align-items-center">
					<img src={domain_service?.icon} width={30} height={30} />
					<div style={{ marginLeft: 10, fontWeight: 'bold' }}>{domain_service?.name[router.locale]}</div>
				</Col>
				<Col xs={12}>
					<Tabs defaultActiveKey="create" className="mt-2">
						<Tab eventKey="about" title={t('introduce')} disabled>

						</Tab>
						<Tab eventKey="create" title={t('create')}>
							{
								create_action && <ActionModal
									domain_service={domain_service}
									onSuccess={() => {
										(document.querySelector(`a[data-rb-event-key="history"]`) as any).click();
										setTimeout(() => window.scroll(0,0), 1000)
									}}
									action={create_action}
								/>
							}
						</Tab>
						<Tab eventKey="history" title={t('history')}>
							<ServiceOrderHistory />
						</Tab>

						<Tab eventKey="api" title="API" disabled>

						</Tab>
					</Tabs>
				</Col>
			</Row>



		</MainLayout>
	)
}
export function getServerSideProps() {
	return {
		props: {}
	}
}
export default ServiceDetailPage
