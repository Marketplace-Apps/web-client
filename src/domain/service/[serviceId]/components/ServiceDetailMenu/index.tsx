import React from 'react'
import {Row} from 'react-bootstrap'
import ServiceDetailMenuItem from '../ServiceDetailMenuItem'

const SETTINGS = [
	{
		Icon: '/images/SettingsService.png',
		title: 'Cài đặt chung',
		route: '',
	},
	{
		Icon: '/images/auth.png',
		title: 'Xác thực',
		route: '/auth-settings',
	},
	{
		Icon: '/images/cart.png',
		title: 'Đơn hàng',
		route: '/orders',
	},
	{
		Icon: '/images/settingForm.png',
		title: 'Cài đặt action',
		route: '/action',
	},
]

const ServiceDetailMenu = (props: {isOwner: boolean}) => {
	const menuItems = props.isOwner ? SETTINGS : SETTINGS.filter(setting => setting.route !== "/auth-settings" && setting.route !== "/action")

	return (
		<Row>
			{
				menuItems.map(item => (
					<ServiceDetailMenuItem
						{...item}
					/>
				))
			}
		</Row>
	)
}

export default ServiceDetailMenu