import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Form, Image} from 'react-bootstrap'
import styles from './index.module.scss'

const ServiceActionGeneralSettingsPage = () => (
	<MainLayout
		title="Cài đặt chung"
	>
		<ServiceDetailContainer>
			<div className={styles.ServiceManager_id}>
				<div className={styles.ServiceManager_id__text}>ID dịch vụ</div>
				<div className={styles.ServiceManager_id__id}>
					#hf63yusdfhgdfbsdfbsgfn
						<Image className="ml-3" src="/images/iconCopy.png" fluid />
				</div>
			</div>

			<Form className={styles.ServiceManager__form}>
				<Form.Group>
					<Form.Control type="text" placeholder="Tên dịch vụ" />
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" placeholder="Icon" />
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" placeholder="Giá hiển thị" />
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
	</MainLayout>
)

export default ServiceActionGeneralSettingsPage
