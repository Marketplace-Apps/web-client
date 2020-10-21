import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaBell, FaHistory, FaHome, FaMoneyBill } from 'react-icons/fa'
import styles from './style.module.scss'

const PageList = [
	{ name: 'Thông báo', icon: FaBell, pathname: '/', color: '#117a8b' },
	{
		name: 'Nạp tiền',
		icon: FaMoneyBill,
		pathname: '/deposit',
		color: '#089b06',
	},
	{
		name: '',
		icon: FaHome,
		pathname: '/service',
		color: '#343a40',
	},
	{
		name: 'Lịch sử',
		icon: FaHistory,
		pathname: '/transaction',
		color: '#1e89ed',
	},
	{
		name: 'Cá nhân',
		icon: BsFillPersonFill,
		pathname: '/me',
		color: 'grey',
	},
]

const MobileBottomMenu = () => {
	const router = useRouter()

	return (
		<>
			<div className={styles.fixedBottom}>
				<div className={styles.buttonMobile}>
					{PageList.map(item => {
						return (
							<Link href={item.pathname}>
								<div className={styles.buttonMobile__item}>
									<item.icon
										style={{
											color: item.color,
										}}
										className={
											styles.icon +
											' ' +
											(item.pathname === '/' && styles.buttonMobile__btnHome)
										}
									/>
									<div
										className={
											styles.buttonMobile__name +
											' ' +
											(router.pathname === item.pathname && styles.active)
										}
									>
										{item.name}
									</div>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default MobileBottomMenu
