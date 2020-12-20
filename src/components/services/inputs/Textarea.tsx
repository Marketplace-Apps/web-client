import { FormEvent, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FormItem, ServiceProviderFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const Textarea = (props: FormItem<any>) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <Form.Control
                name={props.name}
                as="textarea"
                ref={form.register()}
                rows={4}
                placeholder={props.placeholder?.en}
            />
        </FormItemRow>
    )
}