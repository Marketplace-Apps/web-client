import { useMemo, useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FcBriefcase, FcClock } from "react-icons/fc"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { Order, ServiceProvider } from "../../types"
import { useDomain } from "../../hooks/useDomain"
import { IconButton } from "../common/IconButton"
import { ActionBill } from "./ActionBill"
import { Bill } from "./Bill"

export type ExtendOrderModal = {
    order: Order
    service: ServiceProvider<any>
    onHide?: Function
}
export const ExtendOrderModal = (props: ExtendOrderModal) => {

    const domain = useDomain()
    const form = useForm<any>()

    const { excute, loading, error } = useAction(domain && `domains/${domain?.id}/services/${props.service.id}/orders/${props.order.id}/~renew`, 'POST', (data, error) => {
        if (error) return
        props?.onHide()
    })


    return (
        <Modal
            show={true}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Extend order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(data => excute(data))}>
                        <Modal.Body>
                            <Form.Row className="mb-3 pb-3">

                                <Col
                                    xs={4}
                                    style={{ fontSize: 15, fontWeight: 'bold' }}
                                >
                                    <div>Gia hạn thêm</div>
                                </Col>

                                {/* Input */}
                                <Col xs={8}>
                                    <Controller
                                        name="n"
                                        control={form.control}
                                        render={({ value, onChange }) => (
                                            <Form.Control
                                                type="number"
                                                value={value}
                                                ref={form.register()}
                                                placeholder="Nhập số ngày/lần gia hạn thêm"
                                                onChange={e => onChange(Number(e.target.value))}
                                            />
                                        )}

                                    />

                                </Col>

                            </Form.Row>

                            <ActionBill
                                type="RENEW"
                                data={form.watch()}
                                service={props.service}
                            />
                        </Modal.Body>

                        {
                            error && <Alert variant="danger">{error.message}</Alert>
                        }
                        <Modal.Footer>
                            <IconButton
                                icon={FcClock}
                                loading={loading}
                                disabled={loading}
                                type="submit"
                                variant="outline-danger"
                            >Gia hạn</IconButton>
                            <Button
                                variant="dark"
                                onClick={props.onHide as any}
                            > Close </Button>
                        </Modal.Footer>
                    </Form>
                </FormProvider>
            </Modal.Body>
        </Modal >
    )
}


export function useExtendOrderModal(order: Order, service: ServiceProvider<any>) {
    const [visible, setVisible] = useState(false)

    function showExtendOrderModal() { setVisible(true) }

    return {
        showExtendOrderModal,
        ExtendOrderModal: visible && <ExtendOrderModal
            onHide={() => setVisible(false)}
            order={order}
            service={service}
        />
    }
}