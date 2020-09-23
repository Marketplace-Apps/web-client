import {useRouter} from 'next/router'
import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {BsCardHeading} from 'react-icons/bs'
import {FaAmazonPay, FaUser, FaUsers} from 'react-icons/fa'
import {FcServices} from 'react-icons/fc'
import {FiSettings} from 'react-icons/fi'
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
		name: 'Cài đặt site',
		Icon: FiSettings,
		pathname: '/site-settings',
		color: '#17a2b8',
	},
	{
		name: 'Voucher',
		Icon: BsCardHeading,
		pathname: '/vouchers',
		color: '#c816f9',
	},
	{
		name: 'Quản lý người dùng',
		Icon: FaUsers,
		pathname: '/users',
		color: '#1e89ed',
	},
	{
		name: 'Cài đặt thanh toán',
		Icon: FaAmazonPay,
		pathname: '/payment-methods',
		color: '#00c7ff',
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

	const onLogout = () => {
		console.log("log out")
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
				<LeftSidebarMenuItem
					onClick={onLogout}
					color="#6507fc"
					Icon={HiLogout}
					name="Đăng xuất"
				/>
			</ListGroup>
		</div>
	)
}

export default LeftSidebarMenu
