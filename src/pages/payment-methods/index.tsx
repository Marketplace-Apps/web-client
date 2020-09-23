import CreateUpdatePaymentMethodModal from 'domain/payment-methods/components/CreateUpdatePaymentMethodModal'
import ListPaymentMethodsItem from 'domain/payment-methods/components/ListPaymentMethodsItem'
import MainLayout from 'layouts/MainLayout'
import React, {useState} from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import styles from './index.module.scss'

const PAYMENT_METHODS = [
	{
		name: 'Dương Văn Ba',
		numberCard: ' 0301.0003.81458',
		address: 'Chi nhánh Hà Thành',
		src: '/images/vietcombank.png',
	},
	{
		name: 'Dương Văn Ba',
		numberCard: ' 0301.0003.81458',
		address: 'Chi nhánh Hội Sở',
		src: '/images/techcombank.png',
	},
	{
		name: 'Dương Văn Ba',
		numberCard: '  0978.346.354',
		address: '',
		src: '/images/momo.png',
	},
]
const PaymentMethodsPage = () => {
	const [isShowCreateUpdatePaymentMethodModal, setIsShowCreateUpdatePaymentMethodModal] = useState<boolean>(false)

	const onShowCreateUpdatePaymentMethodModal = () => setIsShowCreateUpdatePaymentMethodModal(true)
	const onHideCreateUpdatePaymentMethodModal = () => setIsShowCreateUpdatePaymentMethodModal(false)

	return (
		<MainLayout
			title="Cài đặt thanh toán"
		>
			<CreateUpdatePaymentMethodModal
				show={isShowCreateUpdatePaymentMethodModal}
				onHide={onHideCreateUpdatePaymentMethodModal}
			/>
			<div className={styles.PaymentSettings}>
				<div className={styles.PaymentSettings__bank}>
					<div className={styles.pageAddCash}>
						{/* Bank     */}
						<Row>
							{PAYMENT_METHODS.map(item => (
								<ListPaymentMethodsItem
									ownerName={item.name}
									cardNumber={item.numberCard}
									department={item.address}
									bankLogoUrl={item.src}
								/>
							))}

							<Col xs={12} lg={12} xl={6}>
								<div className="text-center" style={{marginTop: '1rem'}}>
									<Image
										onClick={onShowCreateUpdatePaymentMethodModal}
										className="mt-2 p-3"
										src="/images/addplus.png"
										fluid
									/>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default PaymentMethodsPage
