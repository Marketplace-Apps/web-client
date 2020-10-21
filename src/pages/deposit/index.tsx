import ListAdminPaymentMethodsItem from 'domain/deposit/ListAdminPaymentMethodsItem'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import CenteredSpinner from '../../components/CenteredSpinner'
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

	const { data: paymentMethods, loading } = useCollectionData<
		PaymentMethodDocument
	>(`domains/${domain?.id}/payment_methods`, [], null, 100)

	return (
		<MainLayout title="Phương thức thanh toán">
			<div className="pageAddCash" style={{ padding: '1rem 1.5rem' }}>
				{paymentMethods && !!paymentMethods.length && (
					<Title title="Vui lòng chọn một trong các phương thức thanh toán dưới đây" />
				)}
				{!paymentMethods && <CenteredSpinner />}
				{paymentMethods && !paymentMethods.length && (
					<p className="text-center">
						Vui lòng liên hệ admin để lấy thông tin thanh toán
					</p>
				)}
				{paymentMethods &&
					!!paymentMethods.length &&
					paymentMethods?.map(paymentMethod => (
						<ListAdminPaymentMethodsItem
							{...paymentMethod}
							domainId={domain.id}
						/>
					))}
			</div>
		</MainLayout>
	)
}

export default DepositPage
