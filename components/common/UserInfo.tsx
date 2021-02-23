import { useAuth } from "firebase-easy-hooks"
import { Col, Row } from "react-bootstrap"
import { useDomain } from "../../hooks/useDomain"
import useTranslation from 'next-translate/useTranslation'
import { DEFAULT_AVATAR } from "../../const"
import { Credit } from "./Credit"
import { useDomainUser } from "../../hooks/useCurrentUser"

export const UserInfo = () => {

    const { current_domain, root_domain } = useDomain()
    const { user } = useAuth()
    const { t } = useTranslation('common')
    const me = useDomainUser(root_domain || current_domain)

    return (
        <Row>
            <Col xs="auto">
                <img
                    src={user?.photoURL || DEFAULT_AVATAR}
                    style={{ borderRadius: '100%', width: 60, height: 60 }}
                />
            </Col>
            <Col className="flex-grow-1 text-left" style={{ paddingLeft: 0 }}>
                <div style={{ fontWeight: 'bold' }}>{user?.displayName || t('guest')}</div>
                <div style={{ fontWeight: 'bold', color: 'orange' }}>
                    <Credit value={me?.balance} />
                </div>
            </Col>
        </Row>
    )
}