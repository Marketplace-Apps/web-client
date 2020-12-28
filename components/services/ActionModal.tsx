import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Alert, Button, Col, Form, Modal } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { DomainService, Order, ServiceProvider, User } from "../../types"
import { IconButton } from "../common/IconButton"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useDomain } from "../../hooks/useDomain"
import { GenericInput } from "./inputs/GenericInput"
import { ActionBill } from "./ActionBill"
import useTranslation from 'next-translate/useTranslation'

export type ActionModal = {
    domain_service: DomainService
    service: ServiceProvider<any>,
    order?: Order
    action_id: string

    visible: boolean
    onHide: Function
    onSuccess?: Function
}

const ActionModal = (props: ActionModal) => {

    const { domain_service, service, order, action_id } = props
    const domain = useDomain()
    const action = props.service?.actions[action_id]
    const router = useRouter()
    const { t } = useTranslation('common')


    const getDefaultValues = (data = {}) => action?.form.reduce((p, c) => {
        if (!c.default_value) return p
        const value = SanboxJS.eval(c.default_value, data)
        if (value !== undefined) p[c.name] = value
        return p
    }, {})

    const {
        error,
        excute,
        loading
    } = useAction(
        domain && props.service && `domains/${domain.id}/services/${props.service.id}/orders${props.order ? `/${props.order.id}/~trigger-action` : ''}`,
        'POST',
        async (data, error) => {
            if (error) return
            props.onHide()
            props.onSuccess && props.onSuccess()
        }
    )

    const form = useForm<any>({
        defaultValues: getDefaultValues({
            ...order?.metadata || {},
            ...order || {}
        })
    })

    useEffect(() => {
        const default_values = getDefaultValues(form.watch())
        for (const key in default_values) form.setValue(key, default_values[key])
    }, [JSON.stringify(form.watch())])

    return (
        <Modal
            show={props.visible}
            onHide={() => props.onHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                >{props.service.name[router.locale]}</Modal.Title>

            </Modal.Header>
            <FormProvider {...form}>
                <Form style={{ padding: 20 }} onSubmit={form.handleSubmit(data => excute(data, { action_id }))}>
                    {
                        action?.form.map(item => <GenericInput key={item.name} {...item} />)
                    }
                    {error?.message && <Alert variant="danger">{error.message}</Alert>}
                    <ActionBill
                        service={service}
                        action_id={props.action_id}
                        order={order}
                        domain={domain}
                        domain_service={domain_service}
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
                                loading={loading}
                                type="submit"
                                disabled={loading}
                            >{t('submit')}</IconButton>
                        </Col>
                    </Form.Row>
                </Form>
            </FormProvider>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={props.onHide as any}
                >{t('close')}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export const useActionModal = (
    service: ServiceProvider<any>,
    domain_service: DomainService,
    onSuccess?: Function
) => {

    const [{ action_id, order }, set_action_id] = useState<{ action_id?: string, order?: Order }>({})
    const showActionModal = set_action_id

    return {
        showActionModal,
        ActionModal: action_id && service && domain_service && <ActionModal
            onHide={() => set_action_id({})}
            domain_service={domain_service}
            service={service}
            visible={!!set_action_id}
            onSuccess={onSuccess}
            action_id={action_id}
            order={order}
        />
    }

}
