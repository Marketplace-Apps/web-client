

import React from 'react'
import { PaymentMethod } from '../../types'
import { Alert, Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { copy } from '../../helpers/copy'


export const PaymentMethodItem = (props: { payment_method: PaymentMethod, onClick?: Function }) => {

	const { icon, account_name, account_number, id, name } = props.payment_method


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
			<Col xs={4} className="d-flex align-items-center">
				<img src={icon} style={{ width: '100%' }} />
			</Col>
			<Col xs={8} className="d-flex justify-content-center align-items-center">
				<div>
					<div className="font-weight-bold" style={{ fontSize: 25 }}>{name}</div>
					<div>{account_name}</div>
					<div>{account_number}</div>
					{
						!props.onClick && (
							<OverlayTrigger
								trigger="click"
								placement="top"
								delay={{ show: 250, hide: 400 }}
								overlay={<Tooltip id={id}> Đã copy </Tooltip>}
							>
								<Button
									size="sm"
									variant="outline-primary"
									onClick={() => copy(account_number)}
								>Copy</Button>
							</OverlayTrigger>
						)
					}
				</div>
			</Col>
		</Row>

	)

}