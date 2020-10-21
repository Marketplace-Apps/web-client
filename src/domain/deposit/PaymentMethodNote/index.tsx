import React from 'react'
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaExclamationTriangle,
	FaInfoCircle,
} from 'react-icons/fa'

const ALERT_BACKGROUND = {
	info: '#2550A6',
	error: '#F98C8C',
	warning: '#EB903D',
	success: '#078E5D',
}

const ALERT_ICON = {
	info: {
		icon: FaInfoCircle,
		color: '#5685e2',
	},
	error: {
		icon: FaExclamationCircle,
		color: 'red',
	},
	warning: {
		icon: FaExclamationTriangle,
		color: 'yellow',
	},
	success: {
		icon: FaCheckCircle,
		color: '#2cb672',
	},
}

const PaymentMethodNote = (props: { type: string; content: string }) => {
	const { type, content } = props

	const Icon = ALERT_ICON[type].icon
	const iconColor = ALERT_ICON[type].color

	return (
		<div
			style={{
				backgroundColor: ALERT_BACKGROUND[type],
				color: '#fff',
				padding: '10px',
				fontSize: '1rem',
				borderRadius: '10px',
			}}
			className="d-flex my-2"
		>
			<div className="mr-3 d-flex align-items-center">
				<Icon color={iconColor} size="25px" />
			</div>
			<div className="d-flex">{content}</div>
		</div>
	)
}

export default PaymentMethodNote
