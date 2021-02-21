import { Col, Form, InputGroup } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";
import { NumberFormatInput } from '../../common/NumberFormatInput'
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";

const CurrencyMapping = {
    'en': '$',
    'vi': 'đ'
}

export const PriceInput = (props: ServiceProviderActionFormItem) => {

    const { control } = useFormContext()
    const { locale } = useRouter()

    return (
        <FormItemRow {...props}>
            <InputGroup  >
                <Controller
                    control={control}
                    name={props.id}
                    rules={{ required: props.require }}
                    render={({ onChange, value }) => {
                        return (
                            <NumberFormat
                                placeholder={props.placeholder?.[locale]}
                                thousandSeparator
                                allowNegative={false}
                                isNumericString
                                className="form-control"
                                decimalScale={5}
                                value={value}
                                onValueChange={e => onChange(e.floatValue)}
                                onFocus={e => e.target.select()}
                            />
                        )
                    }}
                />
                <InputGroup.Append>
                    <InputGroup.Text id="basic-addon2">{CurrencyMapping[locale]}</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>



        </FormItemRow >
    )
}