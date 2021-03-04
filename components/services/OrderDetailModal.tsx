import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import { Order, ServiceProvider, ServiceProviderAction, ServiceRunningReport } from "../../types";
import { VscError, VscLoading } from 'react-icons/vsc'
import { FcBusinessman, FcCalculator, FcClock, FcEnteringHeavenAlive, FcFlowChart, FcHeatMap, FcInternal, FcRating, FcSettings, FcStumbleupon } from "react-icons/fc";
import { useRouter } from "next/router";
import { OrderStatusBadge } from "./OrderStatus";
import { MdAssignmentReturn, MdDone } from "react-icons/md";
import { ImPause2 } from "react-icons/im";
import { useActionModal } from "./ActionModal";
import { useCollectionData, ne } from "react-livequery-hooks";
import useTranslation from "next-translate/useTranslation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ReportChart } from "./ReportChart";
import { FaTrashAlt } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { Credit } from "../common/Credit";
import { VisibleCheck } from "./inputs/VisibleCheck";




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

    const is_vip = props.order.remain_amount != undefined


    const StatusList = [
        {
            icon: BsClockFill,
            text: 'orders.status.created'
        },
        {
            icon: ImPause2,
            text: 'orders.status.paused',
            visible: props.order.active == false,
            color: '#da7712'
        },
        {
            icon: props.order.done || props.order.deleted || props.order.error ? <VscLoading size={30} /> : <Spinner animation="border" variant="primary" />,
            text: 'orders.status.running',
            visible: props.order.active
        },
        {
            icon: VscError,
            text: 'orders.status.error',
            visible: props.order.error,
            color: 'red'
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
        {
            icon: <FaTrashAlt />,
            text: 'orders.status.deleted',
            visible: props.order.deleted,
            color: 'gray'
        },
    ]

    const OrderInfoList = [
        { icon: FcBusinessman, text: 'id', value: props.order.target, variant: 'primary' },
        {
            icon: FcClock,
            text: 'create_at',
            value: dayjs(props.order.created_at).format('DD/MM/YYYY H:m'),
            variant: 'light'
        },
        {
            visible: !is_vip,
            icon: FcFlowChart,
            text: 'orders.start_count',
            value: !is_vip && props.order.start_amount,
            variant: 'light'
        },
        {
            visible: !is_vip,
            icon: FcFlowChart,
            text: 'orders.amount',
            value: !is_vip && props.order.amount,
            variant: 'light'
        },
        {
            visible: is_vip,
            icon: FcFlowChart,
            text: 'orders.vip_amount',
            value: props.order.remain_amount,
            variant: 'light'
        },
        {
            visible: is_vip,
            icon: FcFlowChart,
            text: 'orders.remain_amount',
            value: props.order.remain_amount,
            variant: 'light'
        },
        {
            visible: !is_vip,
            icon: FcFlowChart,
            text: 'orders.target_amount',
            value: props.order.target_amount,
            variant: 'light'
        },
        {
            icon: CgSandClock,
            text: 'orders.mins',
            value: props.order.metadata?.mins,
            variant: 'light'
        },
        {
            visible: !!props.order.voucher,
            icon: FcStumbleupon,
            text: 'vouchers.label',
            value: props.order.voucher,
            variant: 'light'
        },
        {
            visible: props.order.end_time != undefined,
            icon: FcInternal,
            text: 'vouchers.end_time',
            value: dayjs(props.order.end_time).format('DD/MM/YYYY H:m'),
            variant: 'light'
        },
        {
            visible: is_vip,
            icon: FcEnteringHeavenAlive,
            text: 'orders.amount',
            value: props.order.metadata?.amount,
            variant: 'light'
        },
        {
            icon: FcCalculator,
            text: 'orders.total',
            value: <Credit value={props.order.total} />,
            variant: 'success'
        }
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



                            <div className="d-flex justify-content-end align-items-center">
                                {
                                    actions.map(action => (
                                        <VisibleCheck condition={action.visible_condition?.toString()} data={props.order}>
                                            <Button
                                                key={action.id}
                                                className="ml-2"
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => showActionModal({ action, order: props.order })}
                                            >
                                                <span>{action.name[router.locale]}</span>
                                            </Button>
                                        </VisibleCheck>
                                    ))
                                }
                            </div>

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

                            <div className="d-flex justify-content-around align-items-center mt-4 mb-4">
                                {
                                    StatusList.map(({ icon, text, visible, color }, index) => <OrderStatusBadge
                                        icon={icon}
                                        text={t(text)}
                                        visible={visible}
                                        has_previous={index > 0}
                                        color={color}
                                    />)
                                }
                            </div>

                            {
                                OrderInfoList.map(({ icon: Icon, text, value, variant, visible }) => visible != false && (
                                    <Row className="mt-1" style={{ color: '#1176c0' }} >
                                        <Col xs={5} className="d-flex justify-content-start align-items-center">
                                            <Icon size={30} />
                                            <span className="mr-1 ml-2 font-weight-bold">{t(text)}</span>
                                        </Col>
                                        <Col xs={7}>
                                            <h4> <Badge variant={variant}>{value}</Badge></h4>
                                        </Col>
                                    </Row >
                                ))
                            }

                            <Row className="mt-3" >
                                <Col xs={12}>
                                    <Alert variant="primary">{props.order.note}</Alert>
                                </Col>
                            </Row>


                            {
                                props.order.target_amount && <ReportChart service_id={props.service.id} target={props.order.target} />
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
