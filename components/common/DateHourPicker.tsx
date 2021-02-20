import React, { Fragment } from "react"
import { Form } from "react-bootstrap"
import { Controller, FormProvider, RegisterOptions, useForm, useFormContext } from "react-hook-form"

import { DatePickerWrapper } from "../common/DatePickerWrapper"

export const DateHourPicker = (props: { name: string, rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> }) => {

    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={props.name}
            rules={props.rules}
            render={({ onChange, value }) => (
                <Fragment>
                    <Form.Control
                        as="select"
                        custom
                        style={{ width: 80 }}
                        onChange={e => {
                            const hour = Number(e.target.value)
                            const date = new Date(value)
                            date.setHours(hour)
                            date.setMinutes(0)
                            date.setSeconds(0)
                            date.setMilliseconds(0)
                            onChange(date.getTime())
                        }}
                    >
                        {new Array(24).fill(0).map((_, hour) => (
                            <option
                                selected={hour == new Date(value).getHours()}
                                value={hour}
                                key={hour}
                            >{hour}h</option>
                        ))}
                    </Form.Control>
                    <DatePickerWrapper onChange={d => {
                        const old_date = new Date(value)
                        d.setHours(old_date.getHours())
                        d.setMinutes(0)
                        d.setSeconds(0)
                        d.setMilliseconds(0)
                        onChange(d.getTime())
                    }}>
                        <Form.Control className="ml-2" value={new Date(value).toLocaleDateString('vi')} />
                    </DatePickerWrapper>
                </Fragment >
            )}
        />
    )
}