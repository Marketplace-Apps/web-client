import React, { CSSProperties, Fragment } from "react"
import { Controller, RegisterOptions, useForm, useFormContext } from "react-hook-form"

import NumberFormat from "react-number-format"


export type NumberFormatInput = {
    name: string,
    disabled?: boolean,
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
    style?: CSSProperties,
    placeholder?: string
    decimalScale?: number
    defaultValue?: number
}

export const NumberFormatInput = (props: NumberFormatInput) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={props.name}
            defaultValue={props.defaultValue}
            render={({ onChange, value }) => (
                <NumberFormat
                    placeholder={props.placeholder}
                    style={props.style}
                    disabled={props.disabled}
                    thousandSeparator
                    allowNegative={false}
                    isNumericString
                    className="form-control"
                    decimalScale={props.decimalScale || 0}
                    value={value}
                    onValueChange={e => onChange(e.floatValue)}
                    onFocus={e => e.target.select()}
                />
            )}
        />
    )
}