import { useEffect, useState } from "react"
import { Form, FormControlProps, FormProps, FormControl } from "react-bootstrap"

export type NumberInput = FormControlProps & FormProps & {
    on_updated?: Function
    allow_decimal?: boolean
    allow_negative?: boolean
}

export const NumberInput = ({ value: _, onChange: __, ...props }: NumberInput) => {
    const [value, setValue] = useState(props?.defaultValue || '')

    const onChange = (value: string) => {
        if (value.includes('..') || value.includes(',,') || value.includes('--')) return
        if (value == '-' && props.allow_negative != false) {
            setValue('-')
            return
        }
        if (value.endsWith(',') || value.endsWith('.')) {
            props.allow_decimal && setValue(value)
            return
        }
        const val = Number(value.replace(/,/g, ''))
        if (isNaN(val)) return
        setValue(val.toLocaleString())
        props.on_updated && !isNaN(val as any) && props.on_updated(val)

    }

    useEffect(() => {
        if(isNaN(_ as any)) return 
        setValue(_ ? Number(_).toLocaleString() : '')
    }, [_])

    return (
        <Form.Control
            {...props}
            value={'' + value}
            onChange={e => onChange(e.target.value)}
        />
    )

}