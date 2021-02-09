import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { Badge } from "react-bootstrap"
import { ServiceProviderActionFormItem } from "../../types"


export type ApiDocumentField = {
    field: ServiceProviderActionFormItem
    name: string
}


export function getFieldType(field: ServiceProviderActionFormItem) {
    if (field.options) {
        if (field.options.every(item => typeof item.value == 'boolean')) return 'boolean'
        if (field.options.every(item => typeof item.value == 'number')) return 'number'
        return 'string'
    }

    if (field.input_mask == 'number' || field.type == 'integer' || field.type == 'number') return 'number'
    if (field.input_mask == 'switch') return 'boolean'
    return 'string'

}

export const ApiDocumentField = (props: ApiDocumentField) => {

    const { t, lang } = useTranslation('common')

    const { name, field: {
        label,
        options,
        require
    } } = props

    const field_type = useMemo(() => getFieldType(props.field), [props.field])

    return (
        <tr key={name}>
            <td>
                {name}
                {require && <Badge className="ml-1" variant="danger">{t('require')}</Badge>}
            </td>
            <td style={{ wordBreak: 'break-all' }}>
                {field_type} &nbsp;
                 {options && JSON.stringify(options.map(el => el.value))}
            </td>
            <td>{label[lang]}</td>
        </tr>
    )
}