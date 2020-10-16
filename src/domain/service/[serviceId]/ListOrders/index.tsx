import { auth, firestore } from 'firebase/app'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import {
	useCollectionData,
	useDocumentData,
} from 'react-firebase-hooks/firestore'
import {
	DomainDocument,
	DomainServiceDocument,
	OrderDocument,
	ServiceActionDocument,
} from 'types/firebase'
import { classifyDataByDay, isScrollToBottom } from '../../../../helpers'
import DetailOrderModal from '../DetailOrderModal'
import ListGroupedByDayOrdersItem from '../ListGroupedByDayOrdersItem'
import ListOrderItem from '../ListOrderItem'
import RelativeTimeFromNow from '../RelativeTimeFromNow'
import styles from './index.module.scss'

type ListOrdersProps = {
	domainId: string
	serviceData: DomainServiceDocument
	onSelectAction: (action: ServiceActionDocument) => void
}

const ListOrders = ({
	domainId,
	serviceData,
	onSelectAction,
}: ListOrdersProps) => {
	const ordersQuery = firestore()
		.collection('domains')
		.doc(domainId)
		.collection('services')
		.doc(serviceData.id)
		.collection('orders')
		.where('user_id', '==', auth().currentUser.uid)
		.orderBy('created_at', 'desc')
		.limit(10)

	const [domain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId),
	)

	const [orderActions] = useCollectionData<ServiceActionDocument>(
		firestore()
			.collection(`services/${serviceData.id}_config/actions`)
			.where('is_order_action', '==', true),
	)

	const [inititalOrders, loading, error] = useCollectionData<OrderDocument>(
		ordersQuery,
	)
	const [hasMore, setHasMore] = useState<boolean>(true)
	const [orders, setOrders] = useState<OrderDocument[]>([])

	const classifiedOrdersByDay = classifyDataByDay<OrderDocument>(orders || [])

	const [isShowDetailOrderModal, setIsShowDetailOrderModal] = useState<boolean>(
		false,
	)
	const [selectedOrder, setSelectedOrder] = useState<OrderDocument | null>(null)

	const onCloseDetailOrderModal = () => {
		setIsShowDetailOrderModal(false)
		setSelectedOrder(null)
	}
	const onShowDetailOrderModal = (order: OrderDocument) => {
		setIsShowDetailOrderModal(true)
		setSelectedOrder(order)
	}

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
			{!!selectedOrder && (
				<DetailOrderModal
					isShow={isShowDetailOrderModal}
					onClose={onCloseDetailOrderModal}
					data={selectedOrder}
					serviceData={serviceData}
					domainData={domain}
					orderActions={orderActions}
					onSelectAction={onSelectAction}
				/>
			)}
			<div className={styles.pageOrder_content}>
				{orders && !orders.length && (
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
									{data.map(order => (
										<ListOrderItem
											onShowDetailOrderModal={() =>
												onShowDetailOrderModal(order)
											}
											{...order}
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
