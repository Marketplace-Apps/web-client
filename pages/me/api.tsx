import { Alert, Button, Col, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap"
import { HiOutlineRefresh } from "react-icons/hi"
import { AiFillPlusCircle, AiOutlineAlert } from "react-icons/ai"
import { useAction, useDocumentData } from "react-livequery-hooks"
import { IconButton } from '../../components/common/IconButton'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { useCopy } from '../../hooks/useCopy'
import { useDomain } from '../../hooks/useDomain'
import useTranslation from 'next-translate/useTranslation'
import { useDomainUser } from '../../hooks/useCurrentUser'

const APIPage = () => {

    const { root_domain, current_domain } = useDomain()
    const domain = root_domain || current_domain
    const me = useDomainUser(domain)
    const token = me?.api_key

    const {
        excute: generate_new_api_key,
        loading: genrating
    } = useAction(domain && me && `domains/${domain.id}/users/${me.id}/~generate-api-key`, 'POST')

    const { copied, copy } = useCopy()

    const { t, lang } = useTranslation('common')


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

                        {
                            lang == 'vi' && <Alert
                                variant="danger"
                            >Bạn phải sử dụng API dưới đây để không bị hết hạn</Alert>
                        }

                        {
                            lang == 'en' && <Alert
                                variant="danger"
                            >This API key never expired</Alert>
                        }

                    </Col>
                    {
                        token && (
                            <Col xs={12}>
                                <Row style={{
                                    boxShadow: '1px 1px 5px 0px rgba(138,138,138,1)',
                                    marginBottom: 20
                                }}>

                                    <Col xs={9} style={{ wordBreak: 'break-word', padding: 20 }}>
                                        {token}
                                    </Col>

                                    <Col xs={3} className="d-flex justify-content-end align-items-center">
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