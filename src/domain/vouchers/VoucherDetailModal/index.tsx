import ModalHeader from 'components/ModalHeader'
import React from 'react'
import {Form, Modal} from 'react-bootstrap'
import styles from './index.module.scss'

type VoucherDetailModalProps = {
	show: boolean
	onClose: () => void
	title: string
}

const VoucherDetailModal = ({
	show,
	onClose,
	title
}: VoucherDetailModalProps) => {
	return (
		<Modal
			size="lg"
			show={show}
			onHide={onClose}
			keyboard={false}
		>
			<div className={styles.popupVoucher}>
				<ModalHeader
					onClose={onClose}
					title={title}
				/>
				<div className={styles.popupVoucher__content}>
					<div className={styles.popupVoucher__active}>
						<Form.Check
							checked
							type="switch"
							id="custom-switch"
							className={styles.popupVoucher__label}
							label="Kích hoạt"
						/>
					</div>
					<div className={styles.popupVoucher__line}>
						<div className={styles.popupVoucher__text}>Ngày mở</div>
						<div className={styles.popupVoucher__date}>23/12/2020 12:15</div>
					</div>
					<div className={styles.popupVoucher__line}>
						<div className={styles.popupVoucher__text}>Ngày đóng</div>
						<div className={styles.popupVoucher__date}>25/12/2020 12:15</div>
					</div>
					<div className={styles.popupVoucher__line}>
						<div className={styles.popupVoucher__text}>Số voucher đã dùng</div>
						<div className={styles.popupVoucher__date}>12/100</div>
					</div>
					<div className={styles.popupVoucher__line}>
						<div className={styles.popupVoucher__text}>Dịch vụ</div>
						<div className={styles.popupVoucher__date}>Tăng mắt, tăng like</div>
					</div>
					<div className={styles.popupVoucher__line}>
						<div className={styles.popupVoucher__text}>Yêu cầu tiền</div>
						<div className={styles.popupVoucher__date}>{`100k -> 200k`}</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default VoucherDetailModal
