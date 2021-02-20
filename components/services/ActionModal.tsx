import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap"
import { FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { Order, PricePackage, ServiceProvider, ServiceProviderAction, ServiceProviderActionFormItem, User } from "../../types"
import { IconButton } from "../common/IconButton"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useDomain } from "../../hooks/useDomain"
import { GenericInput } from "./inputs/GenericInput"
import { ActionBill } from "./ActionBill"
import useTranslation from 'next-translate/useTranslation'
import { TextInput } from "./inputs/TextInput"
import { useAuth } from "firebase-easy-hooks"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { VisibleCheck } from "./inputs/VisibleCheck"

export type ActionModal = {
    service_id: string
    order?: Order
    action: ServiceProviderAction
    onSuccess?: Function
}

export const ActionModal = (props: ActionModal) => {


    const { service_id, order, action } = props
    const domain = useDomain()
    const { t } = useTranslation('common')
    const { user } = useAuth()

    const getDefaultValues = (data = {}) => Object.keys(action?.form || {}).reduce((p, c, index) => {
        const item = action?.form?.[c] as ServiceProviderActionFormItem<any>
        if (!item?.default_value) return p
        const value = SanboxJS.eval(item.default_value, data)
        if (value !== undefined) p[c] = value

        return p
    }, {})

    const form = useForm<any>({
        defaultValues: getDefaultValues({
            ...order?.metadata || {},
            ...order || {}
        })
    })
    const {
        error,
        excute,
        loading
    } = useAction(
        domain && service_id && user && `domains/${domain.id}/users/${user.uid}/services/${service_id}/orders${props.order ? `/${props.order.id}/~trigger-action` : ''}`,
        'POST',
        async (data, error) => {
            if (error) return
            form.reset()
            props.onSuccess && props.onSuccess()
        }
    )



    useEffect(() => {
        const default_values = getDefaultValues(form.watch())
        for (const key in default_values) form.setValue(key, default_values[key])
    }, [JSON.stringify(form.watch())])


    return (

        <FormProvider {...form}>
            <Form style={{ padding: 20 }} onSubmit={form.handleSubmit(data => excute(data, { action_id: action.id }))}>
                {Object.keys(action?.form || {}).map(name => (
                    <VisibleCheck
                        condition={action.form[name]?.visible_condition?.toString()}
                        key={name}
                    >
                        <GenericInput key={name} {... (action?.form[name])} />
                    </VisibleCheck>
                ))}
                {
                    action && service_id && <ActionBill
                        fn={action.price.toString()}
                        order={order}
                        can_use_voucher={action.can_use_voucher}
                        service_id={service_id}
                    />
                }
                {error?.message && <Alert variant="danger">{t('server_errors.' + error.message)}</Alert>}
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

    )
}

export const useActionModal = (
    service_id: string,
    onSuccess?: Function
) => {
    const router = useRouter()
    const [{ action, order }, set_action_id] = useState<{ action?: ServiceProviderAction, order?: Order }>({})
    const { t } = useTranslation('common')

    return {
        showActionModal: set_action_id,
        ActionModal: action && service_id && (
            <Modal
                show={action}
                onHide={() => set_action_id({})}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{ fontSize: 20, fontWeight: 'bold' }}
                    >{action.name[router.locale]}</Modal.Title>

                </Modal.Header>
                <ActionModal
                    service_id={service_id}
                    onSuccess={() => {
                        onSuccess && onSuccess()
                        set_action_id({})
                    }}
                    action={action}
                    order={order}
                />
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => set_action_id({})}
                    >{t('close')}</Button>
                </Modal.Footer>
            </Modal>

        )
    }

}
