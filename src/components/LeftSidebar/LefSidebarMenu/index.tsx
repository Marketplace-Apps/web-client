import {auth} from 'firebase/app'
import {useRouter} from 'next/router'
import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'
import {FaUser} from 'react-icons/fa'
import {FcServices} from 'react-icons/fc'
import {HiLogout} from 'react-icons/hi'
import {RiMoneyDollarBoxLine} from 'react-icons/ri'
import LeftSidebarMenuItem from '../LeftSidebarMenuItem'

const MENU = [
	{
		name: 'Mua dịch vụ',
		Icon: FcServices,
		pathname: '/',
		color: 'red',
	},
	{
		name: 'Nạp tiền',
		Icon: RiMoneyDollarBoxLine,
		pathname: '/deposit',
		color: '#089b06',
	},
	{
		name: 'Cá Nhân',
		Icon: FaUser,
		pathname: '/me',
		color: '#00ff7f',
	},
]

const LeftSidebarMenu = () => {
	const router = useRouter()
	const [user] = useAuthState(auth())

	const onLogout = () => {
		auth().signOut()
		router.push('/auth/sign-in')
	}

	return (
		<div className="sidebar_services">
			<ListGroup>
				{
					MENU.map(({
						color,
						Icon,
						name,
						pathname
					}) => (
							<LeftSidebarMenuItem
								onClick={() => router.push(pathname)}
								color={color}
								Icon={Icon}
								name={name}
							/>
						)
					)
				}
				{
					user && (
						<LeftSidebarMenuItem
							onClick={onLogout}
							color="#6507fc"
							Icon={HiLogout}
							name="Đăng xuất"
						/>
					)
				}
			</ListGroup>
		</div>
	)
}

export default LeftSidebarMenu
