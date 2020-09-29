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

const ServiceDetailMenu = () => (
	<Row>
		{
			SETTINGS.map(setting => (
				<ServiceDetailMenuItem
					{...setting}
				/>
			))
		}
	</Row>
)

export default ServiceDetailMenu