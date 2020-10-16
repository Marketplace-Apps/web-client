import dayjs from 'libs/dayjs'
import React from 'react'
import { Col } from 'react-bootstrap'
import { OrderDocument } from '../../../../types/firebase'
import styles from './index.module.scss'

type ListOrderItemProps = {
	onShowDetailOrderModal: () => void
} & OrderDocument

const ListOrderItem = ({
	onShowDetailOrderModal,
	id,
	created_at,
	description,
	fullname,
}: ListOrderItemProps) => (
	<Col
		xs={12}
		md={6}
		lg={6}
		xl={6}
		style={{
			cursor: 'pointer',
		}}
	>
		<div className={styles.order_item} onClick={onShowDetailOrderModal}>
			<div className={styles.order_item__title}>
				<div className={styles.order_item__name}>{fullname}</div>
				<div className={styles.order_item__time}>
					{dayjs(new Date(created_at)).locale('vi').fromNow()}
				</div>
			</div>
			<div className={styles.order_item__idOrder}>{id}</div>
			<div className={styles.order_item__content}>{description}</div>
		</div>
	</Col>
)

export default ListOrderItem
