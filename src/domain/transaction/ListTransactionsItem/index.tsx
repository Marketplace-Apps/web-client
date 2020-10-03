import React from 'react'
import {Image} from 'react-bootstrap'
import styles from './index.module.scss'

interface IListTransactionsItemProps {
	created_at: number

}

const ListTransactionsItem = () => {
	return (
		<div className={styles.pageHistory_serviceWrap}>
			<div className={styles.pageHistory_service}>
				<div className={styles.pageHistory_service__des}>
					<div className={styles.pageHistory_service__icon}>
						<Image src="/images/order2.png" />
					</div>
					<div className={styles.pageHistory_service__text}>
						<div className="mb-1">Mua dịch vụ tăng like</div>
						<div style={{color: '#666666'}}> 16:24</div>
					</div>
				</div>
				<div className={styles.pageHistory_service__sta}>
					<div className={styles.pageHistory_service__price}>
						950000
					</div>
					<div className={styles.pageHistory_service__state}>Thành Công</div>
				</div>
			</div>
		</div>
	)
}

export default ListTransactionsItem
