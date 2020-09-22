import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import DetailOrderModal from 'domain/service/[serviceId]/orders/components/DetailOrderModal'
import ListGroupedByDayOrdersItem from 'domain/service/[serviceId]/orders/components/ListGroupedByDayOrdersItem'
import ListOrderItem from 'domain/service/[serviceId]/orders/components/ListOrderItem'
import RelativeTimeFromNow from 'domain/service/[serviceId]/orders/components/RelativeTimeFromNow'
import MainLayout from 'layouts/MainLayout'
import React, {useState} from 'react'
import {Row} from 'react-bootstrap'
import styles from './index.module.scss'

const ServiceActionOrdersPage = () => {
	const [isShowDetailOrderModal, setIsShowDetailOrderModal] = useState<boolean>(false)

	const onCloseDetailOrderModal = () => setIsShowDetailOrderModal(false)
	const onShowDetailOrderModal = () => setIsShowDetailOrderModal(true)

	return (
		<MainLayout
			title="Lịch sử đơn hàng"
		>
			<DetailOrderModal
				isShow={isShowDetailOrderModal}
				onClose={onCloseDetailOrderModal}
			/>
			<ServiceDetailContainer>
				<div className={styles.pageOrder_content}>
					<div className={styles.pageOrder_content}>
						<ListGroupedByDayOrdersItem>
							<RelativeTimeFromNow
								time={Date.now()}
							/>
							<Row>
								{
									new Array(10).fill(null).map(_ => (
										<ListOrderItem
											onShowDetailOrderModal={onShowDetailOrderModal}
											customerFullname="Lê Thanh Huyền"
											created_time={Date.now()}
											id="#4563"
											content="	Hôm nay vui quá, ăn hơi lâu, quán đông vui phết"
										/>
									))
								}
							</Row>
						</ListGroupedByDayOrdersItem>
					</div>
				</div>
			</ServiceDetailContainer>
		</MainLayout>
	)
}

export default ServiceActionOrdersPage
