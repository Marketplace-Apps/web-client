import useTranslation from "next-translate/useTranslation";
import React, { Fragment, useState } from "react";
import { Alert, Button, Card, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { FcBusinessman, FcClock, FcCloth, FcMoneyTransfer, FcPositiveDynamic, FcTimeline, FcVoicemail } from "react-icons/fc";
import { AppRouteList } from "../../AppRouteList";
import { useDomainUser } from "../../hooks/useCurrentUser";
import { useDomain } from "../../hooks/useDomain";
import { User } from "../../types";
import { SendMoney } from "./SendMoney";
import { UpdateUserLevel } from "./UpdateUserLevel";


export type UserDetailModal = {
    user: User
    onHide: Function
}
export const UserDetailModal = ({ onHide, user }: UserDetailModal) => {

    const { t, lang } = useTranslation('common')
    const { current_domain, root_domain } = useDomain()
    const me = useDomainUser(root_domain || current_domain)

    const UserInformationReports = [
        { name: t('fullname'), value: user.name, icon: FcBusinessman },
        { name: 'Email', value: user.email, icon: FcVoicemail },
        { name: t('create_at'), value: new Date(user.created_at).toLocaleDateString('vi'), icon: FcClock },
    ]

    const MoneyReports = [
        { name: t('balance'), value: user.balance.toLocaleString(), icon: FcMoneyTransfer },
        { name: t('used'), value: user.total_used.toLocaleString(), icon: FcTimeline },
        { name: t('deposited'), value: user.total_deposit.toLocaleString(), icon: FcCloth },
    ]

    return (
        <Fragment>
            <Modal show={true} onHide={onHide}>

                <Modal.Header closeButton>
                    <Modal.Title>{AppRouteList.Me.children.UserManager.name[lang]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={user.avatar} width={120} style={{ borderRadius: '100%' }} />
                    </div>


                    <Tabs className="mt-3" >

                        <Tab eventKey="info" title={t('introduce')}>
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
                        <Tab eventKey="deposit" title={t('add_funds')}>
                            <div className="p-3" style={{ border: '1px solid #dee2e6 ', borderRadius: '0 0 10px 10px' }}>
                                {current_domain && user && (current_domain.owner_id == user.id ? <Alert variant="danger">{t('contact')} admin</Alert> : <SendMoney user={user} />)}
                            </div>
                        </Tab>
                        <Tab eventKey="prices" title={t('price')}>
                            <div className="p-3" style={{ border: '1px solid #dee2e6 ', borderRadius: '0 0 10px 10px' }}>
                                {me && me.id == user.id ? <Alert variant="danger">{t('contact')} admin</Alert> : <UpdateUserLevel user={user} />}
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