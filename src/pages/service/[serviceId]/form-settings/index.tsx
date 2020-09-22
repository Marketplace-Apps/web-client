import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import styles from './index.module.scss'

const ServiceActionFormSettingsPage = () => (
	<MainLayout
		title="Cài đặt form"
	>
		<ServiceDetailContainer>
			<h2 className={styles.ServiceManager__title}> Tích hợp dịch vụ</h2>
		</ServiceDetailContainer>
	</MainLayout>
)

export default ServiceActionFormSettingsPage
