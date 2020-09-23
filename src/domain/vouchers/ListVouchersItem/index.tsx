import React from 'react'
import {Col} from 'react-bootstrap'
import styles from './index.module.scss'

type ListVouchersItemProps = {
	onOpenVoucherDetailModal: () => void
	code: string
	quantity: number
	remainDays: number
}

const ListVouchersItem = ({
	code,
	onOpenVoucherDetailModal,
	quantity,
	remainDays
}: ListVouchersItemProps) => (
	<Col xs={6} md={4} style={{margin: ' 0 auto', marginBottom: '1.5rem', cursor: "pointer"}}>
		<div
			onClick={onOpenVoucherDetailModal}
			className={styles.vouchers__voucher}
		>
			<div className={styles.vouchers__code}>{code}</div>
			<div className={styles.vouchers__des}>
				<div className={styles.vouchers__quantity}>{quantity}</div>
				<div className={styles.vouchers__days}>{remainDays}</div>
			</div>
		</div>
	</Col>
)

export default ListVouchersItem
