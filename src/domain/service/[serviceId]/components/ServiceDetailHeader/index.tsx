import React from 'react'
import {Form, Image} from 'react-bootstrap'
import styles from './index.module.scss'

const ServiceDetailHeader = () => {
	return (
		<div className={styles.header_service}>
			<div className={styles.header_service__title}>
				<Image
					className={styles.header_service__img}
					src="/images/iconLike.png"
					fluid
				/>
				Dịch vụ like
			</div>

			<Form.Check checked type="switch" id="custom-switch" label="" />
		</div>
	)
}

export default ServiceDetailHeader
