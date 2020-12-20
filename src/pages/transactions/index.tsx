import React, { Fragment } from 'react'
import { useDomain } from '../../hooks/useDomain'
import { useInfinityScroll } from '../../hooks/useInfinityScroll'
import { groupBy2Key, groupByCreatedTime, groupByKey } from '../../helpers/group'
import { useCollectionData } from 'react-livequery-hooks'
import { PaymentHistory } from '../../types'
import { useAuth } from 'firebase-easy-hooks'
import { MainLayout } from '../../layouts/MainLayout'
import { useServices } from '../../hooks/useServices'
import { Alert, Badge, Button, Col, Dropdown, Row } from 'react-bootstrap'
import { DatePickerWrapper } from '../../components/common/DatePickerWrapper'
import { ImCalendar } from 'react-icons/im'
import { AppRouteList } from '../../AppRouteList'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

const TransactionPage = () => {

	const domain = useDomain()
	const router = useRouter()
	const { user } = useAuth()

	const { items, fetch_more, has_more, empty, loading } = useCollectionData<
		PaymentHistory
	>(
		domain && user && `domains/${domain?.id}/users/${user.uid}/payment-histories`,{limit:8}
	)

	const services = groupByKey(useServices(), 'id')
	const payments = groupByCreatedTime(items)


	useInfinityScroll(() => has_more && fetch_more())

	return (
		<MainLayout title={AppRouteList.Transactions.name}>
			<Row>
				<Col xs={6}>
					<DatePickerWrapper>
						<Button variant="outline-primary">Chọn ngày</Button>
					</DatePickerWrapper>
				</Col>
				<Col xs={6} className="text-right">
					<Dropdown>
						<Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
							Dịch vụ
 						 </Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item>Toàn bộ</Dropdown.Item>
							<Dropdown.Item>Nạp tiền</Dropdown.Item>
							<Dropdown.Item>Hoàn tiền</Dropdown.Item>
							<Dropdown.Divider />
							{
								[... services.values()].map(service => <Dropdown.Item>{service.name[router.locale]}</Dropdown.Item>)
							} 
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
			{
				payments.map(({ day, list }) => (
					<Fragment key={day}>
						<Row >
							<Col xs={12} className="d-flex justidy-content-center align-items-center mt-5 ml-2 mb-3">
								<ImCalendar size={25} color="#59a2eb" />
								
								<span style={{ color: '#59a2eb', marginLeft: 5 }}>{dayjs(new Date(list[0].created_at)).locale('vi').format('DD/MM/YYYY')}</span>
							</Col>
						</Row>
						{
							list.map(item => (
								<Row noGutters key={item.id} style={{ borderBottom: '1px dotted gray', padding: '10px 0 10px 0 ' }} >
									<Col xs={2} className="d-flex justify-content-center align-items-center" > 
										<img src={services.get(item.service_id)?.icon} style={{ width: 50 }} />
									</Col>
									<Col xs={6} md={3}>
										<div style={{ fontWeight: 'bold' }}>{services.get(item.service_id)?.name[router.locale]}</div>
										<div style={{ fontSize: 12 }}>{dayjs(new Date(item.created_at)).locale('vi').format('H:m')}</div>
										{/* <Badge variant="info">Voucher: HPNY [-20%]</Badge> */}

									</Col>
									<Col md={3} className="d-none d-md-block">
										<Alert variant="light">"{item.description[router.locale]}"</Alert>
									</Col>
									<Col xs={2}>
										<Badge variant="info">9</Badge>
										<Badge variant="light">x200</Badge>
									</Col>
									<Col xs={2} >
										<Badge variant="primary" className="mr-1">{(item.balance_after - item.total).toLocaleString()}</Badge>
										<Badge variant="success" className="mr-1">{item.total.toLocaleString()}</Badge>
										<Badge variant="dark" className="mr-1">= {item.balance_after.toLocaleString()}</Badge>
									</Col>
									<Col md={12} className="d-md-none d-sm-block">
										<Alert style={{ margin: 0 }} variant="light">"{item.description[router.locale]}"</Alert>
									</Col>
								</Row>
							))
						}
					</Fragment>
				))
			}
		</MainLayout >
	)
}

export default TransactionPage



