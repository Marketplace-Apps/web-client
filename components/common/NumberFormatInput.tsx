import React, { CSSProperties, Fragment, useEffect, useRef } from "react"
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
    allowNegative?: boolean
}

export const NumberFormatInput = (props: NumberFormatInput) => {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={props.name}
            defaultValue={props.defaultValue}
            render={({ onChange, value }) => {
                return (
                    <NumberFormat
                        placeholder={props.placeholder}
                        style={props.style}
                        disabled={props.disabled}
                        thousandSeparator
                        allowNegative={props.allowNegative}
                        isNumericString
                        className="form-control"
                        decimalScale={props.decimalScale || 0}
                        value={value}
                        onValueChange={e => onChange(e.floatValue)}
                        onFocus={e => e.target.select()}
                    />
                )
            }}
        />
    )
}