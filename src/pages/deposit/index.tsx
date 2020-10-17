import ListAdminPaymentMethodsItem from 'domain/deposit/ListAdminPaymentMethodsItem'
import { firestore } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
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

const DepositPage = (props: { domainId: string }) => {
	const [paymentMethods] = useCollectionData<PaymentMethodDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId ?? 'domain-id')
			.collection('payment_methods'),
	)

	return (
		<MainLayout domainId={props.domainId} title="Phương thức thanh toán">
			<div className="pageAddCash" style={{ padding: '1rem 1.5rem' }}>
				<Title title="Vui lòng chọn một trong các phương thức thanh toán dưới đây" />
				{paymentMethods?.map(paymentMethod => (
					<ListAdminPaymentMethodsItem {...paymentMethod} />
				))}
			</div>
		</MainLayout>
	)
}

DepositPage.getInitialProps = async (ctx: any) => {
	const host = ctx.req ? ctx.req.headers.host.split(':')[0] : location.hostname
	const domain = await firestore()
		.collection('domains')
		.where('domain_name', '==', host)
		.get()
	return {
		domainId: domain.docs.length ? domain.docs[0].id : null,
	}
}

export default DepositPage
