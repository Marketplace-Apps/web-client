import { auth } from 'firebase/app'
import { useCollectionData, useDomain } from 'hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import {
	DomainServiceDocument,
	IframeDocument,
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
	serviceData: DomainServiceDocument
	onSelectAction: (action: ServiceActionDocument) => void
}

const ListOrders = ({ serviceData, onSelectAction }: ListOrdersProps) => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const domain = useDomain()

	const { data: orders, hasMore, fetchMore, loading } = useCollectionData<
		OrderDocument
	>(`domains/${domain?.id}/services/${serviceData.id}/orders`, [
		['user_id', '==', auth().currentUser.uid],
	])

	const { data: orderActions, error } = useCollectionData<
		ServiceActionDocument
	>(
		`services/${serviceData.id}_config/actions`,
		[['is_order_action', '==', true]],
		null,
		100,
	)

	const { data: orderWidgetIframes } = useCollectionData<IframeDocument>(
		`services/${serviceId}_config/iframes`,
		[['type', '==', 'order_widget']],
		null,
		100,
	)

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
		if (isScrollToBottom() && hasMore) fetchMore()
	}

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore])

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
					orderWidgetIframes={orderWidgetIframes}
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
