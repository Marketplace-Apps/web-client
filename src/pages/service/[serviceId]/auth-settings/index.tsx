import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Form} from 'react-bootstrap'
import styles from './index.module.scss'

const ServiceActionAuthSettingsPage = () => (
	<MainLayout
		title="Cài đặt xác thực"
	>
		<ServiceDetailContainer>
			<Form className={styles.ServiceManager__form}>
				<Form.Group>
					<Form.Control as="select" custom>
						<option disabled>API Key</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" placeholder="Tên headers" />
				</Form.Group>
				<Form.Group>
					<Form.Control type="text" placeholder="Value" />
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

export default ServiceActionAuthSettingsPage
