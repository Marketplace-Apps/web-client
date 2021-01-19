import React, { Fragment } from 'react'
import { useDomain } from '../hooks/useDomain'
import { useInfinityScroll } from '../hooks/useInfinityScroll'
import { groupBy2Key, groupByCreatedTime, groupByKey } from '../helpers/group'
import { lt, useCollectionData } from 'react-livequery-hooks'
import { PaymentHistory } from '../types'
import { useAuth } from 'firebase-easy-hooks'
import { MainLayout } from '../layouts/MainLayout'
import { useServices } from '../hooks/useServices'
import { Alert, Badge, Button, Col, Dropdown, Row } from 'react-bootstrap'
import { DatePickerWrapper } from '../components/common/DatePickerWrapper'
import { ImCalendar } from 'react-icons/im'
import { AppRouteList } from '../AppRouteList'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { get_ms_end_day } from '../helpers/time'
import useTranslation from 'next-translate/useTranslation'

const TransactionPage = () => {

    const domain = useDomain()
    const router = useRouter()
    const { user } = useAuth()

    const { items, fetch_more, has_more, empty, loading, filters, filter } = useCollectionData<
        PaymentHistory
    >(
        domain && user && `domains/${domain?.id}/users/${user.uid}/payment-histories`, { limit: 8 }
    )

    const { t } = useTranslation('common')

    const services = groupByKey([
        {
            id: 'SEND_MONEY',
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaz_Rc8biOUNvof9yETcoKfH9jzLDCmRVzw&usqp=CAU',
            name: { en: 'Send money', vi: 'Gửi tiền' }
        },
        {
            id: 'RECEIVE_MONEY',
            icon: 'https://img.icons8.com/cotton/2x/money-transfer.png',
            name: { en: 'Receive money', vi: 'Nhận tiền' }
        },
        ...useServices(),
    ], 'id')
    const payments = groupByCreatedTime(items)

    const service_types = {
        ...[...services.values()].reduce((p, c) => ({
            ...p,
            [c.id]: c.name[router.locale]
        }), {} as any)
    }

    useInfinityScroll(() => has_more && fetch_more())

    return (
        <MainLayout title={AppRouteList.Transactions.name}>
            <Row>
                <Col xs={6}>
                    <DatePickerWrapper onChange={d => filter({ ...filters, created_at: lt(get_ms_end_day(d)) })}>
                        <Button variant="outline-primary">{filters.created_at ? new Date(filters.created_at.value).toLocaleDateString('vi') : t('select_date')}</Button>
                    </DatePickerWrapper>
                </Col>
                <Col xs={6} className="text-right">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                            {filters.service_id ? service_types[filters.service_id.value] : t('all')}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => {
                                const { service_id, ...rest } = filters
                                filter(rest)
                            }}>{t('all')}</Dropdown.Item>
                            {
                                Object.keys(service_types).map(service_id => service_id.includes('__') ? <Dropdown.Divider /> : (
                                    <Dropdown.Item
                                        onClick={() => filter({ ...filters, service_id })}
                                    >{service_types[service_id]}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <div className="mt-5" />
            {
                payments.map(({ day, list }) => (
                    <Fragment key={day}>
                        <Row >
                            <Col xs={12} className="d-flex justify-content-start align-items-center mt-2 ml-2 mb-1">
                                <ImCalendar size={25} color="#59a2eb" />
                                <span style={{ color: '#59a2eb', marginLeft: 5 }}>{dayjs(new Date(list[0].created_at)).locale('vi').format('DD/MM/YYYY')}</span>
                            </Col>
                        </Row>
                        {
                            list.map((item, index) => (
                                <Row noGutters key={item.id} style={{ borderBottom: index < list.length - 1 && '1px dotted gray', padding: '10px 0 0px 0 ' }} >
                                    <Col xs={2} className="d-flex justify-content-center align-items-center" >
                                        <img src={services.get(item.service_id)?.icon} style={{ width: 50 }} />
                                    </Col>
                                    <Col xs={6} md={3} className="d-flex justify-content-start align-items-center ">
                                        <div>
                                            <div style={{ fontWeight: 'bold', color: '#2b69b7' }}>{services.get(item.service_id)?.name[router.locale]}</div>
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
                            ))
                        }
                    </Fragment>
                ))
            }
        </MainLayout >
    )
}

export default TransactionPage




