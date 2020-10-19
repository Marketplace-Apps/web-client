import ListTransactionsItem from 'domain/transaction/ListTransactionsItem'
import { auth } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React, { useEffect } from 'react'
import CenteredSpinner from '../../components/CenteredSpinner'
import { classifyDataByDay, isScrollToBottom } from '../../helpers'
import { useCollectionData, useDomain } from '../../hooks'
import { PaymentHistoryDocument } from '../../types/firebase'

const TransactionPage = () => {
	const domain = useDomain()

	const { data: paymentHistories, fetchMore, hasMore } = useCollectionData<
		PaymentHistoryDocument
	>(
		`domains/${domain?.id}/users/${
			auth().currentUser?.uid || 'uid'
		}/payment_histories`,
	)

	const classifyPaymentHistoriesByDay = classifyDataByDay<
		PaymentHistoryDocument
	>(paymentHistories || [])

	const handleLoadMore = () => {
		if (isScrollToBottom() && hasMore) fetchMore()
	}

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore])

	return (
		<MainLayout title="Lịch sử giao dịch">
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
					{!classifyPaymentHistoriesByDay && <CenteredSpinner />}
					{classifyPaymentHistoriesByDay &&
						!classifyPaymentHistoriesByDay.length && (
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
					{classifyPaymentHistoriesByDay &&
						!!classifyPaymentHistoriesByDay.length &&
						classifyPaymentHistoriesByDay.map(({ data, day }) => (
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
									{day}
								</div>
								<div className="pageHistory__option">
									<div className="pageHistory_services">
										{data.map(paymentHistory => (
											<ListTransactionsItem {...paymentHistory} />
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

export default TransactionPage
