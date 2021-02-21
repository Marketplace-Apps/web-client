import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from "react-bootstrap"
import { useCollectionData } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { CenteredSpinner } from "../../components/common/CenteredSpinner"
import { UserDetailModal } from "../../components/me/UserDetailModal"
import { UserItem } from "../../components/me/UserItem"
import { groupBy2Key } from "../../helpers/group"
import { useDomain } from "../../hooks/useDomain"
import { useUserLevels } from "../../hooks/useUserLevels"
import { MainLayout } from "../../layouts/MainLayout"
import { User } from "../../types"





const UserManagerPage = () => {

    const domain = useDomain()

    const [search, set_search] = useState('')
    const { t } = useTranslation('common')
    const { items: users, loading, filters, filter } = useCollectionData<User>(domain && `domains/${domain.id}/users`)
    const levels = useUserLevels().filter(l => l.id != 'root')
    const [active_user, set_active_user] = useState<number>(-1)
    return (
        <MainLayout title={AppRouteList.Me.children.UserManager.name} showHeaderTitle>
            {active_user >= 0 && users[active_user] && (
                <UserDetailModal
                    onHide={() => set_active_user(-1)}
                    user={users[active_user]}
                />
            )}
            <Row>
                <Col xs={12}>
                    <InputGroup  >
                        <InputGroup.Prepend>
                            <DropdownButton
                                title={filters.level ? levels.filter(l => l.id == filters.level.value)[0].name || t('all') : t('all')}
                                variant="outline-dark"
                            >
                                <Dropdown.Item onClick={() => filter({})}>{t('all')}</Dropdown.Item>
                                {
                                    levels.map(level => <Dropdown.Item key={level.id} onClick={() => filter({ level: level.id })}>{level.name}</Dropdown.Item>)
                                }
                            </DropdownButton>
                        </InputGroup.Prepend>
                        <Form.Control
                            placeholder={`${t('search')} ${t('name')}, email, ...`}
                            value={search}
                            onChange={e => set_search(e.target.value)}
                            onFocus={e => e.target.select()}
                        />
                    </InputGroup>

                </Col>
            </Row>
            {loading && <CenteredSpinner />}
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
