import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import {FaHistory} from 'react-icons/fa'
import {FcHome, FcManager, FcNews} from 'react-icons/fc'
import {GiMoneyStack} from 'react-icons/gi'
import styles from './style.module.scss'

const PageList = [
	{ name: 'Tin tức', icon: FcNews, pathname: '/news', color: '#1e89ed' },
	{
		name: 'Nạp tiền',
		icon: GiMoneyStack,
		pathname: '/deposit',
		color: '#089b06',
	},
	{
		name: '',
		icon: FcHome,
		pathname: '/',
		color: '#089b06',
	},
	{
		name: 'Lịch sử',
		icon: FaHistory,
		pathname: '/history',
		color: '#1e89ed',
	},
	{
		name: 'Cá nhân',
		icon: FcManager,
		pathname: '/user',
		color: '#089b06',
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
								<a>
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
								</a>
							</Link>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default MobileBottomMenu