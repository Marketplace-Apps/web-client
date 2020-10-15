import { auth } from 'firebase/app'
import Link from 'next/link'
import React from 'react'
import { Col, Image } from 'react-bootstrap'
import { DomainServiceDocument } from 'types/firebase'
import styles from '../index.module.scss'

const ServicePreview = ({
	icon,
	name,
	id,
	min_price,
}: DomainServiceDocument) => (
	<Col xs={4} xl={3}>
		<Link
			href={auth().currentUser ? '/service/[serviceId]' : '/auth/sign-in'}
			as={auth().currentUser ? `/service/${id}` : '/auth/sign-in'}
		>
			<div className={styles.service__item}>
				<Image fluid className={styles.service__img} src={icon} />
				<div className={styles.service__desc}>
					<h2 className={styles.service__text}>{name}</h2>
					<span className={styles.service__price}>{min_price}</span>
				</div>
			</div>
		</Link>
	</Col>
)

export default ServicePreview
