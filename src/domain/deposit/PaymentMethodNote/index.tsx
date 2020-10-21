import React from 'react'
import { Alert } from 'react-bootstrap'
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

	return (
		<div
			style={{
				fontSize: '1rem',
			}}
		>
			<div className="d-flex align-items-center">
				<Alert
					variant={type}
					className="d-flex"
					style={{
						width: '100%',
					}}
				>
					{content}
				</Alert>
			</div>
		</div>
	)
}

export default PaymentMethodNote
