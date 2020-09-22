import {useRouter} from 'next/router'
import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {BsCardHeading} from 'react-icons/bs'
import {FaAmazonPay, FaUser, FaUsers} from 'react-icons/fa'
import {FcServices} from 'react-icons/fc'
import {FiSettings} from 'react-icons/fi'
import {HiLogout} from 'react-icons/hi'
import {RiMoneyDollarBoxLine} from 'react-icons/ri'

const LIST_FEATURES = [
	{
		name: 'Mua dịch vụ',
		Icon: FcServices,
		pathname: '/',
		color: 'red',
	},
	{
		name: 'Cài đặt site',
		Icon: FiSettings,
		pathname: '/sitesettings',
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
		pathname: '/usermanagement',
		color: '#1e89ed',
	},
	{
		name: 'Cài đặt thanh toán',
		Icon: FaAmazonPay,
		pathname: '/paymentsettings',
		color: '#00c7ff',
	},
	{
		name: 'Nạp tiền',
		Icon: RiMoneyDollarBoxLine,
		pathname: '/naptien',
		color: '#089b06',
	},
	{
		name: 'Cá Nhân',
		Icon: FaUser,
		pathname: '/user',
		color: '#00ff7f',
	},
	{
		name: 'Đăng xuất',
		Icon: HiLogout,
		pathname: '/',
		color: '#6507fc',
	},
]
const LeftSidebarListFeatureItem = () => {
	const router = useRouter()

	return (
		<ListGroup.Item
			className="list_group_item"
			style={{
				padding: '.5rem',
				border: '1px solid #fff',
				margin: '0rem 2rem 1.5rem 2rem',
				cursor: 'pointer',
			}}
		>
			{
				LIST_FEATURES.map(({
					color,
					Icon,
					name,
					pathname
				}) => (
						<div onClick={() => router.push(pathname)} className="mb-4">
							<Icon
								style={{
									color: color,
									fontSize: '3rem',
									borderRadius: '20%',
									border: '1px solid #20c997',
									padding: '5px',
								}}
								className="list_group_item__icon"
							/>

							<span
								style={{
									marginLeft: '.5rem',
									fontSize: '1.1rem',
									color: '#666666',
									fontWeight: 'bold',
								}}
								className="list_group_item__text"
							>
								{name}
							</span>
						</div>
					)
				)
			}
		</ListGroup.Item>
	)
}

export default LeftSidebarListFeatureItem
