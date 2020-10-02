import Link from 'next/link'
import React from 'react'
import {Col, Image} from 'react-bootstrap'
import styles from './index.module.scss'

interface IMenuItemProps {
	thumbnail: string
	route: string
	title: string
}

const MenuItem = ({
	route,
	thumbnail,
	title
}: IMenuItemProps) => {
	return (
		<Col className="mb-3">
			<Link href={route}>
				<div className={styles.pageUser__box + ' text-center'}>
					<div className={styles.pageUser__img}>
						<Image
							style={{
								width: '85.9px',
								height: '89px',
								borderRadius: '50%',
							}}
							src={thumbnail}
						/>
					</div>
					<div className={styles.pageUser__text}>{title}</div>
				</div>
			</Link>
		</Col>
	)
}

export default MenuItem
