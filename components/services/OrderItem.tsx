import dayjs from 'dayjs'
import React from 'react'
import { Badge, Col, Row } from 'react-bootstrap'
import { BiBullseye, BiTimeFive } from 'react-icons/bi'
import { Order } from '../../types'
import { OrderStatus } from '../../constants'
import { Router, useRouter } from 'next/router'
import { OrderStatusList } from '../../const'

export type OrderItem = { order: Order, onClick?: Function }

function get_order_color(order: Order) {
	if (order.deleted) return OrderStatusList.deleted.color
	if (order.error) return OrderStatusList.error.color
	if (order.done || order.refunded) return OrderStatusList.done.color
	if (!order.active) return OrderStatusList.active.color
	if (order.running) return OrderStatusList.running.color

	return 'linear-gradient(to right, #bbd2c5, #536976)'
}

export const OrderItem = (props: OrderItem) => {

	const { locale } = useRouter()

	return (
		<div style={{
			background: get_order_color(props.order),
			margin: 10,
			borderRadius: 10,
			cursor: 'pointer',
			color: 'white'
		}} >
			<Row onClick={props.onClick as any} style={{ color: 'white' }}>
				<Col xs={3} style={{
					backgroundImage: `url("${props.order.thumbnail}")`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					border: '1px dotted gray'
				}}>
				</Col>
				<Col xs={9} >
					<Row style={{ padding: '10px 15px 10px 0' }}>
						<Col xs={6} className="d-flex justify-content-start align-items-center">
							<BiBullseye />
							<span style={{ marginLeft: 5 }}>{props.order.amount}</span>
							<Badge pill className="ml-2 mb-1" variant="light">{
								// OrderStatus[props.order.status][locale] || props.order.status
							}</Badge>
						</Col>
						<Col xs={6} style={{ fontSize: 12 }} className="d-flex justify-content-end align-items-center">
							<BiTimeFive size={20} />
							<span style={{ marginLeft: 5 }}> {dayjs(new Date(props.order.created_at)).locale(locale).fromNow()}</span>
						</Col>
						<Col xs={12} style={{ fontWeight: 'bold' }} >{props.order.title}</Col>
						<Col xs={12} style={{ fontSize: 12 }}>
							{props.order.note}
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}