
import React from 'react'
import { useDomain } from '../../hooks/useDomain'
import { MainLayout } from '../../layouts/MainLayout'
import { useCollectionData } from 'react-livequery-hooks'
import { PaymentMethod } from '../../types'
import { Alert, Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { copy } from '../../helpers/copy'
import { AppRouteList } from '../../AppRouteList'

export const PaymentMethodItem = (props: PaymentMethod) => (
	<Row style={{ padding: 35, margin:'30px 10px 0 0', boxShadow: '0 5px 10px 1px #bcbebe' }}>
		<Col xs={6}>
			<img src={props.icon} style={{ width: '100%' }} />
		</Col>
		<Col xs={6} className="d-flex justify-content-center align-items-center">
			<div>
				<div className="font-weight-bold" style={{ fontSize: 25 }}>{props.name}</div>
				<div>{props.account_name}</div>
				<div>{props.account_number}
					<OverlayTrigger
						trigger="click"
						placement="top"
						delay={{ show: 250, hide: 400 }}
						overlay={<Tooltip id={props.id}> Đã copy </Tooltip>}
					>
						<Button size="sm" className="ml-2" variant="outline-primary" onClick={() => copy(props.account_number)}>Copy</Button>
					</OverlayTrigger>

				</div>
			</div>


		</Col>
	</Row>

)


const DepositPage = () => {
	const domain = useDomain()
	const { items: payment_methods, loading, empty } = useCollectionData<
		PaymentMethod
	>(domain && `domains/${domain.id}/payment-methods`)

	return (
		<MainLayout title={AppRouteList.Deposit.name}>
			<Row style={{ color: '#1678db', padding: 20 }}>
				{
					payment_methods.map(pm => <Col xs={12} md={4}><PaymentMethodItem {...pm} /></Col>)
				}
			</Row>
		</MainLayout >
	)
}

export default DepositPage
