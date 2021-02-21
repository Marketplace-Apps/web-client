import { useRouter } from "next/router";
import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form"; 
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const TextInput = (props: ServiceProviderActionFormItem ) => {

    const form = useFormContext()
    const {locale} = useRouter()

    return (
        <FormItemRow {...props}>
            <Form.Control
                name={props.id}
                ref={form.register({required:props.require})}
                placeholder={props.placeholder?.[locale]}
            />
        </FormItemRow >
    )
}