import ActionDetailPageBody from 'domain/service/[serviceId]/action/[actionId]/components/ActionDetailPageBody'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React from 'react'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {ServiceActionConfigDocument, ServiceActionDocument} from 'types/firebase'

const ActionDetailPage = () => {

	const router = useRouter()
	const {domainId, serviceId, actionId} = router.query as {domainId: string, serviceId: string, actionId: string}

	const [action] = useDocumentData<ServiceActionDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(actionId)
	)

	const [actionConfig] = useDocumentData<ServiceActionConfigDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(`${actionId}_config`)
	)

	return (
		<MainLayout
			title="Cài đặt form"
		>
			{
				action && actionConfig && (
					<ActionDetailPageBody
						action={action}
						actionConfig={actionConfig}
					/>
				)
			}
		</MainLayout>
	)
}

export default ActionDetailPage