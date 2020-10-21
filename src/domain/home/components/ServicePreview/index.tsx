import { auth } from 'firebase/app'
import Link from 'next/link'
import React from 'react'
import { Badge, Col, Image } from 'react-bootstrap'
import { DomainServiceDocument } from 'types/firebase'
import styles from '../index.module.scss'

const ServicePreview = ({
	icon,
	name,
	id,
	min_price,
	visible,
}: DomainServiceDocument) => {
	const href = visible
		? auth().currentUser
			? '/service/[serviceId]'
			: '/auth/sign-in'
		: ''
	const as = visible
		? auth().currentUser
			? `/service/${id}`
			: '/auth/sign-in'
		: ''

	const Children = () => (
		<div
			className={styles.service__item}
			style={{
				opacity: visible ? 1 : 0.45,
				cursor: visible ? 'pointer' : 'not-allowed',
			}}
		>
			<Image fluid className={styles.service__img} src={icon} />
			<div className={styles.service__desc}>
				<h2 className={styles.service__text}>{name}</h2>
				{visible && <span className={styles.service__price}>{min_price}</span>}
			</div>
			{!visible && (
				<Badge variant="warning" pill>
					Đang bảo trì
				</Badge>
			)}
		</div>
	)

	return (
		<Col xs={4} xl={3}>
			{!visible && <Children />}
			{visible && (
				<Link href={href} as={as}>
					<Children />
				</Link>
			)}
		</Col>
	)
}

export default ServicePreview
