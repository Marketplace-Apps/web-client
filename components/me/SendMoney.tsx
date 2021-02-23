
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
import { TransactionList } from "../transactions/TransactionList"


export const SendMoney = ({ user }: { user: User }) => {

    const {current_domain} = useDomain()

    const form = useForm({
        defaultValues: {
            amount: 0
        }
    })
    const { data, error, excute, loading } = useAction(current_domain && `domains/${current_domain.id}/users/~send-money`, undefined, () => {
        form.reset()
    })

    const { t, lang } = useTranslation('common')


    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(data => excute(data))} >
                <input type="hidden" name="to" value={user.id} ref={form.register()} />
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
                        {user && <TransactionList
                            user={user}
                            domain={current_domain}
                            show_loadmore_button={true}
                            default_service_id="RECEIVE_MONEY"
                        />}
                    </Col>
                </Row>
            </Form>
        </FormProvider>

    )

} 