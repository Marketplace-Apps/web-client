
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Alert, Button, Col, Form, Row } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { BiSend } from "react-icons/bi"
import { useAction } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { User } from "../../types"
import { IconButton } from "../common/IconButton"
import { NumberFormatInput } from "../common/NumberFormatInput"


export const SendMoney = (props: { user: User }) => {

    const domain = useDomain()

    const form = useForm()
    const { data, error, excute, loading } = useAction(domain && `domains/${domain.id}/users/me/~send-money`, undefined, () => {
        form.reset()
    })

    const { t } = useTranslation('common')


    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(data => excute(data))} >
                <input type="hidden" name="to" value={props.user.id} ref={form.register()} />
                <Row>
                    <Col xs={12} className="mb-2 font-weight-bold">{t('send_money.send_money')}</Col>
                    <Col xs={12} className="mb-2">
                        <NumberFormatInput
                            allowNegative={true}
                            name="amount"
                            placeholder={t('send_money.amount')}
                        />
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
                    <Col xs={12} className="text-right"><IconButton icon={BiSend} size="sm" disabled={loading} loading={loading} type="submit">OK</IconButton></Col>
                    <Col xs={12} className="mt-4 font-weight-bold">{t('send_money.history')}</Col>
                    <Col xs={12} className="mt-2 font-weight-bold">
                        <Alert variant="warning">{t('in_development')}</Alert>
                    </Col>
                </Row>
            </Form>
        </FormProvider>

    )

} 