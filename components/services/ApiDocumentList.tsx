import { useAuth } from "firebase-easy-hooks"
import useTranslation from "next-translate/useTranslation"
import { useMemo, useState } from "react"
import { Alert, Badge, Button, Col, Row, Table } from "react-bootstrap"
import { useCollectionData } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { ServiceProviderAction } from "../../types"
import { CenteredSpinner } from "../common/CenteredSpinner"
import { ActionApiDocument } from "./ApiDocument"

export type ApiDocumentTab = {
    service_id: string
}
export const ApiDocumentTab = (props: ApiDocumentTab) => {

    const { lang } = useTranslation('common')
    const domain = useDomain()
    const { user } = useAuth()

    const base_url = `https://api-authasouchdomain.awsservice.com/domains/${domain?.id}/users/${user?.uid}/services/vsdvsdv/orders`


    const [show_warning, set_show_warning] = useState(true)

    const {
        items: actions,
        loading
    } = useCollectionData<ServiceProviderAction>(!show_warning && `services/${props.service_id}/actions`)

    const create_action = useMemo(() => actions.filter(action => action.id == 'create')[0], [actions])
    const another_action = useMemo(() => actions.filter(action => action.id != 'create'), [actions])


    if (show_warning) return (
        <Alert
            variant="danger"
        >Only for developer <Button onClick={() => set_show_warning(false)} size="sm" variant="danger">Show</Button></Alert>
    )
    return (
        <Row noGutters >
            <Col xs={12}> {loading && <CenteredSpinner />}</Col>

            <Col xs={12}>
                {create_action && <ActionApiDocument action={create_action} />}
                {
                    another_action.map(action => <ActionApiDocument
                        action={action}
                        key={action.id}
                    />)
                }

            </Col>
        </Row>
    )
}