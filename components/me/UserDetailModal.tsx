import React, { Fragment, useState } from "react";
import { Alert, Button, Card, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { FcBusinessman, FcClock, FcCloth, FcMoneyTransfer, FcPositiveDynamic, FcTimeline, FcVoicemail } from "react-icons/fc";
import { ImPriceTag } from "react-icons/im";
import { useAction } from "react-livequery-hooks";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDomain } from "../../hooks/useDomain";
import { User } from "../../types";
import { IconButton } from "../common/IconButton";
import { SendMoney } from "./SendMoney";
import { SettingPrice } from "./SettingPrice";


export type UserDetailModal = {
    user: User
    onHide: Function
}
export const UserDetailModal = ({ onHide, user }: UserDetailModal) => {

    const domain = useDomain()

    const UserInformationReports = [
        { name: 'Họ tên', value: user.name, icon: FcBusinessman },
        { name: 'Email', value: user.email, icon: FcVoicemail },
        { name: 'Tham gia', value: user.created_at, icon: FcClock },
    ]

    const MoneyReports = [
        { name: 'Số dư', value: user.balance.toLocaleString(), icon: FcMoneyTransfer },
        { name: 'Đã dùng', value: user.total_used.toLocaleString(), icon: FcTimeline },
        { name: 'Đã nạp', value: user.total_deposit.toLocaleString(), icon: FcCloth },
    ]

    return (
        <Fragment>
            <Modal show={true} onHide={onHide}>

                <Modal.Header closeButton>
                    <Modal.Title>User detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={user.avatar} width={120} style={{ borderRadius: '100%' }} />
                    </div>


                    <Tabs className="mt-3" >

                        <Tab eventKey="info" title="Thông tin">
                            <div className="p-2" style={{ border: '1px solid #dee2e6 ', borderRadius: '0 0 10px 10px' }}>
                                <Row className="mt-2" style={{ color: '#17a2b8' }}>
                                    {
                                        UserInformationReports.map((item, index) => (
                                            <Fragment key={item.name}>
                                                <Col xs={1}><item.icon size={30} /> </Col>
                                                <Col xs={11} className="d-flex justify-content-between pl-4">
                                                    <span className="font-weight-bold">{item.name}</span>
                                                    <span className={index == 0 && "font-weight-bold"} >
                                                        {item.value}
                                                    </span>
                                                </Col>
                                            </Fragment>
                                        ))
                                    }

                                    {
                                        MoneyReports.map(item => (
                                            <Col
                                                xs={12}
                                                className="mt-3 text-center"
                                                key={item.name}
                                            >
                                                <div style={{ border: '1px solid #17a2b8', padding: 10, borderRadius: 10 }}>
                                                    <item.icon size={30} />
                                                    <span>{item.name} </span>
                                                    <h5>{item.value}</h5>
                                                </div>
                                            </Col>
                                        ))
                                    }

                                </Row>
                            </div>
                        </Tab>
                        <Tab eventKey="deposit" title="Nạp tiền">
                            <div className="p-3" style={{ border: '1px solid #dee2e6 ', borderRadius: '0 0 10px 10px' }}>
                                {domain && user && (domain.owner_id == user.id ? <Alert variant="danger">Liên hệ admin của bạn để nạp tiền </Alert> : <SendMoney user={user} />)}
                            </div>
                        </Tab>
                        <Tab eventKey="prices" title="Giá cả">
                            <div className="p-3" style={{ border: '1px solid #dee2e6 ', borderRadius: '0 0 10px 10px' }}>
                                <SettingPrice user_id={user.id} />
                            </div>
                        </Tab>
                    </Tabs>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onHide as any}
                    >Close</Button>
                </Modal.Footer>
            </Modal >
        </Fragment>
    )
}