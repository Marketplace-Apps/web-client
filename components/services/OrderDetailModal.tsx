import dayjs from "dayjs";
import React, { Fragment, useState } from "react";
import { Alert, Badge, Button, ButtonGroup, Card, Col, Dropdown, DropdownButton, Modal, Row, Spinner } from "react-bootstrap";
import { BiBullseye } from "react-icons/bi";
import { BsCalendarFill, BsClockFill } from "react-icons/bs";
import { Order, ServiceProvider } from "../../types";
import { useExtendOrderModal } from "./ExtendOrderModal";
import { useReportErrorModal } from "./ReportErrorModal";
import { useUpdateOrderModal } from './UpdateOrderModal'
import { VscError, VscLoading } from 'react-icons/vsc'
import { RiCheckDoubleLine } from "react-icons/ri";
import { CgBorderStyleDotted } from "react-icons/cg";
import { FcAutomatic, FcBusinessman, FcCalendar, FcClock, FcEditImage, FcFlowChart, FcHeatMap, FcRating, FcSettings } from "react-icons/fc";
import { IconButton } from "../common/IconButton";
import { Router, useRouter } from "next/router";
import { useDeleteOrderModal } from "./DeleteOrderModal";
import Switch from 'react-input-switch'
import { OrderStatusBadge } from "./OrderStatus";
import { MdAssignmentReturn, MdBugReport, MdDone } from "react-icons/md";
import { ImPause2 } from "react-icons/im";




export type OrderDetailModal = {
    order: Order
    onHide?: Function
    service: ServiceProvider<any>
}
export const OrderDetailModal = (props: OrderDetailModal) => {

    const router = useRouter()

    const { ExtendOrderModal, showExtendOrderModal } = useExtendOrderModal(props.order, props.service)
    const { ReportErrorModal, showReportErrorModal } = useReportErrorModal(props.order, props.service)
    const { UpdateOrderModal, showUpdateOrderModal } = useUpdateOrderModal(props.order, props.service)
    const { DeleteOrderModal, showDeleteOrderModal } = useDeleteOrderModal(props.order, props.service, () => props.onHide())



    const SubModalOpen = [DeleteOrderModal, UpdateOrderModal, ExtendOrderModal, ReportErrorModal].some(m => m)

    const [value, setValue] = useState(0)

    return (
        <Fragment>
            {ExtendOrderModal}
            {ReportErrorModal}
            {UpdateOrderModal}
            {DeleteOrderModal}
            {
                !SubModalOpen && props.order && (
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
                                <Col xs={7}>
                                    <h4> <Badge variant="warning">{props.order.remain_amount || (
                                        (~~(props.order.end_time - Date.now()) / 1000 / 60 / 60 / 24)
                                    )} {props.service.type == 'days' ? 'ngày' : 'lần'}</Badge></h4>
                                </Col>
                                <Col xs={5} className="d-flex justify-content-start align-items-center">
                                    <FcRating size={30} />
                                    <span className="mr-1 ml-2 font-weight-bold">Tổng tiền </span>
                                </Col>
                                <Col xs={7}>
                                    <h4> <Badge variant="success">{props.order.total.toLocaleString()}</Badge></h4>
                                </Col>

                            </Row>
                            <Row className="mt-3" >
                                <Col xs={12}>
                                    <Alert variant="primary">{props.order.note}</Alert>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button className="ml-2" variant="primary" size="sm" onClick={showUpdateOrderModal}>Cập nhật</Button>
                                {props.service.type != 'one-time' && <Button className="ml-2" variant="warning" size="sm" onClick={showExtendOrderModal}>Gia hạn</Button>}
                                {/* <Button className="ml-2" variant="dark" size="sm" onClick={showReportErrorModal}>Báo lỗi</Button> */}
                                {props.service?.allow_auto_refund && <Button className="ml-2" variant="danger" size="sm" onClick={showDeleteOrderModal}>Hủy đơn</Button>}
                            </div>
                        </Modal.Body>

                        <Modal.Footer>

                            <Button variant="secondary" size="sm" onClick={props.onHide as any}>
                                Close
                      </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }

        </Fragment>
    )
}