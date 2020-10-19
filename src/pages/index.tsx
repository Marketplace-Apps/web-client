import MainLayout from 'layouts/MainLayout'
import dayjs from 'libs/dayjs'
import React, {useEffect} from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import {BsFillPersonFill} from 'react-icons/bs'
import CenteredSpinner from '../components/CenteredSpinner'
import {isScrollToBottom} from '../helpers'
import {useCollectionData, useDomain} from '../hooks'
import {NotificationDocument} from '../types/firebase'

const HomePage = () => {
	const domain = useDomain()

	const {
		data: notifications,
		error,
		loading,
		fetchMore,
		hasMore,
	} = useCollectionData<NotificationDocument>(
		`domains/${domain?.id}/notifications`,
	)

	const handleLoadMore = () => {
		if (isScrollToBottom() && hasMore) fetchMore()
	}

	useEffect(() => {
		window.addEventListener('scroll', handleLoadMore)
		return () => window.removeEventListener('scroll', handleLoadMore)
	}, [hasMore])

	return (
		<MainLayout title="Trang chủ">
			<div className="p-5">
				{notifications &&
					notifications.map(
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
				{loading && <CenteredSpinner />}
			</div>
		</MainLayout>
	)
}

export default HomePage
