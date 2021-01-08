
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useDomain } from '../../../hooks/useDomain'
import { Button, Col, Dropdown, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { lt, useCollectionData, useDocumentData } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProvider, ServiceProviderAction } from '../../../types'
import { groupByCreatedTime } from '../../../helpers/group'
import { ImCalendar } from 'react-icons/im'
import { IoIosAddCircle } from 'react-icons/io'
import { IconButton } from '../../../components/common/IconButton'
import { FcBrokenLink, FcNews } from 'react-icons/fc'
import { CgLink } from 'react-icons/cg'
import { DatePickerWrapper } from '../../../components/common/DatePickerWrapper'
import { MainLayout } from '../../../layouts/MainLayout'
import { OrderDetailModal } from '../../../components/services/OrderDetailModal'
import { OrderItem } from '../../../components/services/OrderItem'
import { useActionModal } from '../../../components/services/ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { AiOutlineClear } from 'react-icons/ai'
import { get_ms_end_day } from '../../../helpers/time'
import { OrderStatusClear, OrderStatusList } from '../../../const'

const ServiceDetailPage = () => {

	const domain = useDomain()
	const router = useRouter()
	const { t } = useTranslation('common')

	const { serviceId } = router.query

	const { items, reload, filter, filters } = useCollectionData<Order>(domain && `domains/${domain.id}/services/${serviceId}/orders`, { limit: 10 })
	const { item: domain_service } = useDocumentData<DomainService>(domain && serviceId && `domains/${domain.id}/services/${serviceId}`)
	// const { item: service } = useDocumentData<ServiceProvider<any>>(serviceId && `services/${serviceId}`)
	const { item: create_action } = useDocumentData<ServiceProviderAction>(serviceId && `services/${serviceId}/actions/create`)

	const orders = groupByCreatedTime<Order>(items)

	const { showActionModal, ActionModal } = useActionModal(domain_service, reload)

	const [active_order, set_active_order] = useState<string>()



	return (
		<MainLayout title={domain_service?.name || { en: 'Services', vi: 'Dịch vụ' }}>
			{ActionModal}
			{
				active_order && (
					<OrderDetailModal
						domain_service={domain_service}
						onHide={() => set_active_order(null)}
						order={active_order && orders && items.filter(o => o.id == active_order)[0]}
					/>
				)
			}
			<Row style={{ marginTop: 10, marginBottom: 15 }}>
				<Col xs={12} lg={6} className="d-flex justify-content-start align-items-center">
					<img src={domain_service?.icon} width={30} height={30} />
					<div style={{ marginLeft: 10, fontWeight: 'bold' }}>{domain_service?.name[router.locale]}</div>
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
					>{t('introduce')}</IconButton>

					{
						create_action && (
							<IconButton
								icon={IoIosAddCircle}
								iconProps={{ color: 'white', size: 20, className: 'mb-1 mr-1' }}
								onClick={() => showActionModal({ action: create_action })}
							>{t('create')}</IconButton>
						)
					}
				</Col>
				<Col xs={12} >
					<InputGroup className="mb-3">
						<DatePickerWrapper onChange={d => filter({ ...filters, created_at: lt(get_ms_end_day(d)) })}>
							<Button variant="outline-primary">{filters.created_at ? new Date(filters.created_at.value).toLocaleDateString('vi') : t('select_date')}</Button>
						</DatePickerWrapper>
						<Dropdown>
							<Dropdown.Toggle className="ml-1" variant="outline-primary" id="dropdown-basic">
								{Object.keys(filters).filter(key => filters[key])[0] || 'Status'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => filter({
									...filters,
									...OrderStatusClear
								})}>all</Dropdown.Item>
								{
									Object.keys(OrderStatusList).slice(1).map(status => (
										<Dropdown.Item onClick={() => filter({
											...filters,
											...OrderStatusClear,
											[status]: true,
										})}>{status}</Dropdown.Item>
									))
								}
							</Dropdown.Menu>
						</Dropdown>
						<FormControl
							className="ml-1"
							placeholder={`${t('search')} UID`}
						/>
						<InputGroup.Append>
							<Button variant="outline-danger" onClick={() => filter({})}><AiOutlineClear /></Button>
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
