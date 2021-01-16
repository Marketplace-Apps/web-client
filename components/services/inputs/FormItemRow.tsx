import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Alert, Badge, Col, Form } from "react-bootstrap";
import { useForm, useFormContext } from "react-hook-form";
import { FormAlert } from "./FormAlert";
import useTranslation from 'next-translate/useTranslation'
import { ServiceProviderActionFormItem } from "../../../types";

export type FormItemRow = PropsWithChildren<ServiceProviderActionFormItem> & {
    append?: JSX.Element
}

export const FormItemRow = (props: FormItemRow) => {

    const form = useFormContext()
    const { locale } = useRouter()
    const { t } = useTranslation('common')

    return (
        <Form.Row className="mb-3 pb-3">

            {/* Label */}
            <Col
                xs={12}
                style={{ fontSize: 15, fontWeight: 'bold' }}
                className="d-flex justify-content-start mb-1"
            >
                <div>{props.label[locale]}</div>
                {props.require && <div><Badge variant="danger" className="ml-1" pill>{t('require')}</Badge></div>}
            </Col>

            {/* Input */}
            <Col xs={12}>
                {props.children}
            </Col>

            {/* Append */}
            {props.append && <Col xs={12} className="mt-2">{props.append}</Col>}


            {/* Error */}
            {
                form.errors[props.id] && (
                    <Col xs={12} className="mt-2">
                        <Alert variant="danger">
                            {form.errors[props.id].message}
                        </Alert>
                    </Col>
                )
            }

            {/* Alert */}
            {props.alerts && props.alerts.length > 0 && (
                <Col xs={12} className="mt-2">
                    {props.alerts.map((alert, i) => <FormAlert key={i} {...alert} />)}
                </Col>
            )}

        </Form.Row>
    )
}