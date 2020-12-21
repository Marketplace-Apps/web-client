import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FormItem, ServiceProviderFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const TextInput = (props: FormItem<any>) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <Form.Control
                name={props.name}
                ref={form.register()}
                placeholder={props.placeholder.en}
            />
        </FormItemRow >
    )
}