import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { Badge } from "react-bootstrap"
import { ServiceProviderActionFormItem } from "../../types"


export type ApiDocumentField = {
    field: ServiceProviderActionFormItem
    name: string
}

export const ApiDocumentField = (props: ApiDocumentField) => {

    const { t, lang } = useTranslation('common')

    const { name, field: {
        is_number,
        label,
        require,
        type,
        options,
        input_mask
    } } = props

    const field_type = useMemo(() => {
        if ((is_number || type == 'number' || input_mask == 'number')) return 'number'
        if (options && options.every(el => typeof el.value == 'number')) return 'number'
        if (options && options.every(el => typeof el.value == 'boolean')) return 'boolean'
        return 'string'
    }, [props.field])

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