import { auth, firestore } from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { classifyDataByDay, isScrollToBottom } from '../../../../helpers'
import { OrderDocument } from '../../../../types/firebase'
import ListGroupedByDayOrdersItem from '../ListGroupedByDayOrdersItem'
import ListOrderItem from '../ListOrderItem'
import RelativeTimeFromNow from '../RelativeTimeFromNow'
import styles from './index.module.scss'

type ListOrdersProps = {
	domainId: string
	serviceId: string
}

const ListOrders = ({ domainId, serviceId }: ListOrdersProps) => {
	const ordersQuery = firestore()
		.collection('domains')
		.doc(domainId)
		.collection('services')
		.doc(serviceId)
		.collection('orders')
		.where('user_id', '==', auth().currentUser.uid)
		.orderBy('created_at', 'desc')
		.limit(10)

	const [inititalOrders, loading, error] = useCollectionData<OrderDocument>(
		ordersQuery,
	)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [orders, setOrders] = useState<OrderDocument[]>([])

	const classifiedOrdersByDay = classifyDataByDay<OrderDocument>(orders || [])

	const [isShowDetailOrderModal, setIsShowDetailOrderModal] = useState<boolean>(
		false,
	)

	const onCloseDetailOrderModal = () => setIsShowDetailOrderModal(false)
	const onShowDetailOrderModal = () => setIsShowDetailOrderModal(true)

	const handleLoadMore = () => {
		if (isScrollToBottom() && hasMore && !!orders.length) {
			const fn = ordersQuery.limit(orders.length + 10)
			fn.onSnapshot(snap => {
				setOrders([...snap.docs.map(doc => doc.data())] as OrderDocument[])
				setHasMore(
					snap.docs.map(doc => doc.data()).length >= orders.length + 10,
				)
			})
		}
	}

	useEffect(() => {
		if (!inititalOrders) return
		setOrders(inititalOrders)
	}, [inititalOrders])

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore, orders])

	return (
		<>
			{/* <DetailOrderModal
				isShow={isShowDetailOrderModal}
				onClose={onCloseDetailOrderModal}
			/> */}
			<div className={styles.pageOrder_content}>
				{classifiedOrdersByDay && !classifiedOrdersByDay.length && (
					<p className="text-center">Chưa có đơn hàng nào</p>
				)}
				{classifiedOrdersByDay && !!classifiedOrdersByDay.length && (
					<ListGroupedByDayOrdersItem>
						{classifiedOrdersByDay.map(({ data, day }) => (
							<>
								<RelativeTimeFromNow day={day} />
								<Row
									style={{
										margin: 0,
									}}
								>
									{data.map(({ id, created_at, description }) => (
										<ListOrderItem
											onShowDetailOrderModal={onShowDetailOrderModal}
											customerFullname="Lê Thanh Huyền"
											created_time={created_at}
											id={id}
											content={description}
										/>
									))}
								</Row>
							</>
						))}
					</ListGroupedByDayOrdersItem>
				)}
			</div>
		</>
	)
}

export default ListOrders
