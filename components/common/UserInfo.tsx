import { useAuth } from "firebase-easy-hooks"
import { Col, Row } from "react-bootstrap"
import { useDocumentData } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { User } from "../../types"
import useTranslation from 'next-translate/useTranslation'
import { DEFAULT_AVATAR } from "../../const"

export const UserInfo = () => {

    const { user } = useAuth()
    const domain = useDomain()
    const { t } = useTranslation('common')
    const { item } = useDocumentData<User>(domain && user && `domains/${domain.id}/users/${user.uid}`, {
        cache: { update: true, use: true }
    })

    console.log({item})

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
                    {item?.balance.toLocaleString() || 0}
                </div>
            </Col>
        </Row>
    )
}