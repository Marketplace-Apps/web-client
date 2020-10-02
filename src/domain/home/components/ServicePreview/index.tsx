import Link from 'next/link'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import {DomainServiceDocument} from 'types/firebase'
import styles from '../index.module.scss'

const ServicePreview = ({icon, name, id, domainId}: DomainServiceDocument & {domainId: string}) => (
	<Col xs={4} xl={3}>
		<Link
			href="/service/[serviceId]"
			as={`/service/${id}`}
		>
			<div className={styles.service__item}>
				<Image fluid className={styles.service__img} src={icon} />
				<div className={styles.service__desc}>
					<h2 className={styles.service__text}>{name}</h2>
					<span className={styles.service__price}>122$</span>
				</div>
			</div>
		</Link>
	</Col>
)

export default ServicePreview 