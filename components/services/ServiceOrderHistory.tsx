
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useDomain } from '../../hooks/useDomain'
import { Button, Col, Dropdown, Form, FormControl, InputGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { lt, useCollectionData, useDocumentData } from 'react-livequery-hooks'
import { DomainService, Order, ServiceProvider, ServiceProviderAction } from '../../types'
import { groupByCreatedTime } from '../../helpers/group'
import { ImCalendar } from 'react-icons/im'
import { IoIosAddCircle } from 'react-icons/io'
import { IconButton } from '../common/IconButton'
import { FcBrokenLink, FcNews } from 'react-icons/fc'
import { CgLink } from 'react-icons/cg'
import { DatePickerWrapper } from '../common/DatePickerWrapper'
import { MainLayout } from '../../layouts/MainLayout'
import { OrderDetailModal } from './OrderDetailModal'
import { OrderItem } from './OrderItem'
import { useActionModal } from './ActionModal'
import useTranslation from 'next-translate/useTranslation'
import { AiOutlineClear } from 'react-icons/ai'
import { get_ms_end_day } from '../../helpers/time'
import { OrderStatusClear, OrderStatusList } from '../../const'
import { useAuth } from 'firebase-easy-hooks'

export const ServiceOrderHistory = () => {

    const domain = useDomain()
    const { user } = useAuth()
    const router = useRouter()
    const { t } = useTranslation('common')

    const { service_id } = router.query

    const { items, empty, filter, filters } = useCollectionData<Order>(domain && user && `domains/${domain.id}/users/${user.uid}/services/${service_id}/orders`, { limit: 10 })
    const { item: domain_service } = useDocumentData<DomainService>(domain && service_id && `domains/${domain.id}/services/${service_id}`)
    const orders = groupByCreatedTime<Order>(items)

    const [active_order, set_active_order] = useState<string>()



    return (
        <Fragment>
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

                <Col xs={12} >
                    <InputGroup className="mb-3">
                        <DatePickerWrapper onChange={d => filter({ ...filters, created_at: lt(get_ms_end_day(d)) })}>
                            <Button variant="outline-primary">{filters.created_at ? new Date(filters.created_at.value).toLocaleDateString('vi') : t('select_date')}</Button>
                        </DatePickerWrapper>
                        <Dropdown>
                            <Dropdown.Toggle className="ml-1" variant="outline-primary" id="dropdown-basic">
                                {Object.keys(OrderStatusList).filter(key => filters[key] == true)[0] || t('status')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => filter({
                                    ...filters,
                                    ...OrderStatusClear
                                })}>{t('all')}</Dropdown.Item>
                                {
                                    Object.keys(OrderStatusList).slice(1).map(status => (
                                        <Dropdown.Item onClick={() => filter({
                                            ...filters,
                                            ...OrderStatusClear,
                                            [status]: true,
                                        })}>{t(status)}</Dropdown.Item>
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
            <Row>
                <Col>
                    {empty && <div className="text-center">{t('empty_data')}</div>}
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

        </Fragment>

    )
} 