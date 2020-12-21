import { useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FcBriefcase, FcFlashOn } from "react-icons/fc"
import { useAction, useUpdateAction } from "react-livequery-hooks"
import { Order, ServiceProvider } from "../../types"
import { useDomain } from "../../hooks/useDomain"
import { IconButton } from "../common/IconButton"


export type ReportErrorModal = {
    onHide: Function
    order: Order,
    service: ServiceProvider<any>
}
export const ReportErrorModal = (props: ReportErrorModal) => {
    const domain = useDomain()
    const form = useForm<any>()

    const { excute, loading, error } = useAction(`domains/${domain?.id}/services/${props.service.id}/orders/${props.order.id}/~report`, 'POST', (data, error) => {
        if (error) return
        props?.onHide()
    })


    return <Modal show={true} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Báo lỗi</Modal.Title>
        </Modal.Header>
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(data => excute(data))}>
                <Modal.Body>
                    <Form.Row className="mb-3 pb-3">

                        <Col
                            xs={4}
                            style={{ fontSize: 15, fontWeight: 'bold' }}
                        >
                            <div>Nội dung báo lỗi</div>
                        </Col>

                        {/* Input */}
                        <Col xs={8}>
                            <input
                                type="hidden"
                                name="status"
                                value="reported"
                                ref={form.register()}
                            />
                            <Form.Control
                                name="reason"
                                as="textarea"
                                ref={form.register()}
                                rows={4}
                                placeholder="Nhập nội dung"
                            />
                        </Col>


                    </Form.Row>
                    {
                        error && <Alert variant="danger">{error.message}</Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <IconButton
                        icon={FcBriefcase}
                        loading={loading}
                        disabled={loading}
                        type="submit"
                        variant="outline-danger"
                    >Report</IconButton>
                    <Button
                        variant="dark"
                        onClick={props.onHide as any}
                    > Close </Button>
                </Modal.Footer>
            </Form>
        </FormProvider>
    </Modal>
}


export function useReportErrorModal(order: Order, service: ServiceProvider<any>) {

    const [visible, setVisible] = useState(false)

    return {
        ReportErrorModal: visible && order && service && <ReportErrorModal
            onHide={() => setVisible(false)}
            order={order}
            service={service}
        />,
        showReportErrorModal: () => setVisible(true)
    }
}