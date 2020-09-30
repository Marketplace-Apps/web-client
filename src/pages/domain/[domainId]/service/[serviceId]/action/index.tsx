import CenteredSpinner from 'components/CenteredSpinner'
import ActionPreview from 'domain/service/[serviceId]/action/components/ActionPreview'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainDocument, DomainServiceDocument, ServiceActionDocument} from 'types/firebase'
import styles from './index.module.scss'

const ServiceActionFormSettingsPage = () => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [actions, loadingServiceActions] = useCollectionData<ServiceActionDocument>(
		firestore().collection('services').doc(`${serviceId}_config`).collection('actions')
	)

	const [domain, loadingDomain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	const [service, loadingService] = useDocumentData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId)
	)

	const onCreateNewAction = () => {
		const actionId = firestore().collection('services').doc(`${serviceId}_config`).collection('actions').doc().id
		router.push(
			'/domain/[domainId]/service/[serviceId]/action/[actionId]',
			`/domain/${domainId}/service/${serviceId}/action/${actionId}`
		)
	}

	return (
		<MainLayout
			title="Cài đặt form"
		>
			{
				loadingServiceActions || loadingDomain || loadingService && <CenteredSpinner />
			}
			{
				(!domain && !loadingDomain) || (!service && !loadingService) && <Error statusCode={400} title="Không tồn tại dịch vụ này" />
			}
			{
				domain && service && (
					<ServiceDetailContainer>
						<h2 className={styles.ServiceManager__title}> Tích hợp dịch vụ</h2>
						<Row>
							{
								actions.map(action => (
									<ActionPreview
										icon={action.icon}
										name={action.name}
										id={action.id}
									/>
								))
							}
							<Col xs={6} md={3} className="mb-4 text-center">
								<Image
									className="mt-2 p-3"
									src="/images/addplus.png"
									fluid
									onClick={onCreateNewAction}
									style={{
										cursor: "pointer"
									}}
								/>
							</Col>
						</Row>

					</ServiceDetailContainer>
				)
			}
		</MainLayout>
	)

}
export default ServiceActionFormSettingsPage
