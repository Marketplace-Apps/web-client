import CenteredSpinner from 'components/CenteredSpinner'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React from 'react'
import {Button, Form, Image} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainServiceDocument} from 'types/firebase'
import styles from './index.module.scss'

const ServiceActionGeneralSettingsPage = () => {

	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [service, loading] = useDocumentData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId)
	)

	return (
		<MainLayout
			title="Cài đặt chung"
		>
			{
				loading && <CenteredSpinner />
			}
			{
				service && (
					<ServiceDetailContainer>
						<div className={styles.ServiceManager_id}>
							<div className={styles.ServiceManager_id__text}>ID dịch vụ</div>
							<div className={styles.ServiceManager_id__id}>
								{service.id}
								<Image className="ml-3" src="/images/iconCopy.png" fluid />
							</div>
						</div>

						<Form className={styles.ServiceManager__form}>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Tên dịch vụ"
									name="name"
									defaultValue={service.name}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Icon"
									defaultValue={service.icon}
									name="icon"
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Giá hiển thị"
									defaultValue={service.min_price}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control as="select" custom>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Form.Control>
							</Form.Group>
							<div className="text-center">
								<Button
									style={{
										backgroundColor: '#3EADFD',
										color: '#fff',
										padding: '5px 20px',
									}}
									variant="outline-info"
								>
									Lưu
							</Button>
							</div>
						</Form>
					</ServiceDetailContainer>
				)
			}
		</MainLayout>
	)
}

export default ServiceActionGeneralSettingsPage
