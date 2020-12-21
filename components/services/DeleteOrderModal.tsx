import { useMemo, useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FcBriefcase, FcCancel, FcClock } from "react-icons/fc"
import { useAction, useDeleteAction, useDocumentData } from "react-livequery-hooks"
import { Order, ServiceProvider } from "../../types"
import { useDomain } from "../../hooks/useDomain"
import { IconButton } from "../common/IconButton"
import { ActionBill } from "./ActionBill"
import { Bill } from "./Bill"

export type DeleteOrderModal = {
    order: Order
    service: ServiceProvider<any>
    onHide?: Function
    onDeleted?: Function
}
export const DeleteOrderModal = (props: DeleteOrderModal) => {

    const domain = useDomain()

    const { del, delete_error, deleting } = useDeleteAction(domain && props.service && props.order && `domains/${domain?.id}/services/${props.service.id}/orders/${props.order.id}/`, (
        data, error) => {
        if (error) return
        props.onDeleted && props.onDeleted()
        props.onHide && props.onHide()
    })


    return (
        <Modal
            show={true}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body>
                    <ActionBill
                        type="DELETE"
                        data={{ order: props.order }}
                        service={props.service}
                    />
                             Bạn đã chắc chắn muốn hủy đơn hàng này ?
                        </Modal.Body>

                {
                    delete_error && <Alert variant="danger">{delete_error.message}</Alert>
                }
                <Modal.Footer>
                    <IconButton
                        icon={FcCancel}
                        loading={deleting}
                        disabled={deleting}
                        variant="outline-danger"
                        onClick={() => del()}
                    >Hủy đơn</IconButton>
                    <Button
                        variant="dark"
                        onClick={props.onHide as any}
                    > Close </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal >
    )
}


export function useDeleteOrderModal(order: Order, service: ServiceProvider<any>, onDeleted: Function) {
    const [visible, setVisible] = useState(false)

    function showDeleteOrderModal() { setVisible(true) }

    return {
        showDeleteOrderModal,
        DeleteOrderModal: visible && <DeleteOrderModal
            onHide={() => setVisible(false)}
            onDeleted={() => onDeleted()}
            order={order}
            service={service}
        />
    }
}