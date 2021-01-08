import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form"; 
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const Textarea = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()
    const { locale } = useRouter()

    return (
        <FormItemRow {...props}>
            <Form.Control
                name={props.id}
                as="textarea"
                ref={form.register()}
                rows={4}
                placeholder={props.placeholder && props.placeholder[locale]}
            />
        </FormItemRow>
    )
}