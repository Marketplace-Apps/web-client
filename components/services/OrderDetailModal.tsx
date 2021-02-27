import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import { Order, ServiceProvider, ServiceProviderAction, ServiceRunningReport } from "../../types";
import { VscError, VscLoading } from 'react-icons/vsc'
import { FcBusinessman, FcClock, FcFlowChart, FcHeatMap, FcRating, FcSettings } from "react-icons/fc";
import { useRouter } from "next/router";
import { OrderStatusBadge } from "./OrderStatus";
import { MdAssignmentReturn, MdDone } from "react-icons/md";
import { ImPause2 } from "react-icons/im";
import { useActionModal } from "./ActionModal";
import { useCollectionData, ne } from "react-livequery-hooks";
import useTranslation from "next-translate/useTranslation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ReportChart } from "./ReportChart";




export type OrderDetailModal = {
    order: Order
    onHide?: Function
    service: ServiceProvider
}
export const OrderDetailModal = (props: OrderDetailModal) => {

    const router = useRouter()

    const { ActionModal, showActionModal } = useActionModal(props.service.id)
    const { t } = useTranslation('common')

    const { items: actions } = useCollectionData<ServiceProviderAction>(`services/${props.service.id}/actions`, {
        where: {
            id: ne('create')
        }
    })

    const { items: reports, empty } = useCollectionData<ServiceRunningReport['reports'][0]>(`services/${props.service.id}/targets/${props.order.target}/reports`)

    const StatusList = [
        {
            icon: BsClockFill,
            text: 'orders.status.created'
        },
        {
            icon: ImPause2,
            text: 'orders.status.paused',
            visible: props.order.active == false
        },
        {
            icon: props.order.done ? <VscLoading size={30} /> : <Spinner animation="border" variant="primary" />,
            text: 'orders.status.running',
            visible: props.order.active
        },
        {
            icon: VscError,
            text: 'orders.status.error',
            visible: props.order.error
        },
        {
            icon: MdAssignmentReturn,
            text: 'orders.status.refunded',
            visible: props.order.refunded
        },
        {
            icon: MdDone,
            text: 'orders.status.done',
            visible: props.order.done
        },
    ]

    const OrderInfoList = [
        { icon: FcBusinessman, text: 'id', value: props.order.target, variant: 'primary' },
        {
            icon: FcClock,
            text: 'create_at',
            value: dayjs(props.order.created_at).format('DD/MM/YYYY H:m'),
            variant: 'info'
        },
        {
            icon: FcFlowChart,
            text: 'orders.start_count',
            value: props.order.start_count,
            variant: 'warning'
        },
        {
            icon: FcFlowChart,
            text: 'orders.buy_amount',
            value: props.order.amount,
            variant: 'warning'
        }, ,
        {
            icon: FcFlowChart,
            text: 'orders.target_amount',
            value: props.order.target_amount,
            variant: 'warning'
        }, ,
        {
            icon: FcFlowChart,
            text: 'orders.total',
            value: props.order.total,
            variant: 'success'
        },
    ]

    return (
        <Fragment>
            {ActionModal}
            {
                !ActionModal && props.order && (
                    <Modal show={true} onHide={props.onHide} >
                        <Modal.Header closeButton>
                            <Modal.Title>{t('orders.detail')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Row>
                                <Col xs={10}>
                                    <img src={props.service.icon} width={30} className="mr-3 mb-1" />
                                    <span style={{ fontWeight: 'bold' }}>{props.service.name[router.locale]}</span>
                                </Col>
                            </Row>


                            <Row className="mt-3">
                                <Col xs={5}>
                                    <img
                                        src={props.order.thumbnail}
                                        onError={(e: any) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://miro.medium.com/max/7584/1*fSS-6OZLzIzchvvDK6v1gg.jpeg"
                                        }}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col xs={7}>
                                    <div style={{ fontWeight: 'bold' }} > {props.order.title} </div>
                                    <div style={{ fontSize: 14 }}> {props.order.description} </div>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-around align-items-center mt-4">
                                {
                                    StatusList.map(({ icon, text, visible }, index) => <OrderStatusBadge
                                        icon={icon}
                                        text={t(text)}
                                        visible={visible}
                                        has_previous={index > 0}
                                    />)
                                }
                            </div>
                            <Row className="mt-3" style={{ color: '#1176c0' }} >
                                {
                                    OrderInfoList.map(({ icon: Icon, text, value, variant }) => value != undefined && (
                                        <Fragment>
                                            <Col xs={5} className="d-flex justify-content-start align-items-center">
                                                <Icon size={30} />
                                                <span className="mr-1 ml-2 font-weight-bold">{t(text)}</span>
                                            </Col>
                                            <Col xs={7}>
                                                <h4> <Badge variant={variant}>{value}</Badge></h4>
                                            </Col>
                                        </Fragment>
                                    ))
                                }
                            </Row >
                            <Row className="mt-3" >
                                <Col xs={12}>
                                    <Alert variant="primary">{props.order.note}</Alert>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center align-items-center">
                                {
                                    actions.map(action => (
                                        <Button
                                            key={action.id}
                                            className="ml-2"
                                            variant="primary"
                                            size="sm"
                                            onClick={() => showActionModal({ action, order: props.order })}
                                        >
                                            <span>{action.name[router.locale]}</span>
                                        </Button>
                                    ))
                                }
                            </div>

                            {
                                !empty && <ReportChart reports={reports} />
                            }
                        </Modal.Body >

                        <Modal.Footer>

                            <Button variant="secondary" size="sm" onClick={props.onHide as any}>{t('close')} </Button>
                        </Modal.Footer>
                    </Modal >
                )
            }

        </Fragment >
    )
}
