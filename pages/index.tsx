import dayjs from 'dayjs'
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { FcAssistant } from 'react-icons/fc'
import { useCollectionData } from 'firebase-easy-hooks'
import { useDomain } from '../hooks/useDomain'
import { useInfinityScroll } from '../hooks/useInfinityScroll'
import { CenteredSpinner } from '../components/common/CenteredSpinner'
import { MainLayout } from '../layouts/MainLayout'
import { Notification } from '../types'
import useTranslation from 'next-translate/useTranslation'


const HomePage = () => {

	const domain = useDomain() 

	const {
		data: notifications,
		loading,
		fetch_more,
		has_more,
		empty
	} = useCollectionData<Notification>(
		domain && `domains/${domain.id}/notifications`,
	)


	useInfinityScroll(() => has_more && fetch_more())

	return (
		<MainLayout title={{ en: 'Home', vi: 'Trang chủ' }}> 
			{loading && <CenteredSpinner />}
			{empty && (
				<p className="text-center">Không có thông báo</p>
			)}
			{notifications.map(
				({ title, description, images, created_at }) => (
					<div
						style={{
							backgroundColor: '#F7F7F7',
							padding: '20px',
							borderRadius: '20px',
						}}
						className="mb-3"
					>
						<div className="d-flex align-items-center">
							<FcAssistant size="40px" />
							<div className="d-flex flex-column ml-2">
								<span className="font-weight-bold">Admin</span>
								<span
									style={{
										fontSize: '15px',
									}}
								>
									{dayjs(new Date(created_at)).locale('vi').fromNow()}
								</span>
							</div>
						</div>
						<div className="p-2">
							<p className="font-weight-bold mb-2">{title}</p>
							<p>{description}</p>
							{images && images.length && (
								<Row>
									{images.map(image => (
										<Col xs={12} sm={6}>
											<Image src={image} width="100%" />
										</Col>
									))}
								</Row>
							)}

						</div>
					</div>
				),
			)
			}
		</MainLayout>
	)
}

export default HomePage
