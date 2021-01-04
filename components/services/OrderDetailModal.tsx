import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, Col, Modal, Row, Spinner } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import { DomainService, Order, ServiceProvider } from "../../types";
import { VscError, VscLoading } from 'react-icons/vsc'
import { FcBusinessman, FcClock, FcFlowChart, FcHeatMap, FcRating, FcSettings } from "react-icons/fc";
import { useRouter } from "next/router";
import Switch from 'react-input-switch'
import { OrderStatusBadge } from "./OrderStatus";
import { MdAssignmentReturn, MdBugReport, MdDone } from "react-icons/md";
import { ImPause2 } from "react-icons/im";
import { useActionModal } from "./ActionModal";




export type OrderDetailModal = {
    order: Order
    onHide?: Function
    service: ServiceProvider<any>,
    domain_service: DomainService
}
export const OrderDetailModal = (props: OrderDetailModal) => {

    const router = useRouter()

    const { ActionModal, showActionModal } = useActionModal(props.service, props.domain_service)

    const [value, setValue] = useState(0)

    return (
        <Fragment>
            {ActionModal}
            {
                !ActionModal && props.order && (
                    <Modal show={true} onHide={props.onHide} >
                        <Modal.Header closeButton>
                            <Modal.Title>Order detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Row>
                                <Col xs={10}>
                                    <img src={props.service?.icon} width={30} className="mr-3 mb-1" />
                                    <span style={{ fontWeight: 'bold' }}>{props.service.name[router.locale]}</span>
                                </Col>
                                <Col xs={2} className="d-flex justify-content-end align-items-center">
                                    <Switch
                                        value={value} onChange={setValue}
                                        styles={{
                                            track: {
                                                backgroundColor: 'gray'
                                            },
                                            trackChecked: {
                                                backgroundColor: '#3aafea'
                                            },
                                            button: {
                                                backgroundColor: 'white'
                                            },
                                            buttonChecked: {
                                                backgroundColor: 'white'
                                            }
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="mt-3">
                                <Col xs={5}>
                                    <img src={props.order.thumbnail} style={{ width: '100%' }} />
                                </Col>
                                <Col xs={7}>
                                    <div style={{ fontWeight: 'bold' }} > {props.order.title} </div>
                                    <div style={{ fontSize: 14 }}> {props.order.description} </div>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-around align-items-center mt-4">
                                <OrderStatusBadge
                                    icon={BsClockFill}
                                    text='Đã tạo'
                                    has_previous={false}
                                />
                                <OrderStatusBadge
                                    icon={ImPause2}
                                    color="#fd8e2d"
                                    text='Đang dừng'
                                    visible={props.order.active == false}
                                />
                                <OrderStatusBadge
                                    icon={<Spinner animation="border" variant="primary" />}
                                    text='Đang chạy'
                                    visible={props.order.running}
                                />
                                <OrderStatusBadge
                                    icon={VscError}
                                    text='Lỗi'
                                    color="red"
                                    visible={props.order.error}
                                />
                                <OrderStatusBadge
                                    icon={MdAssignmentReturn}
                                    text='Đã hoàn tiền'
                                    color="orange"
                                    visible={props.order.refunded}
                                />
                                <OrderStatusBadge
                                    icon={MdDone}
                                    text='Xong'
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
                                    <span className="mr-1 ml-2 font-weight-bold">Đã tạo </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="info">{dayjs(props.order.created_at).format('DD/MM/YYYY H:m')}</Badge></h4>
                                </Col>
                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcFlowChart size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Số lượng </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.amount}</Badge></h4>
                                </Col>
                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcHeatMap size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Còn lại</span>
                                </Col>


                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcRating size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Tổng tiền </span>
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

                                    Object
                                        .keys(props.service.actions)
                                        .filter(name => name != 'create')
                                        .map(name => (
                                            <Button
                                                className="ml-2"
                                                variant="primary"
                                                size="sm"
                                                onClick={() => showActionModal({ action_id: name, order: props.order })}
                                            >
                                                <span>{name}</span>
                                            </Button>
                                        ))
                                }
                            </div>
                        </Modal.Body >

                        <Modal.Footer>

                            <Button variant="secondary" size="sm" onClick={props.onHide as any}>
                                Close
                      </Button>
                        </Modal.Footer>
                    </Modal >
                )
            }

        </Fragment >
    )
}