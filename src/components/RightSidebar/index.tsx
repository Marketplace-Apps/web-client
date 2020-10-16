import { firestore } from 'firebase/app'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FaBell } from 'react-icons/fa'
import { NotificationDocument } from '../../types/firebase'
import styles from './index.module.scss'
import ListGuideItem from './ListGuideItem'
import ListNotificationItem from './ListNotificationItem'

const RightSidebar = (props: { domainId: string }) => {
	const [notifications] = useCollectionData<NotificationDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId || 'domainId')
			.collection('notifications')
			.orderBy('created_at', 'desc')
			.limit(5),
	)

	return (
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
					<FaBell color="blue" />
					<span style={{ fontSize: '1.5rem', paddingLeft: '10px' }}>
						Thông báo
					</span>
				</h1>

				<div className="sR__notify">
					<ListGroup>
						{notifications?.map(({ created_at, icon, description, title }) => (
							<ListNotificationItem
								created_at={created_at}
								thumbnail={icon}
								title={title}
							/>
						))}
					</ListGroup>
				</div>
			</div>
		</div>
	)
}

export default RightSidebar
