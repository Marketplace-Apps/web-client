import {useRouter} from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import styles from './index.module.scss'

type ServiceDetailMenuItemProps = {
	Icon: string
	title: string
	route: string
}

const ServiceDetailMenuItem = ({
	Icon,
	route,
	title
}: ServiceDetailMenuItemProps) => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const href = `/domain/[domainId]/service/[serviceId]${route}`
	const as = `/domain/${domainId}/service/${serviceId}${route}`

	return (
		<Col xs={6} md={3} className="mb-4">
			<div
				className={styles.ServiceManager_BoxItem}
				style={{
					backgroundColor:
						router.pathname === href
							? ' rgba(196, 196, 196, 0.33)'
							: '#fff',
					margin: '0 auto',
				}}
			>
				<Link
					href={href}
					as={as}>
					<div
						style={{
							cursor: "pointer"
						}}
					>
						<Image
							className={styles.ServiceManager_BoxItem__img}
							src={Icon}
							fluid
						/>
						<div className={styles.ServiceManager_BoxItem__text}>
							{title}
						</div>
					</div>
				</Link>
			</div>
		</Col>
	)
}

export default ServiceDetailMenuItem
