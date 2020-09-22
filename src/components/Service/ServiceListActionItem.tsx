import Link from 'next/link'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import styles from './index.module.scss'

interface IServiceListActionItemProps {
	iconUrl: string
	name: string
}

const ServiceListActionItem = ({iconUrl, name}: IServiceListActionItemProps) => (
	<Col xs={4} xl={3}>
		<Link
			href="[id]/settings"
			as={`/${uuidv4()}/settings`}
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

export default ServiceListActionItem 