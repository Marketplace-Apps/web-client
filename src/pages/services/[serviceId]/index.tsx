
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useCollectionData, useDocumentData } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProvider } from '../../../types'
import { groupByCreatedTime } from '../../../helpers/group'
import { ImCalendar } from 'react-icons/im'
import { IoIosAddCircle } from 'react-icons/io'
import { IconButton } from '../../../components/common/IconButton'
import { FcBrokenLink, FcNews } from 'react-icons/fc'
import { CgLink } from 'react-icons/cg'
import { DatePickerWrapper } from '../../../components/common/DatePickerWrapper'
import { MainLayout } from '../../../layouts/MainLayout'
import { OrderDetailModal } from '../../../components/services/OrderDetailModal'
import { useCreateOrderModal } from '../../../components/services/CreateOrderModal'
import { OrderItem } from '../../../components/services/OrderItem'

const ServiceDetailPage = () => {

	const domain = useDomain()
	const router = useRouter()

	const { serviceId } = router.query

	const { items, reload } = useCollectionData<Order>(domain && `domains/${domain.id}/services/${serviceId}/orders`)
	const { item: service_price } = useDocumentData<DomainService>(domain && serviceId && `domains/${domain.id}/services/${serviceId}`)
	const { item: service } = useDocumentData<ServiceProvider<any>>(serviceId && `services/${serviceId}`)

	const orders = groupByCreatedTime<Order>(items)

	const { CreateOrderModal, showCreateOrderModal } = useCreateOrderModal(service, service_price, reload)



	const [active_order, set_active_order] = useState<string>()

	return (
		<MainLayout title={service?.name || { en: 'Services', vi: 'Dịch vụ' }}>
			{CreateOrderModal}
			{
				active_order && (
					<OrderDetailModal
						onHide={() => set_active_order(null)}
						order={active_order && orders && items.filter(o => o.id == active_order)[0]}
						service={service}
					/>
				)
			}
			<Row style={{ marginTop: 10, marginBottom: 15 }}>
				<Col xs={12} lg={6} className="d-flex justify-content-start align-items-center">
					<img src={service?.icon} width={30} height={30} />
					<div style={{ marginLeft: 10, fontWeight: 'bold' }}>{service?.name[router.locale]}</div>
				</Col>
				<Col xs={12} lg={6} className="d-flex p-3 justify-content-end align-items-center">

					<IconButton
						variant="outline-primary"
						icon={CgLink}
						iconProps={{ color: '#08c8f5', size: 20, className: 'mb-1 mr-1' }}
						className="mr-3"
					>API</IconButton>

					<IconButton
						variant="outline-primary"
						icon={FcNews}
						iconProps={{ color: 'orange', size: 20, className: 'mb-1 mr-1' }}
						className="mr-3"
					>Giới thiệu</IconButton>

					<IconButton
						icon={IoIosAddCircle}
						iconProps={{ color: 'white', size: 20, className: 'mb-1 mr-1' }}
						onClick={() => showCreateOrderModal()}
					>Tạo mới</IconButton>
				</Col>
				<Col xs={12} >
					<InputGroup className="mb-3">
						<DatePickerWrapper>
							<Button variant="outline-primary">Chọn ngày</Button>
						</DatePickerWrapper>
						<FormControl placeholder="Search UID" />
						<InputGroup.Append>
							<Button variant="outline-danger">Xóa lọc</Button>
						</InputGroup.Append>
					</InputGroup>

				</Col>

			</Row>
			{orders.map(({ list, day }, index) => (
				<Fragment key={day}>
					<Row style={{ paddingLeft: 10, marginTop: 20 }}  >
						<Col className="d-flex justify-content-start align-items-center">
							<ImCalendar size={20} color="#71a7f9" />
							<span style={{ color: '#71a7f9', marginLeft: 5, fontWeight: 'bold' }}>
								{day}
							</span>
						</Col>
					</Row>
					<Row noGutters>
						{list.map(order => (
							<Col xs={12} md={6} lg={4} xl={3} key={order.id}>
								<OrderItem
									key={order.id}
									order={order}
									onClick={() => set_active_order(order.id)}
								/>
							</Col>
						))}
					</Row>
				</Fragment>
			))}


		</MainLayout>
	)
}

export default ServiceDetailPage