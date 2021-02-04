import firebase from 'firebase/app'
import { Alert, Button, Col, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap"
import { HiOutlineRefresh } from "react-icons/hi"
import { AiFillPlusCircle, AiOutlineAlert } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { BiErrorCircle } from "react-icons/bi"
import { IconButton } from '../../components/common/IconButton'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { useCopy } from '../../hooks/useCopy'
import { useDomain } from '../../hooks/useDomain'
import useTranslation from 'next-translate/useTranslation'

const APIPage = () => {

    const me = firebase.auth().currentUser
    const domain = useDomain()
    const ref = domain && `domains/${domain.id}/users/${me.uid}`
    const { item, reload } = useDocumentData<{ api_key: string, id: string }>(ref)
    const token = item?.api_key

    const {
        excute: generate_new_api_key,
        loading: genrating,
        error: generate_error
    } = useAction(ref + '/~generate-api-key', 'POST', (data, error) => {
        if (error) return
        reload()
    })

    const { copied, copy } = useCopy()

    const {t} = useTranslation('common')


    return (
        <MainLayout
            title={AppRouteList.Me.children.ApikeyManager.name}
            showHeaderTitle
        >


            <div style={{ padding: 20, backgroundColor: 'white' }}>
                <Row>
                    <Col>
                        <Alert
                            variant="danger"
    >{t('api.alert_developers_only')}</Alert>

                    </Col>
                    {
                        token && (
                            <Col xs={12}>
                                <Row style={{

                                    boxShadow: '1px 1px 5px 0px rgba(138,138,138,1)',
                                    margin: 10,
                                    padding: 10
                                }}>
                                    <Col xs={10} style={{ wordBreak: 'break-all' }}>
                                        {token}
                                    </Col>
                                    <Col xs={2} className="d-flex justify-content-end align-items-center">
                                        <Button variant="outline-dark" onClick={() => copy(token)}>{copied ? t('copied') : t('copy')}</Button>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    }
                    {
                        token && (
                            <Col xs={12} className="d-flex justify-content-center align-items-center">
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    rootClose
                                    overlay={
                                        <Popover id="popover-positioned-bottom">
                                            <Popover.Title as="h3">Alert</Popover.Title>
                                            <div className="p-3">
                                                <Popover.Content>
                                                    {t('api.overwrite_old_api_key')}
                                                </Popover.Content>
                                                <div className="d-flex justify-content-end">
                                                    <Button variant="outline-dark" size="sm" onClick={() => document.body.click()}>
                                                        {t('cancel')}
                                                </Button>
                                                    <Button
                                                        className="ml-1"
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => generate_new_api_key() && document.body.click()}>
                                                        {t('submit')}
                                                </Button>
                                                </div>
                                            </div>
                                        </Popover>
                                    }
                                >
                                    <IconButton
                                        loading={genrating}
                                        icon={HiOutlineRefresh}
                                    >{t('api.change')}</IconButton>
                                </OverlayTrigger>

                            </Col>

                        )
                    }

                    {!token && (
                        <Col xs={12} className="mt-3 d-flex justify-content-center align-items-center">
                            <IconButton
                                variant="outline-primary"
                                className="ml-2"
                                loading={genrating}
                                onClick={() => generate_new_api_key()}
                                icon={AiFillPlusCircle}
                            >
                                <span>{t('create')}</span>

                            </IconButton>
                        </Col>
                    )}
                </Row>
            </div>

        </MainLayout>
    )
}

export default APIPage