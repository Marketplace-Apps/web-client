import { Fragment, useMemo, useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { useDocumentData, useUpdateAction } from "react-livequery-hooks"
import { DomainService, Order, ServiceProvider } from "../../types"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { IconButton } from "../common/IconButton"
import { ActionBill } from "./ActionBill"
import { Bill } from "./Bill"
import { GenericInput } from "./inputs/GenericInput"
import { toast } from "react-toastify"

export type UpdateOrderModal = {
    order: Order
    service: ServiceProvider<any>
    onHide?: Function
}
export const UpdateOrderModal = (props: UpdateOrderModal) => {

    const domain = useDomain()
    const form = useForm({
        defaultValues: props.order
    })

    const { updating, update, update_error } = useUpdateAction(domain && props.order && `domains/${domain?.id}/services/${props.service?.id}/orders/${props.order?.id}`, true, (data, error) => {
        if (error) return
        props.onHide()
        toast.info({ content: 'Update thành công' })
    })


    return (
        <Modal
            show={true}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update order</Modal.Title>
            </Modal.Header>

            <FormProvider {...form}>
                <Form style={{ padding: 20 }} onSubmit={form.handleSubmit(data => update(data))}>
                    <Modal.Body>
                        {
                            props
                                .service
                                .form
                                .filter(i => i.editable)
                                .map(item => <GenericInput key={item.name} {...item} default_value={() => props.order[item.name]} />)
                        }
                        <ActionBill
                            type="EDIT"
                            data={form.watch()}
                            service={props.service}
                        />
                        {
                            update_error && <Alert variant="danger">{update_error.message}</Alert>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <IconButton
                            icon={FaCheck}
                            variant="outline-primary"
                            loadingtext="Đang xử lí"
                            loading={updating}
                            type="submit"
                            disabled={updating}
                        >OK</IconButton>
                        <Button
                            variant="dark"
                            onClick={props.onHide as any}
                        >Close</Button>
                    </Modal.Footer>
                </Form>
            </FormProvider>

        </Modal>
    )
}


export function useUpdateOrderModal(
    order: Order,
    service: ServiceProvider<any>,
) {

    const [visible, setVisible] = useState(false)

    function showUpdateOrderModal() { setVisible(true) }

    return {
        showUpdateOrderModal,
        UpdateOrderModal: visible && <UpdateOrderModal
            onHide={() => setVisible(false)}
            order={order}
            service={service}
        />
    }
}