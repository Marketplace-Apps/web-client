import ListAdminPaymentMethodsItem from 'domain/deposit/ListAdminPaymentMethodsItem'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import { useCollectionData, useDomain } from '../../hooks'
import { PaymentMethodDocument } from '../../types/firebase'

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

const DepositPage = () => {
	const domain = useDomain()

	const { data: paymentMethods } = useCollectionData<PaymentMethodDocument>(
		`domains/${domain?.id}/payment_methods`,
		[],
		null,
		100,
	)

	return (
		<MainLayout title="Phương thức thanh toán">
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
