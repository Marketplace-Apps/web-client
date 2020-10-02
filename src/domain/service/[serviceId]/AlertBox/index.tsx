import React from 'react'
import {Col, Form} from 'react-bootstrap'
import {FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle} from 'react-icons/fa'
import {ALERT_TYPES} from '../../../../constants'

const ALERT_BACKGROUND = {
	info: "#2550A6",
	error: "#F98C8C",
	warn: "#EB903D",
	success: "#078E5D"
}

const ALERT_ICON = {
	info: {
		icon: FaInfoCircle,
		color: "#5685e2"
	},
	error: {
		icon: FaExclamationCircle,
		color: "red"
	},
	warn: {
		icon: FaExclamationTriangle,
		color: "yellow"
	},
	success: {
		icon: FaCheckCircle,
		color: "#2cb672"
	}
}

const AlertBox = (props: {
	type: ALERT_TYPES,
	content: string
}) => {
	const Icon = ALERT_ICON[props.type].icon
	const iconColor = ALERT_ICON[props.type].color

	return (
		<Form.Row
			className="mb-3"
		>
			<Col xs={3}></Col>
			<Col>
				<div
					style={{
						backgroundColor: ALERT_BACKGROUND[props.type],
						color: '#fff',
						padding: '10px',
						fontSize: '0.8rem',
						borderRadius: '10px',
					}}
					className="d-flex"
				>
					<div className="mr-3 d-flex align-items-center">
						<Icon color={iconColor} size="20px" />
					</div>
					<div className=" d-flex">{props.content}</div>
				</div>
			</Col>
		</Form.Row>
	)
}

export default AlertBox