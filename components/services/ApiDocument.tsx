import { useAuth } from "firebase-easy-hooks"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Badge, Button, Col, Row, Table } from "react-bootstrap"
import ReactJson from "react-json-view"
import { useCollectionData } from "react-livequery-hooks"
import { useCopy } from "../../hooks/useCopy"
import { useDomain } from "../../hooks/useDomain"
import { ServiceProviderAction } from "../../types"

export type ActionApiDocument = {
    action: ServiceProviderAction
}

export const ActionApiDocument = ({ action }: ActionApiDocument) => {

    const { t, lang } = useTranslation('common')
    const router = useRouter()
    const { copied, copy } = useCopy()
    const domain = useDomain()
    const { user } = useAuth()

    const base_url = `https://r1i47kgkp2.execute-api.us-east-1.amazonaws.com/domains/${domain?.id}/users/${user?.uid}/services/vsdvsdv/orders`
    const endpoint = `${base_url}/${action.id == 'create' ? '' : `[order_id]/~trigger-action?action=${action.id}`}`


    return (
        <Row noGutters className="mt-5">
            <Col xs={12}>
                <h4> <Badge variant="secondary">{action.name[lang]}</Badge> </h4>
            </Col>

            <Col xs={2}>URL</Col>
            <Col xs={10}>
                <code style={{ wordBreak: 'break-all' }}> {endpoint}</code>
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
            {action.form && <Col xs={2}>JSON body</Col>}
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
                                {Object.entries(action?.form || {}).map(([name, {
                                    is_number,
                                    label,
                                    require,
                                    type,
                                    options
                                }]) => (
                                        <tr key={name}>
                                            <td>
                                                {name}
                                                {require && <Badge className="ml-1" variant="danger">{t('require')}</Badge>}
                                            </td>
                                            <td style={{ wordBreak: 'break-all' }}>
                                                {(is_number || type == 'number') ? 'number' : 'string'} &nbsp;
                                                {options && JSON.stringify(options.map(el => el.value))}
                                            </td>
                                            <td>{label[lang]}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Col>
                )
            }
            {action.form && (
                <Col xs={12}>
                    <ReactJson
                        src={Object.keys(action.form).reduce((p, c) => ({
                            ...p,
                            [c]: action.form[c].options?.[0].value ?? action.form[c].placeholder?.[lang] ?? ''
                        }), {})}
                        theme="monokai"
                        collapsed={false}
                        enableClipboard={false}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        shouldCollapse={false}
                        name={false}
                    />
                </Col>
            )}
        </Row>
    )

}