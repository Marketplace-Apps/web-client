import React, {useState} from 'react'
import {Button, Row} from 'react-bootstrap'
import CreateUpdateVoucherModal from '../../domain/vouchers/CreateUpdateVoucherModal'
import ListVouchersItem from '../../domain/vouchers/ListVouchersItem'
import VoucherDetailModal from '../../domain/vouchers/VoucherDetailModal'
import MainLayout from '../../layouts/MainLayout'
import styles from './index.module.scss'

const VouchersPage = props => {
	const [isShowVoucherDetailModal, setIsShowVoucherDetailModal] = useState<boolean>(false)
	const [isShowCreateUpdateVoucherModal, setIsShowCreateUpdateVoucherModal] = useState<boolean>(false)

	const onShowVoucherDetailModal = () => setIsShowVoucherDetailModal(true)
	const onCloseVoucherDetailModal = () => setIsShowVoucherDetailModal(false)

	const onShowCreateUpdateVoucherModal = () => setIsShowCreateUpdateVoucherModal(true)
	const onCloseCreateUpdateVoucherModal = () => setIsShowCreateUpdateVoucherModal(false)

	return (
		<MainLayout
			title="Quản lý voucher"
		>
			<VoucherDetailModal
				show={isShowVoucherDetailModal}
				onClose={onCloseVoucherDetailModal}
				title="Chi tiết voucher"
			/>
			<CreateUpdateVoucherModal
				show={isShowCreateUpdateVoucherModal}
				onClose={onCloseCreateUpdateVoucherModal}
				title="Tạo voucher"
			/>
			<div className={styles.vouchers}>
				<div className={styles.vouchers__addvoucher}>
					<Button
						onClick={onShowCreateUpdateVoucherModal}
						className={styles.vouchers__addvoucher_btn}
						style={{borderRadius: '20px'}}
						variant="outline-primary"
					>
						Thêm mã voucher
					</Button>
				</div>
				<Row className="mt-5 mb-5">
					<ListVouchersItem
						onOpenVoucherDetailModal={onShowVoucherDetailModal}
						code="Like30"
						quantity={25}
						remainDays={3}
					/>
				</Row>
			</div>
		</MainLayout>
	)
}

export default VouchersPage
