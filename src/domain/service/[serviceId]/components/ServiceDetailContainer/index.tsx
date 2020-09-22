import React from 'react'
import ServiceDetailHeader from '../ServiceDetailHeader'
import ServiceDetailMenu from '../ServiceDetailMenu'
import styles from './index.module.scss'

const ServiceDetailContainer = (props: {children: any}) => (
	<div className={styles.ServiceManager}>
		<ServiceDetailHeader />
		<div className={styles.ServiceManager_main}>
			<ServiceDetailMenu />
			{
				props.children
			}
		</div>
	</div>
)

export default ServiceDetailContainer