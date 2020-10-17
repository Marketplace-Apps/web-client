import { firestore } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import dayjs from 'libs/dayjs'
import React, { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BsFillPersonFill } from 'react-icons/bs'
import { NotificationDocument } from 'types/firebase'
import { isScrollToBottom } from '../helpers'

const HomePage = (props ) => {
 

	const notificationsQuery = firestore()
		.collection('domains')
		.doc(props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
		.collection('notifications')
		.orderBy('created_at', 'desc')
		.limit(10)

	const [inititalNotifications] = useCollectionData<NotificationDocument>(
		notificationsQuery,
	)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const [notifications, setNotifications] = useState<NotificationDocument[]>([])

	useEffect(() => {
		if (props.domainId || typeof window != 'undefined' && window.location.hostname || 'null') localStorage.setItem('domain_id',props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
	}, [props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'])

	const handleLoadMore = () => {
		if (isScrollToBottom() && hasMore && !!notifications.length) {
			const fn = notificationsQuery.limit(notifications.length + 10)
			fn.onSnapshot(snap => {
				setNotifications([
					...snap.docs.map(doc => doc.data()),
				] as NotificationDocument[])
				setHasMore(
					snap.docs.map(doc => doc.data()).length >= notifications.length + 10,
				)
			})
		}
	}

	useEffect(() => {
		if (!inititalNotifications) return
		setNotifications(inititalNotifications)
	}, [inititalNotifications])

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore, notifications])

	return (
		<MainLayout title="Trang chủ" domainId={props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'}>
			<div className="p-5">
				{notifications?.map(
					({ title, description, images, videos, created_at }) => (
						<div
							style={{
								backgroundColor: '#F7F7F7',
								padding: '20px',
							}}
							className="mb-3"
						>
							<div className="d-flex align-items-center">
								<BsFillPersonFill size="40px" />
								<div className="d-flex flex-column ml-2">
									<p className="font-weight-bold">Admin</p>
									<p
										style={{
											fontSize: '15px',
										}}
									>
										{dayjs(new Date(created_at)).locale('vi').fromNow()}
									</p>
								</div>
							</div>
							<div className="p-4">
								<p className="font-weight-bold mb-2">{title}</p>
								<p>{description}</p>
								{images && images.length && (
									<Row>
										{images.map(image => (
											<Col xs={6} sm={4}>
												<Image src={image} />
											</Col>
										))}
									</Row>
								)}
							</div>
						</div>
					),
				)}
			</div>
		</MainLayout>
	)
} 


export default HomePage
