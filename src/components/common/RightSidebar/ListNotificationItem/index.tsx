import React from 'react'
import {Image} from 'react-bootstrap'
import styles from './_notification.module.scss'

interface IListNotificationItemProps {
	thumbnail: string
	created_time: number
	title: string
}

const ListNotificationItem = ({
	thumbnail,
	created_time,
	title
}: IListNotificationItemProps) => (
		<div className={styles.pageNotification_content__item}>
			<div className={styles.pageNotification_content__img}>
				<Image
					className={styles.pageNotification_content__iconImg}
					src={thumbnail}
				/>
			</div>
			<div className={styles.pageNotification_content__des}>
				<div className={styles.pageNotification_content__time}>
					<small>
						{
							new Date(created_time)
						}
					</small>
				</div>
				<div className={styles.pageNotification_content__text}>
					{title}
				</div>
			</div>
		</div>
	)

export default ListNotificationItem
