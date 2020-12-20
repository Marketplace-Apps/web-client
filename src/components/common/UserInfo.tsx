import { useAuth } from "firebase-easy-hooks"
import { Col, Row } from "react-bootstrap"
import { useDocumentData } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { User } from "../../types"

export const UserInfo = () => {

    const { user } = useAuth()
    const domain = useDomain()



    const { item } = useDocumentData<User>(domain && user && `domains/${domain.id}/users/${user.uid}`)
    
    if(!user) return null 


    return (
        <Row>
            <Col xs="auto">
                <img
                    src={user.photoURL}
                    style={{ borderRadius: '100%', width: 50 }}
                />
            </Col>
            <Col className="flex-grow-1 text-left" style={{ paddingLeft: 0 }}>
                <div style={{ fontWeight: 'bold' }}>{user.displayName}</div>
                <div style={{ fontWeight: 'bold', color: 'orange' }}>
                    {item?.balance.toLocaleString()}
                </div>
            </Col>
        </Row>
    )
}