import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useCollectionData } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { UserDetailModal } from "../../components/me/UserDetailModal"
import { UserItem } from "../../components/me/UserItem"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"
import { User } from "../../types"





const UserManagerPage = () => {

    const domain = useDomain()
    const { locale } = useRouter()

    const [search, set_search] = useState('')

    const { items: users } = useCollectionData<User>(domain && `domains/${domain.id}/users`)

    const [active_user, set_active_user] = useState<number>(-1)
    return (
        <MainLayout title={AppRouteList.Me.children.UserManager.name}>
            {active_user >= 0 && users[active_user] && (
                <UserDetailModal
                    onHide={() => set_active_user(-1)}
                    user={users[active_user]}
                />
            )}
            <Row className="mb-2 ml-1">
                <h5>{AppRouteList.Me.children.UserManager.name[locale]}</h5>
            </Row>
            <Row>
                <Col xs={12}>
                    <Form.Control
                        placeholder="Search email/name"
                        value={search}
                        onChange={e => set_search(e.target.value)}
                        onFocus={e => e.target.select()}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                {
                    users
                        .filter(u => search.length == 0 || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase()))
                        .map((user, i) => (
                            <Col
                                xs={12}
                                md={12}
                                xl={4}
                                lg={6}
                                key={user.id}
                            >
                                <UserItem
                                    key={user.id}
                                    user={user}
                                    onClick={() => set_active_user(i)}
                                />
                            </Col>
                        ))
                }
            </Row>
        </MainLayout>
    )
}

export default UserManagerPage
