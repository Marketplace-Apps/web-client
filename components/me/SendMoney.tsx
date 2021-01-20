
import dayjs from "dayjs"
import useTranslation from "next-translate/useTranslation"
import { Fragment, useState } from "react"
import { Alert, Badge, Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { AiFillCaretDown } from "react-icons/ai"
import { BiSend } from "react-icons/bi"
import { FcCalendar, FcDownload } from "react-icons/fc"
import { useAction, useCollectionData } from "react-livequery-hooks"
import { groupByCreatedTime } from "../../helpers/group"
import { useDomain } from "../../hooks/useDomain"
import { PaymentHistory, User } from "../../types"
import { IconButton } from "../common/IconButton"
import { NumberFormatInput } from "../common/NumberFormatInput"


export const SendMoney = (props: { user: User }) => {

    const domain = useDomain()

    const form = useForm({
        defaultValues: {
            amount: 0
        }
    })
    const { data, error, excute, loading } = useAction(domain && `domains/${domain.id}/users/~send-money`, undefined, () => {
        form.reset()
    })

    const { t, lang } = useTranslation('common')

    const { items, fetch_more, has_more, empty, loading: loading_histories } = useCollectionData<
        PaymentHistory
    >(
        domain && props.user && `domains/${domain?.id}/users/${props.user.id}/payment-histories`, { limit: 2 }
    )

    const payments = groupByCreatedTime(items)

    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(data => excute(data))} >
                <input type="hidden" name="to" value={props.user.id} ref={form.register()} />
                <Row>
                    <Col xs={12} className="mb-2 font-weight-bold">{t('send_money.send_money')}</Col>
                    <Col xs={12} className="mb-2">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{t('send_money.amount')}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <NumberFormatInput
                                allowNegative={true}
                                name="amount"
                            />
                        </InputGroup>


                    </Col>
                    <Col xs={12} className="mb-2 ">
                        <Form.Control
                            as="textarea"
                            name="note"
                            placeholder={t('note')}
                            ref={form.register()}
                            rows={3}
                        />
                    </Col>
                    {data && <Col xs={12}> <Alert variant="success">Chuyển tiền thành công</Alert> </Col>}
                    {error && <Col xs={12}><Alert variant="danger">{t('server_errors.' + error.message)}</Alert></Col>}
                    <Col xs={12} className="text-right"><IconButton icon={BiSend} size="sm" disabled={loading} loading={loading} type="submit">OK</IconButton></Col>
                    <Col xs={12} className="mt-4 font-weight-bold">{t('send_money.history')}</Col>
                    <Col xs={12} className="mt-2">
                        <Row>
                            {
                                payments.map(({ day, list }) => (
                                    <Fragment>
                                        <Col xs={12} className="mt-2"> <FcCalendar size={26} className="mr-1" />{day}</Col>
                                        <Col xs={12}>
                                            {
                                                list.map((payment, index) => (
                                                    <Row style={{ borderBottom: index < list.length - 1 && '1px solid #d6d4d4', padding: 10 }}>
                                                        <Col xs={2} className="d-flex align-items-center">{dayjs(payment.created_at).format('H:m')}</Col>
                                                        <Col xs={5} style={{ fontSize: 15, wordBreak: 'break-all' }}>{payment.description[lang]}</Col>
                                                        <Col xs={5} className="d-flex align-items-center">
                                                            {payment.amount > 0 && <Badge variant="success">+{payment.amount.toLocaleString()}</Badge>}
                                                            {payment.amount < 0 && <Badge variant="success">{payment.amount.toLocaleString()}</Badge>}
                                                            <Badge variant="info" className="ml-1">= {payment.balance_after.toLocaleString()}</Badge>
                                                        </Col>
                                                    </Row>
                                                ))
                                            }
                                        </Col>
                                    </Fragment>
                                ))
                            }
                            <Col className="d-flex justify-content-center align-items-center">
                                {has_more && <IconButton
                                    size="sm"
                                    className="mt-2"
                                    variant="outline-info"
                                    onClick={fetch_more}
                                    loading={loading_histories}
                                    disabled={loading_histories}
                                >{t('load_more')}</IconButton>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </FormProvider>

    )

} 