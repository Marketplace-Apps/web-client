import { useAuth } from "firebase-easy-hooks"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { Badge, Button, Col, Row, Table } from "react-bootstrap"
import ReactJson from "react-json-view"
import { useCollectionData } from "react-livequery-hooks"
import { SanboxJS } from "../../helpers/sandboxjs"
import { useCopy } from "../../hooks/useCopy"
import { useDomain } from "../../hooks/useDomain"
import { ServiceProviderAction } from "../../types"
import { ApiDocumentField, getFieldType } from "./ApiDocumentField"

export type ActionApiDocument = {
    action: ServiceProviderAction
}

export const ActionApiDocument = ({ action }: ActionApiDocument) => {

    const { t, lang } = useTranslation('common')
    const router = useRouter()
    const { copied, copy } = useCopy()
    const { current_domain, root_domain } = useDomain()
    const domain = root_domain || current_domain
    const { user } = useAuth()

    const base_url = `https://r1i47kgkp2.execute-api.us-east-1.amazonaws.com/livequery/domains/${domain?.id}/users/${user?.uid}/services/${router.query.service_id}/orders`
    const endpoint = `${base_url}/${action.id == 'create' ? '' : `[order_id]/~trigger-action?action=${action.id}`}`

    const example_json = useMemo(
        () => Object
            .keys(action?.form || {})
            .reduce((p, c) => {

                if (action.form[c].options?.[0].value) return {
                    ...p,
                    [c]: action.form[c].options?.[0].value
                }

                if (action.form[c].placeholder) return {
                    ...p,
                    [c]: action.form[c].placeholder[lang] ?? action.form[c].placeholder.en
                }


                if (action.form[c].default_value) return {
                    ...p,
                    [c]: SanboxJS.eval(action.form[c].default_value, {})
                }

                const type = getFieldType(action.form[c])
                if (type == 'number') return { ...p, [c]: 1 }
                if (type == 'boolean') return { ...p, [c]: false }
                return { ...p, [c]: '...' }
            }, {})
        ,
        [action.form])

    return (
        <Row noGutters className="mt-5">
            <Col xs={12}>
                <h4> <Badge variant="secondary">{action.name[lang]}</Badge> </h4>
            </Col>

            <Col xs={12} md={action.form ? 6 : 12}>
                <Row>
                    <Col xs={2}>URL</Col>
                    <Col xs={10} className="pr-5 pb-3">
                        <code style={{
                            wordBreak: 'break-all' 
                        }}
                        > {endpoint}</code>
                        <Badge
                            style={{ cursor: 'pointer', border: '1px solid grey' }}
                            onClick={() => copy(endpoint)}
                            className="m-1"
                        >{copied ? 'Copied' : 'Copy'}</Badge>
                    </Col>
                    <Col xs={2}>Method</Col>
                    <Col xs={10}><Badge variant="info" >POST</Badge></Col>
                    <Col xs={2}>Headers</Col>
                    <Col xs={10}>
                        <div><Badge variant="warning">api-key</Badge>
                Your api key
                <Badge
                                style={{ cursor: 'pointer', border: '1px solid grey' }}
                                className="m-1"
                                onClick={() => router.push('/me/api')}
                            >Open api key manager</Badge>
                        </div>
                        {action.form && <div><Badge variant="warning">Content-Type</Badge> application/json</div>}
                    </Col>
                </Row>
            </Col>

            {action.form && (
                <Col>
                    <Row>
                        <Col xs={12} className="p-3 mb-2 mt-2">
                            <ReactJson
                                src={example_json}
                                theme="monokai"
                                collapsed={false}
                                enableClipboard={false}
                                displayDataTypes={false}
                                displayObjectSize={false}
                                shouldCollapse={false}
                                name={false}
                            />
                        </Col>
                    </Row>

                </Col>
            )}
            {
                action?.form && (
                    <Col xs={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object
                                        .entries(action?.form || {})
                                        .map(([name, field]) => <ApiDocumentField
                                            field={field}
                                            name={name}
                                            key={field.id}
                                        />)
                                }
                            </tbody>
                        </Table>
                    </Col>
                )
            }

        </Row>
    )

}