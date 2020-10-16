import React from 'react'
import { Image } from 'react-bootstrap'
import { PaymentHistoryDocument } from '../../../types/firebase'
import styles from './index.module.scss'

const ListTransactionsItem = ({
	icon,
	total,
	created_at,
}: PaymentHistoryDocument) => {
	return (
		<div className={styles.pageHistory_serviceWrap}>
			<div className={styles.pageHistory_service}>
				<div className={styles.pageHistory_service__des}>
					<div className={styles.pageHistory_service__icon}>
						<Image src={icon} width="50px" />
					</div>
					<div className={styles.pageHistory_service__text}>
						<div className="mb-1">Mua dịch vụ tăng like</div>
						<div style={{ color: '#666666' }}>
							{new Date(created_at).toLocaleTimeString('vi')}
						</div>
					</div>
				</div>
				<div className={styles.pageHistory_service__sta}>
					<div className={styles.pageHistory_service__price}>
						{total.toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListTransactionsItem
