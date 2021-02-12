

import React from 'react'
import { PaymentMethod } from '../../types'
import { Alert, Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useCopy } from '../../hooks/useCopy'
import useTranslation from 'next-translate/useTranslation'


export const PaymentMethodItem = (props: { payment_method: PaymentMethod, onClick?: Function }) => {

	const { icon, account_name, account_number, id, name } = props.payment_method
	const { t } = useTranslation('common')
	const { copied, copy } = useCopy()

	return (
		<Row
			style={{
				padding: 20,
				margin: '30px 10px 0 0',
				boxShadow: '0 5px 10px 1px #bcbebe',
				cursor: props.onClick && 'pointer'
			}}
			onClick={props.onClick as any}
		>
			<Col xs={5} className="d-flex align-items-center">
				<img src={icon} style={{ width: '100%', padding: 0 }} />
			</Col>
			<Col xs={7} className="d-flex justify-content-center align-items-center">
				<div>
					<div className="font-weight-bold" style={{ fontSize: 20, color: '#51a5ea' }}>{name}</div>
					<div style={{ color: '#34b2ea' }}>{account_name}</div>
					<div style={{ color: '#34b2ea' }}>{account_number}</div>
					<Button
						size="sm"
						variant="outline-primary"
						onClick={() => copy(account_number)}
						className="mt-2"
					>{copied ? t('copied') : t('copy')}</Button>
				</div>
			</Col>
		</Row>

	)

}