import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Alert, Badge, Col, Form } from "react-bootstrap";
import { useForm, useFormContext } from "react-hook-form";
import { FormItem } from "../../../types";
import { FormAlert } from "./FormAlert";
import useTranslation from 'next-translate/useTranslation'

export type FormItemRow = PropsWithChildren<FormItem<any>> & {
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
                xs={4}
                style={{ fontSize: 15, fontWeight: 'bold' }}
            >
                <div>{props.label[locale]}</div>
                {props.require && <div><Badge variant="danger" pill>{t('require')}</Badge></div>}
            </Col>

            {/* Input */}
            <Col xs={8}>
                {props.children}
            </Col>

            {/* Append */}
            {props.append && <Col xs={12} className="mt-2">{props.append}</Col>}


            {/* Error */}
            {
                form.errors[props.name] && (
                    <Col xs={12} className="mt-2">
                        <Alert variant="danger">
                            {form.errors[props.name].message}
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