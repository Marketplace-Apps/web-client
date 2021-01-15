
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



    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(data => excute(data))} >
                <input type="hidden" name="to" value={props.user.id} ref={form.register()} />
                <Row>
                    <Col xs={12} className="mb-2 font-weight-bold">Chuyển tiền</Col>
                    <Col xs={12} className="mb-2">
                        <NumberFormatInput
                            allowNegative={true}
                            name="amount"
                            placeholder="Nhập số tiền muốn chuyển ... "
                        />
                    </Col>
                    <Col xs={12} className="mb-2 ">
                        <Form.Control
                            as="textarea"
                            name="note"
                            placeholder="Ghi chú chuyển tiền"
                            ref={form.register()}
                            rows={3}
                        />
                    </Col>
                    {data && <Col xs={12}> <Alert variant="success">Chuyển tiền thành công</Alert> </Col>}
                    <Col xs={12} className="text-right"><IconButton icon={BiSend} size="sm" disabled={loading} loading={loading} type="submit">OK</IconButton></Col>
                    <Col xs={12} className="mt-4 font-weight-bold">Lịch sử chuyển tiền</Col>
                    <Col xs={12} className="mt-2 font-weight-bold">
                        <Alert variant="warning">Tính năng đang trong giai đoạn xây dựng</Alert>
                    </Col>
                </Row>
            </Form>
        </FormProvider>

    )

} 