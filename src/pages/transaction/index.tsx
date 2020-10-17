import ListTransactionsItem from 'domain/transaction/ListTransactionsItem'
import {auth, firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React, {useEffect, useState} from 'react'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import CenteredSpinner from '../../components/CenteredSpinner'
import {classifyDataByDay, isScrollToBottom} from '../../helpers'
import {PaymentHistoryDocument} from '../../types/firebase'

const TransactionPage = (props: { domainId: string | null }) => {
	const paymentHistoriesQuery = firestore()
		.collection('domains')
		.doc(props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
		.collection('users')
		.doc(auth().currentUser?.uid || 'uid')
		.collection('payment_histories')
		.orderBy('created_at', 'desc')
		.limit(10)

	const [inititalpaymentHistorie] = useCollectionData<PaymentHistoryDocument>(
		paymentHistoriesQuery,
	)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const [paymentHistories, setPaymentHistories] = useState<
		PaymentHistoryDocument[]
	>([])

	const classifyPaymentHistoriesByDay = classifyDataByDay<
		PaymentHistoryDocument
	>(paymentHistories || [])

	const handleLoadMore = () => {
		if (isScrollToBottom() && hasMore && !!paymentHistories.length) {
			const fn = paymentHistoriesQuery.limit(paymentHistories.length + 10)
			fn.onSnapshot(snap => {
				setPaymentHistories([
					...snap.docs.map(doc => doc.data()),
				] as PaymentHistoryDocument[])
				setHasMore(
					snap.docs.map(doc => doc.data()).length >=
						paymentHistories.length + 10,
				)
			})
		}
	}

	useEffect(() => {
		if (!inititalpaymentHistorie) return
		setPaymentHistories(inititalpaymentHistorie)
	}, [inititalpaymentHistorie])

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore, paymentHistories])

	return (
		<MainLayout title="Lịch sử giao dịch" domainId={props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'}>
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
