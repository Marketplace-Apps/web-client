import CreateUpdatePaymentMethodModal from 'domain/payment-methods/components/CreateUpdatePaymentMethodModal'
import ListPaymentMethodsItem from 'domain/payment-methods/components/ListPaymentMethodsItem'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {PaymentMethodDocument} from 'types/firebase'
import styles from './index.module.scss'

const PaymentMethodsPage = () => {

	const router = useRouter()
	const {domainId} = router.query as {domainId: string}

	const [isShowCreateUpdatePaymentMethodModal, setIsShowCreateUpdatePaymentMethodModal] = useState<boolean>(false)

	const onShowCreateUpdatePaymentMethodModal = () => setIsShowCreateUpdatePaymentMethodModal(true)
	const onHideCreateUpdatePaymentMethodModal = () => setIsShowCreateUpdatePaymentMethodModal(false)

	const [paymentMethods] = useCollectionData<PaymentMethodDocument>(
		firestore().collection('domains').doc(domainId).collection('payment_methods')
	)

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodDocument | null>(null)

	return (
		<MainLayout
			title="Cài đặt thanh toán"
		>
			<CreateUpdatePaymentMethodModal
				show={isShowCreateUpdatePaymentMethodModal}
				onHide={onHideCreateUpdatePaymentMethodModal}
				data={selectedPaymentMethod}
				domainId={domainId}
			/>
			<div className={styles.PaymentSettings}>
				<div className={styles.PaymentSettings__bank}>
					<div className={styles.pageAddCash}>
						{
							!paymentMethods?.length && (
								<p
									className="text-center"
								>
									Chưa có phương thức thanh toán nào
								</p>
							)
						}
						<Row>
							{paymentMethods?.map(item => (
								<ListPaymentMethodsItem
									data={{
										ownerName: item.owner_name,
										bankNumber: item.bank_number,
										bankLogoUrl: item.logo_url,
									}}
									onSelect={() => {
										setSelectedPaymentMethod(item)
										onShowCreateUpdatePaymentMethodModal()
									}}
								/>
							))}

							<Col xs={12} lg={12} xl={6}>
								<div className="text-center" style={{marginTop: '1rem'}}>
									<Image
										onClick={() => {
											setSelectedPaymentMethod(null)
											onShowCreateUpdatePaymentMethodModal()
										}}
										className="mt-2 p-3"
										src="/images/addplus.png"
										fluid
										style={{cursor: "pointer"}}
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
