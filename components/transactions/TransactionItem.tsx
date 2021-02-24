import { PaymentHistory } from "../../types"
import styles from './index.module.scss'
import { Alert, Badge, Col, Image, Row } from 'react-bootstrap'
import { propTypes } from "react-bootstrap/esm/Image"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import { CSSProperties } from "react"
import { Credit } from "../common/Credit"


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
			<Col xs={2} md={2} className="d-flex justify-content-center align-items-center" >
				<img src={icon} style={{ width: 50 }} />
			</Col>
			<Col xs={10} md={2} className="d-flex justify-content-start align-items-center ">
				<div>
					<div style={{ fontWeight: 'bold', color: '#2b69b7' }}>{service_name}</div>
					<div style={{ fontSize: 12 }}>{dayjs(new Date(item.created_at)).locale('vi').format('H:m')}</div>
				</div>
			</Col>

			<Col xs={12} md={4} className="d-flex justify-content-end align-items-center ">
				<div className="text-right" >
					{item.balance_after && <Badge
						variant="primary"
						className="mr-1">
						<Credit value={item.balance_after - item.total} />
					</Badge>}
					<Badge
						variant={item.total > 0 ? "success" : 'danger'}
						className="mr-1"
					>{item.total > 0 ? "+" : '-'}
						<Credit value={Math.abs(item.total)} />
					</Badge>
					{item.balance_after && <Badge
						variant="dark"
						className="mr-1"
					>= <Credit value={item.balance_after} /></Badge>}
				</div>
			</Col>
			<Col xs={12} md={4} style={{ wordBreak: 'break-word' }}>
				<Alert variant="light">{item.description[router.locale]}</Alert>
			</Col>
		</Row>
	)
}