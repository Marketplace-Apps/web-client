import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import styles from './index.module.scss'

interface IActionPreviewProps {
	icon: string
	name: string
	id: string
}

const ActionPreview = ({
	icon,
	name,
	id
}: IActionPreviewProps) => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	return (
		<Col
			xs={6}
			md={3}
			className="mb-4"
			style={{cursor: "pointer"}}
		>
			<Link
				href={`${router.pathname}/[actionId]`}
				as={`/domain/${domainId}/service/${serviceId}/action/${id}`}
			>
				<div className={styles.singleOrder__touch}>
					<div className="text-center">
						<Image
							className={styles.singleOrder__touchIcon}
							src={icon}
							fluid
						/>
					</div>
					<div className={styles.singleOrder__touchText}>{name}</div>
				</div>
			</Link>
		</Col>
	)
}

export default ActionPreview