import ListTransactionsItem from 'domain/transaction/ListTransactionsItem'
import { firestore } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import CenteredSpinner from '../../components/CenteredSpinner'
import { classifyDataByField } from '../../helpers'
import { OrderDocument } from '../../types/firebase'

const TransactionPage = (props: { domainId: string | null }) => {
	const [orders, loadingOrders] = useCollectionData<OrderDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId ?? 'domain-id')
			.collection('orders'),
	)

	const classifyOrdersByDay = classifyDataByField<
		number,
		OrderDocument & { key: number }
	>(orders?.map(order => ({ ...order, key: order.created_at })) || [])

	return (
		<MainLayout>
			<div className="pageHistory" style={{ padding: '1rem 0' }}>
				<div className="pageHistory__selectDate">
					<div
						style={{
							padding: '0rem 1.5rem 1rem 1.5rem',
							marginRight: '0 !important',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div className="pageHistory__inputDate">Chọn ngày</div>
						<input type="date" />
					</div>
				</div>
				<div className="pageHistory__optionsDate">
					{!classifyOrdersByDay && <CenteredSpinner />}
					{classifyOrdersByDay && !classifyOrdersByDay.length && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<p>Chưa có giao dịch</p>
						</div>
					)}
					{classifyOrdersByDay &&
						!!classifyOrdersByDay.length &&
						classifyOrdersByDay.map(({ data, key }) => (
							<div className="Day">
								<div
									style={{
										padding: '1rem 1.5rem',
										color: '#000000',
										fontWeight: 'bold',
										fontSize: '0.9rem',
										borderTop: '1px solid #e3e3e3',
										borderBottom: '1px solid #e3e3e3',
									}}
									className="pageHistory__day"
								>
									{new Date(key).toLocaleDateString('vi')}
								</div>
								<div className="pageHistory__option">
									<div className="pageHistory_services">
										{data.map(order => (
											<ListTransactionsItem {...order} />
										))}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</MainLayout>
	)
}

TransactionPage.getInitialProps = async (ctx: any) => {
	const host = ctx.req ? ctx.req.headers.host.split(':')[0] : location.hostname
	const domain = await firestore()
		.collection('domains')
		.where('domain_name', '==', host)
		.get()
	return {
		domainId: domain.docs.length ? domain.docs[0].id : null,
	}
}

export default TransactionPage
