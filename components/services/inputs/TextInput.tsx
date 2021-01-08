import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form"; 
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const TextInput = (props: ServiceProviderActionFormItem ) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <Form.Control
                name={props.id}
                ref={form.register()}
                placeholder={props.placeholder.en}
            />
        </FormItemRow >
    )
}