import { useRouter } from "next/router"
import { Fragment, useEffect, useMemo, useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { useCreateAction, useDocumentData } from "react-livequery-hooks"
import { DomainService, ServiceProvider, User } from "../../types"
import { IconButton } from "../common/IconButton"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useDomain } from "../../hooks/useDomain"
import { FormAlert } from "./inputs/FormAlert"
import { GenericInput } from "./inputs/GenericInput"
import { Bill } from "./Bill"
import firebase from 'firebase'
import { ActionBill } from "./ActionBill"

export type CreateOrderModal = {
    visible: boolean
    onHide: Function
    service: ServiceProvider<any>,
    prices: DomainService
    onSuccess?: Function
}

const CreateOrderModal = (props: CreateOrderModal) => {

    const domain = useDomain()

    const router = useRouter()

    const getDefaultValues = (data = {}) => props.service.form.reduce((p, c) => {
        if (!c.default_value) return p
        const value = SanboxJS.eval(c.default_value, data)
        if (value !== undefined) p[c.name] = value
        return p
    }, {})

    const {
        create,
        creating,
        create_error
    } = useCreateAction(domain && `domains/${domain.id}/services/${router.query.serviceId}/orders`)

    async function submit(data) {
        await create(data)
        props.onHide()
        props.onSuccess && props.onSuccess()
    }

    const form = useForm<any>({
        defaultValues: getDefaultValues()
    })

    const data = form.watch()

    useEffect(() => {
        const default_values = getDefaultValues(data)
        for (const key in default_values) form.setValue(key, default_values[key])
    }, [JSON.stringify(data)]) 

    return (
        <Modal
            show={props.visible}
            onHide={() => props.onHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                >{props.service.name.en}</Modal.Title>

            </Modal.Header>
            <FormProvider {...form}>
                <Form style={{ padding: 20 }} onSubmit={form.handleSubmit(submit)}>
                    {
                        props.service.form.map(item => <GenericInput key={item.name} {...item} />)
                    }
                    <ActionBill
                        type="ADD"
                        data={form.watch()}
                        service={props.service}
                    /> 
                    <Form.Row >
                        <Col
                            xs={12}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <IconButton
                                icon={FaCheck}
                                variant="primary"
                                loadingtext="Đang xử lí"
                                loading={creating}
                                type="submit"
                                disabled={creating}
                            >OK</IconButton>
                        </Col>
                    </Form.Row>
                </Form>
            </FormProvider>
        </Modal>
    )
}

export const useCreateOrderModal = (
    service: ServiceProvider<any>,
    prices: DomainService,
    onSuccess?: Function
) => {

    const [visible, setVisible] = useState(false)

    const showCreateOrderModal = () => setVisible(true)

    return {
        showCreateOrderModal,
        CreateOrderModal: visible && service && prices && <CreateOrderModal
        onHide={() => setVisible(false)}
        prices={prices}
        service={service}
        visible={visible}
        onSuccess={onSuccess}
    />
    }

}
