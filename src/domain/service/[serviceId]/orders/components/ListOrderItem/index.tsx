import React from 'react'
import {Col} from 'react-bootstrap'
import styles from './index.module.scss'

type ListOrderItemProps = {
	onShowDetailOrderModal: () => void
	customerFullname: string
	created_time: number
	id: string
	content: string
}

const ListOrderItem = ({
	onShowDetailOrderModal,
	customerFullname,
	created_time,
	id,
	content

}: ListOrderItemProps) => (
		<>
			<Col xs={12} md={6} lg={6} xl={6}>
				<div className={styles.order_item} onClick={onShowDetailOrderModal}>
					<div className={styles.order_item__title}>
						<div className={styles.order_item__name}>{customerFullname}</div>
						<div className={styles.order_item__time}>{new Date(created_time).toLocaleString()}</div>
					</div>
					<div className={styles.order_item__idOrder}>{id}</div>
					<div className={styles.order_item__content}>{content}</div>
				</div>
			</Col>
		</>
	)

export default ListOrderItem
