import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import { DomainService, Order, ServiceProviderAction } from "../../types";
import { VscError } from 'react-icons/vsc'
import { FcBusinessman, FcClock, FcFlowChart, FcHeatMap, FcRating, FcSettings } from "react-icons/fc";
import { useRouter } from "next/router";
import { OrderStatusBadge } from "./OrderStatus";
import { MdAssignmentReturn, MdDone } from "react-icons/md";
import { ImPause2 } from "react-icons/im";
import { useActionModal } from "./ActionModal";
import { useCollectionData, ne } from "react-livequery-hooks";
import useTranslation from "next-translate/useTranslation";




export type OrderDetailModal = {
    order: Order
    onHide?: Function
    domain_service: DomainService
}
export const OrderDetailModal = (props: OrderDetailModal) => {

    const router = useRouter()

    const { ActionModal, showActionModal } = useActionModal(props.domain_service)
    const { t } = useTranslation('common')
    const { items: actions } = useCollectionData<ServiceProviderAction>(`services/${props.domain_service.id}/actions`, {
        where: {
            id: ne('create'),
            hidden: ne(true),
            active: ne(false)
        }
    })

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
                                    <img src={props.domain_service?.icon} width={30} className="mr-3 mb-1" />
                                    <span style={{ fontWeight: 'bold' }}>{props.domain_service.name[router.locale]}</span>
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
                                <OrderStatusBadge
                                    icon={BsClockFill}
                                    text={t('orders.status.created')}
                                    has_previous={false}
                                />
                                <OrderStatusBadge
                                    icon={ImPause2}
                                    color="#fd8e2d"
                                    text={t('orders.status.paused')}
                                    visible={props.order.active == false}
                                />
                                <OrderStatusBadge
                                    icon={<Spinner animation="border" variant="primary" />}
                                    text={t('orders.status.running')}
                                    visible={props.order.running}
                                />
                                <OrderStatusBadge
                                    icon={VscError}
                                    text={t('orders.status.error')}
                                    color="red"
                                    visible={props.order.error}
                                />
                                <OrderStatusBadge
                                    icon={MdAssignmentReturn}
                                    text={t('orders.status.refunded')}
                                    color="orange"
                                    visible={props.order.refunded}
                                />
                                <OrderStatusBadge
                                    icon={MdDone}
                                    text={t('orders.status.done')}
                                    color="green"
                                    visible={props.order.done}
                                />
                            </div>
                            <Row className="mt-3" style={{ color: '#1176c0' }} >
                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcBusinessman size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">ID </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="primary">{props.order.target}</Badge></h4>
                                </Col>
                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcClock size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">{t('create_at')} </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="info">{dayjs(props.order.created_at).format('DD/MM/YYYY H:m')}</Badge></h4>
                                </Col>

                                {/* <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcFlowChart size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Số lượng ban đầu </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.amount}</Badge></h4>
                                </Col> */}

                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcFlowChart size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold" >{t('orders.amount')}</span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.amount}</Badge></h4>
                                </Col>

                                {/* <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcFlowChart size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Số lượng hiện tại </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.amount}</Badge></h4>
                                </Col> */}


                                {/* <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcHeatMap size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Còn lại</span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.amount}</Badge></h4>
                                </Col> */}

                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcRating size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">{t('orders.total')} </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="success">{props.order.total.toLocaleString()}</Badge></h4>
                                </Col>

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