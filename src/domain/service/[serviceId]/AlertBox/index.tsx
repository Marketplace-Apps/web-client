import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaExclamationTriangle,
	FaInfoCircle,
} from 'react-icons/fa'
import { ALERT_TYPES } from '../../../../constants'
import { compileJavascriptCode } from '../../../../helpers'

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

const AlertBox = (props: {
	level: ALERT_TYPES
	content: string
	visible: string
	config?: any
}) => {
	const { level, visible, config } = props

	const Icon = ALERT_ICON[level].icon
	const iconColor = ALERT_ICON[level].color

	const { watch } = useFormContext()
	const watchAllFields = watch()

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [content, setContent] = useState<string | null>(null)

	useEffect(() => {
		setIsVisible(
			compileJavascriptCode(visible, {
				...watchAllFields,
				...(config || {}),
			}),
		)
		setContent(
			compileJavascriptCode(props.content, {
				...watchAllFields,
				...(config || {}),
			}),
		)
	}, [watchAllFields])

	return (
		<Form.Row
			className="mb-3"
			style={{ display: isVisible ? 'block' : 'none' }}
		>
			<Col xs={3}></Col>
			<Col>
				<div
					style={{
						backgroundColor: ALERT_BACKGROUND[level],
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
					<div className="d-flex">{content}</div>
				</div>
			</Col>
		</Form.Row>
	)
}

export default AlertBox
