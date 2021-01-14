import { useRouter } from "next/router"
import React from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useAction, useDeleteAction, useDocumentData } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { PaymentMethod, Voucher } from "../../types"
import { IconButton } from "../common/IconButton"

export type PaymentMethodModal = {
    payment_method?: PaymentMethod
    onHide?: Function
}


export const PaymentMethodModal = (props: PaymentMethodModal) => {

    const domain = useDomain()

    const form = useForm<PaymentMethod>({ defaultValues: props.payment_method })

    const { excute, loading } = useAction(
        `domains/${domain?.id}/payment-methods${props.payment_method ? `/${props.payment_method.id}` : ''}`,
        props.payment_method ? 'PATCH' : 'POST',
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const { del, deleting } = useDeleteAction(
        props.payment_method && `domains/${domain?.id}/payment-methods/${props.payment_method.id}`,
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    return (
        <Modal show={true} onHide={props.onHide}>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(data => excute(data))}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.payment_method ? 'Edit payment method' : 'Create new payment method'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col xs={12}> <Form.Label>Name</Form.Label></Col>
                            <Col xs={12}>
                                <Form.Control
                                    name="name"
                                    onFocus={e => e.target.select()}
                                    placeholder="Vietcombank, Paypal, ..."
                                    ref={form.register()}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Icon URL</Form.Label></Col>
                            <Col xs={12}>
                                <Form.Control
                                    name="icon"
                                    onFocus={e => e.target.select()}
                                    placeholder="https://www.example.com/logo.png"
                                    ref={form.register()}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Owner account name</Form.Label></Col>
                            <Col xs={12}>
                                <Form.Control
                                    name="account_name"
                                    onFocus={e => e.target.select()}
                                    placeholder="John conner"
                                    ref={form.register()}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Owner account number</Form.Label></Col>
                            <Col xs={12}>
                                <Form.Control
                                    name="account_number"
                                    onFocus={e => e.target.select()}
                                    placeholder="1234321 "
                                    ref={form.register()}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Token</Form.Label></Col>
                            <Col xs={12}>
                                <Form.Control
                                    name="secret_key"
                                    onFocus={e => e.target.select()}
                                    placeholder="Cookie or token"
                                    ref={form.register()}
                                />
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        {
                            props.payment_method && (
                                <IconButton
                                    size="sm"
                                    variant="danger"
                                    type="submit"
                                    onClick={() => del()}
                                    disabled={deleting}
                                    icon={MdDelete}
                                    loading={deleting}
                                >Delete</IconButton>
                            )
                        }
                        <IconButton
                            variant="primary"
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            size="sm"
                            icon={FaCheck}
                        >Submit</IconButton>
                        <Button
                            variant="dark"
                            type="submit"
                            size="sm"
                            onClick={props.onHide as any}
                        >Close</Button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    )
}