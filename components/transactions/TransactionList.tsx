import dayjs from "dayjs"
import useTranslation from "next-translate/useTranslation"
import router from "next/router"
import React, { Fragment, useMemo } from "react"
import { Badge, Button, Col, Dropdown, Row } from "react-bootstrap"
import { ImCalendar } from "react-icons/im"
import { lt, useCollectionData } from "react-livequery-hooks"
import { groupByCreatedTime, groupByKey } from "../../helpers/group"
import { get_ms_end_day } from "../../helpers/time"
import { useInfinityScroll } from "../../hooks/useInfinityScroll"
import { useFullGroupedServices, useServices } from "../../hooks/useServices"
import { Domain, PaymentHistory, User } from "../../types"
import { CenteredSpinner } from "../common/CenteredSpinner"
import { DatePickerWrapper } from "../common/DatePickerWrapper"
import { IconButton } from "../common/IconButton"
import { ListTransactionsItem } from "./TransactionItem"

export type TransactionList = {
    user: User
    domain: Domain
    show_loadmore_button?: boolean
    default_service_id?: string
}

export const TransactionList = ({ user, domain, show_loadmore_button, default_service_id }: TransactionList) => {


    const payment_histories_ref = useMemo(() => {
        if (user && domain) return `domains/${domain?.id}/users/${user.id}/payment-histories`
        return `domains/${domain?.id}/payment-histories`
    }, [domain, user])

    const { items, fetch_more, has_more, empty, loading, filters, filter } = useCollectionData<
        PaymentHistory
    >(payment_histories_ref, {
        limit: 8,
        ...default_service_id ? {
            where: {
                service_id: default_service_id
            }
        } : {}
    })

    const { t, lang } = useTranslation('common')

    const services = useFullGroupedServices()

    const payments = groupByCreatedTime(items)

    const service_types = {
        ...[...services.values()].reduce((p, c) => ({
            ...p,
            [c.id]: c.name[lang]
        }), {} as any)
    }

    useInfinityScroll(() => has_more && !show_loadmore_button && fetch_more())

    return (
        <Fragment>
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
                                Object.keys(service_types).map(service_id => service_id.includes('__') ? <Dropdown.Divider key={service_id + 'devider'} /> : (
                                    <Dropdown.Item
                                        onClick={() => filter({ ...filters, service_id })}
                                        key={service_id}
                                    >{service_types[service_id]}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <div className="mt-3" />
            {!empty && (
                <Fragment>
                    <div className="d-flex justify-content-end">
                        <Badge variant="primary" className="mr-1">{t('payments.balance')}</Badge>
                        <Badge variant="success" className="mr-1">{t('payments.add')}</Badge>
                        <Badge variant="danger" className="mr-1">{t('payments.sub')}</Badge>
                        <Badge variant="dark" className="mr-1">{t('payments.balance_after')}</Badge>
                    </div>
                </Fragment>
            )}
            {empty && <div className="text-center">{t('empty_data')}</div>}
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
                            list.sort((a, b) => b.created_at - a.created_at).map((item, index) => (
                                <ListTransactionsItem
                                    style={{
                                        borderBottom: index < list.length - 1 && '1px dotted gray',
                                        padding: '10px 0 0px 0 '
                                    }}
                                    icon={services.get(item.service_id)?.icon}
                                    service_name={services.get(item.service_id)?.name[router.locale]}
                                    item={item}
                                    key={item.id}
                                />
                            ))
                        }
                    </Fragment>
                ))
            }
            {loading && !show_loadmore_button && <CenteredSpinner />}
            {show_loadmore_button && has_more && (
                <Row>
                    <Col xs={12} className="text-center">
                        <IconButton
                            loading={loading}
                            disabled={loading}
                            onClick={fetch_more}
                        >{t('load_more')}</IconButton>
                    </Col>
                </Row>
            )}
        </Fragment >
    )
}