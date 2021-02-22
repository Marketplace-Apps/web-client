import { useAuth } from "firebase-easy-hooks"
import { Col, Row } from "react-bootstrap"
import { useDocumentData } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { User } from "../../types"
import useTranslation from 'next-translate/useTranslation'
import { DEFAULT_AVATAR } from "../../const"
import { Credit } from "./Credit"
import { useCurrentUser } from "../../hooks/useCurrentUser"

export const UserInfo = () => {

    const { user } = useAuth()
    const { t } = useTranslation('common')
    const me = useCurrentUser()

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