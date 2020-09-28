import CenteredSpinner from 'components/CenteredSpinner'
import ActionPreview from 'domain/service/[serviceId]/action/components/ActionPreview'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React from 'react'
import {Row} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {ServiceActionDocument} from 'types/firebase'
import styles from './index.module.scss'

const ServiceActionFormSettingsPage = () => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [actions, loading] = useCollectionData<ServiceActionDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions')
	)

	return (
		<MainLayout
			title="Cài đặt form"
		>
			{
				loading && <CenteredSpinner />
			}
			{
				actions && (
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
						</Row>
					</ServiceDetailContainer>
				)
			}
		</MainLayout>
	)

}
export default ServiceActionFormSettingsPage
