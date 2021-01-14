
import React from 'react'
import { useDomain } from '../hooks/useDomain'
import { MainLayout } from '../layouts/MainLayout'
import { useCollectionData } from 'react-livequery-hooks'
import { PaymentMethod } from '../types'
import { Alert, Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { copy } from '../helpers/copy'
import { AppRouteList } from '../AppRouteList'

export const PaymentMethodItem = (props: { payment_method: PaymentMethod }) => {

	const { icon, account_name, account_number, id, name } = props.payment_method

	return (
		<Row style={{ padding: 20, margin: '30px 10px 0 0', boxShadow: '0 5px 10px 1px #bcbebe' }}>
			<Col xs={4} className="d-flex align-items-center">
				<img src={icon} style={{ width: '100%' }} />
			</Col>
			<Col xs={8} className="d-flex justify-content-center align-items-center">
				<div>
					<div className="font-weight-bold" style={{ fontSize: 25 }}>{name}</div>
					<div>{account_name}</div>
					<div>{account_number}</div>
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
				</div>
			</Col>
		</Row>

	)

}

const DepositPage = () => {
	const domain = useDomain()
	const { items: payment_methods, loading, empty } = useCollectionData<
		PaymentMethod
	>(domain && `domains/${domain.id}/payment-methods`)

	return (
		<MainLayout title={AppRouteList.Deposit.name}>
			<Row style={{ color: '#1678db', padding: 0 }}>
				{
					payment_methods.map(payment_method => <Col xs={12} md={4}><PaymentMethodItem payment_method={payment_method} /></Col>)
				}
			</Row>
		</MainLayout >
	)
}

export default DepositPage
