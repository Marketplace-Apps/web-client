import {auth, firestore} from 'firebase'
import {useRouter} from 'next/router'
import React from 'react'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainDocument} from 'types/firebase'
import ServiceDetailHeader from '../ServiceDetailHeader'
import ServiceDetailMenu from '../ServiceDetailMenu'
import styles from './index.module.scss'

const ServiceDetailContainer = (props: {children: any}) => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}
	const isOnwer = JSON.parse(localStorage.getItem('owner'))

	const [domain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	return (
		<div className={styles.ServiceManager}>
			<ServiceDetailHeader />
			<div className={styles.ServiceManager_main}>
				<ServiceDetailMenu
					isOwner={
						isOnwer || auth().currentUser.email === domain?.owner
					}
				/>
				{
					props.children
				}
			</div>
		</div>
	)
}

export default ServiceDetailContainer