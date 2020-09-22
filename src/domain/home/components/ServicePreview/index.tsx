import Link from 'next/link'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import styles from '../index.module.scss'

interface IServiceListActionItemProps {
	iconUrl: string
	name: string
}

const ServicePreview = ({iconUrl, name}: IServiceListActionItemProps) => (
	<Col xs={4} xl={3}>
		<Link
			href="/service/[serviceId]/general-settings"
			as="/service/123/general-settings"
		>
			<div className={styles.service__item}>
				<Image fluid className={styles.service__img} src={iconUrl} />
				<div className={styles.service__desc}>
					<h2 className={styles.service__text}>{name}</h2>
					<span className={styles.service__price}>122$</span>
				</div>
			</div>
		</Link>
	</Col>
)

export default ServicePreview 