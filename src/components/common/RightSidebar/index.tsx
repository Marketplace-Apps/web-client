import React from 'react'
import {Image, ListGroup} from 'react-bootstrap'
import styles from './index.module.scss'
import ListGuideItem from './ListGuideItem'
import ListNotificationItem from './ListNotificationItem'

const RightSidebar = () => (
	<div className={styles.sidebarRight}>
		<div className={styles.sidebarRight_guild}>
			<ListGroup>
				<ListGuideItem
					title="Huong dan su dung website"
					thumbnail="/images/hd1.png"
				/>
				<ListGuideItem
					title="Huong dan nap tien"
					thumbnail="/images/hd2.png"
				/>
			</ListGroup>
		</div>
		<div className={styles.sidebarRight_notify}>
			<h1 className={styles.sidebarRight_notify__title}>
				<Image src="/images/iconNotify.png" fluid alt="NOTIFY" />
				Thong Bao
			</h1>

			<div className="sR__notify">
				<ListGroup>
					<ListNotificationItem
						created_time={Date.now()}
						thumbnail="/images/notify1.png"
						title="Hệ thống đã đi vào hoạt động ổn định, chúng tôi sẽ cộng thêm tiền để các bạn yên tâm đặt hàng. Cảm ơn tất cả mọi người"
					/>
				</ListGroup>
			</div>
		</div>
	</div>
)

export default RightSidebar
