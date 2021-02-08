import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";
import { NumberFormatInput } from '../../common/NumberFormatInput'


export const NumberInput = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <NumberFormatInput
                name={props.id}
                placeholder={props.placeholder?.en}
                rules={{ required: true }}
                decimalScale={5}
            />
        </FormItemRow >
    )
}