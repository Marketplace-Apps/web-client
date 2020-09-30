import {firestore} from 'firebase'
import {useRouter} from 'next/router'
import React from 'react'
import {Form, Image} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainServiceDocument} from 'types/firebase'
import styles from './index.module.scss'

const ServiceDetailHeader = () => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [domainService, loadingDomainService] = useDocumentData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId)
	)

	const toogle = async (visible: boolean) => await firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).update({
		visible: !visible
	})

	return (
		<div className={styles.header_service}>

			{
				domainService && (
					<>
						<div className={styles.header_service__title}>
							<Image
								className={styles.header_service__img}
								src={domainService?.icon}
								thumbnail
								width="50px"
							/>
							{domainService?.name}
						</div>
						<Form.Check
							defaultChecked={domainService.visible}
							type="switch"
							id="custom-switch"
							label=""
							onClick={() => toogle(domainService.visible)}
						/>
					</>

				)
			}
		</div>
	)
}

export default ServiceDetailHeader
