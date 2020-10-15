import Link from 'next/link'
import React from 'react'
import { Col } from 'react-bootstrap'
import { IconType } from 'react-icons/lib'
import styles from './index.module.scss'

interface IMenuItemProps {
	Icon: IconType
	route: string
	title: string
}

const MenuItem = ({ route, Icon, title }: IMenuItemProps) => {
	return (
		<Col className="mb-3">
			<Link href={route}>
				<div className={styles.pageUser__box + ' text-center'}>
					<div className={styles.pageUser__img}>
						<Icon
							style={{
								width: '85.9px',
								height: '89px',
							}}
						/>
					</div>
					<div className={styles.pageUser__text}>{title}</div>
				</div>
			</Link>
		</Col>
	)
}

export default MenuItem
