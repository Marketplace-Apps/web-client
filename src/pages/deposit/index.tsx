import ListAdminPaymentMethodsItem from 'domain/deposit/ListAdminPaymentMethodsItem'
import { firestore } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { PaymentMethodDocument } from '../../types/firebase'

const PAYMENT_METHODS = [
	{
		ownerName: 'Dương Văn Ba',
		cardNumber: ' 0301.0003.81458',
		department: 'Chi nhánh Hà Thành',
		bankLogoUrl: '/images/vietcombank.png',
	},
]

const Title = (props: { title: string }) => (
	<h2
		style={{
			fontWeight: 'bold',
			fontSize: '1.1rem',
			lineHeight: '1.3rem',
			textAlign: 'center',
			color: ' #339be7',
		}}
		className="pageAddCash__title mt-3 mb-5"
	>
		{props.title}
	</h2>
)

const DepositPage = (props: { domainId: string }) => {
	const [paymentMethods] = useCollectionData<PaymentMethodDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
			.collection('payment_methods'),
	)

	return (
		<MainLayout domainId={props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'} title="Phương thức thanh toán">
			<div className="pageAddCash" style={{ padding: '1rem 1.5rem' }}>
				<Title title="Vui lòng chọn một trong các phương thức thanh toán dưới đây" />
				{paymentMethods?.map(paymentMethod => (
					<ListAdminPaymentMethodsItem {...paymentMethod} />
				))}
			</div>
		</MainLayout>
	)
}
 

export default DepositPage
