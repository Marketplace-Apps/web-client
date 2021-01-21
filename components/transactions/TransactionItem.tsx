import { PaymentHistory } from "../../types"
import styles from './index.module.scss'
import { Alert, Badge, Col, Image, Row } from 'react-bootstrap'
import { propTypes } from "react-bootstrap/esm/Image"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import { CSSProperties } from "react"


export type ListTransactionsItem = {
	item: PaymentHistory,
	style: CSSProperties,
	icon: string,
	service_name: string
}
export const ListTransactionsItem = ({ icon, item, service_name, style }: ListTransactionsItem) => {
	const router = useRouter()
	return (
		<Row noGutters style={style}  >
			<Col xs={2} className="d-flex justify-content-center align-items-center" >
				<img src={icon} style={{ width: 50 }} />
			</Col>
			<Col xs={6} md={3} className="d-flex justify-content-start align-items-center ">
				<div>
					<div style={{ fontWeight: 'bold', color: '#2b69b7' }}>{service_name}</div>
					<div style={{ fontSize: 12 }}>{dayjs(new Date(item.created_at)).locale('vi').format('H:m')}</div>
				</div>
			</Col>
			<Col md={3} className="d-none d-md-block">
				<Alert variant="light">{item.description[router.locale]}</Alert>
			</Col>
			<Col xs={2} className="d-flex justify-content-center align-items-center" >
				<div >
					<Badge variant="info">9</Badge>
					<Badge variant="light">x200</Badge>
				</div>
			</Col>
			<Col xs={2} >
				<Badge variant="primary" className="mr-1">{(item.balance_after - item.total).toLocaleString()}</Badge>
				<Badge variant={item.total > 0 ? "success" : 'danger'} className="mr-1">{item.total > 0 ? "+" : '-'} {Math.abs(item.total).toLocaleString()}</Badge>
				<Badge variant="dark" className="mr-1">= {item.balance_after.toLocaleString()}</Badge>
			</Col>
			<Col md={12} className="d-md-none d-sm-block">
				<Alert style={{ margin: 0 }} variant="light">{item.description[router.locale]}</Alert>
			</Col>
		</Row>
	)
}