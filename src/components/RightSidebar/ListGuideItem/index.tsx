import React from 'react'
import {Image, ListGroup} from 'react-bootstrap'
import styles from './index.module.scss'

interface IListGuideItemProps {
	thumbnail: string
	title: string
}

const ListGuideItem = ({
	thumbnail,
	title
}: IListGuideItemProps) => (
		<ListGroup.Item className={styles.sidebarRight_guild__item}>
			<Image
				className={styles.sidebarRight_guild__img}
				src={thumbnail}
				fluid
			/>
			<span className={styles.sidebarRight_guild__text}>{title}</span>
		</ListGroup.Item>
	)
	
export default ListGuideItem
