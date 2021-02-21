import { Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";
import { NumberFormatInput } from '../../common/NumberFormatInput'
import { useRouter } from "next/router";


export const NumberInput = (props: ServiceProviderActionFormItem) => {

    const { locale } = useRouter()

    return (
        <FormItemRow {...props}>
            <NumberFormatInput
                name={props.id}
                placeholder={props.placeholder?.[locale]}
                rules={{ required: props.require }}
                decimalScale={5}
                allowNegative={false}
            />
        </FormItemRow >
    )
}