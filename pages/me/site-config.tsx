import useTranslation from "next-translate/useTranslation"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { BiCheck } from "react-icons/bi"
import { useUpdateAction } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { IconButton } from "../../components/common/IconButton"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"



const SiteConfigPage = () => {

    const domain = useDomain()

    const form = useForm()

    const { t } = useTranslation('common')

    const { update, updating } = useUpdateAction(domain && `domains/${domain.id}`)

    return (
        <MainLayout title={AppRouteList.Me.children.SiteConfig.name}>
            <Form onSubmit={form.handleSubmit(data => update(data))}>
                <Form.Group as={Row} >
                    <Form.Label column sm="2"> {t('title')} </Form.Label>
                    <Col sm="10"><Form.Control
                        defaultValue={domain?.name}
                        placeholder="SSM services"
                        ref={form.register()}
                        name="name"
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2">  {t('logo')}  </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            defaultValue={domain?.icon}
                            placeholder="https://www.exmample.com/icon.png"
                            ref={form.register()}
                            name="icon"
                        />
                    </Col>
                </Form.Group>

                <IconButton
                    variant="primary"
                    icon={BiCheck}
                    type="submit"
                    disabled={updating}
                    loading={updating}
                > {t('submit')} </IconButton>
            </Form>
        </MainLayout>
    )
}

export default SiteConfigPage