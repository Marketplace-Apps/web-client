import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { BiCheck } from "react-icons/bi"
import { useUpdateAction } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { CenteredSpinner } from "../../components/common/CenteredSpinner"
import { IconButton } from "../../components/common/IconButton"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"
import { Domain } from "../../types"

const EditForm = ({ domain }: { domain: Domain }) => {


    const { t } = useTranslation('common')

    const { update, updating } = useUpdateAction(domain && `domains/${domain.id}`)

    const form = useForm({
        defaultValues: domain
    })

    return (
        <Form onSubmit={form.handleSubmit(data => update(data))}>
            <Form.Group as={Row} >
                <Form.Label column sm="2"> {t('title')} </Form.Label>
                <Col sm="10"><Form.Control
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
                        placeholder="https://www.exmample.com/icon.png"
                        ref={form.register()}
                        name="icon"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm="2"> Phone </Form.Label>
                <Col sm="10">
                    <Form.Control
                        defaultValue={domain?.icon}
                        placeholder="number"
                        ref={form.register()}
                        name="phone_number"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm="2"> Zalo </Form.Label>
                <Col sm="10">
                    <Form.Control
                        defaultValue={domain?.icon}
                        placeholder="phone"
                        ref={form.register()}
                        name="zalo"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm="2"> Facebook </Form.Label>
                <Col sm="10">
                    <Form.Control
                        defaultValue={domain?.icon}
                        placeholder="username/uid"
                        ref={form.register()}
                        name="facebook"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm="2"> Telegram </Form.Label>
                <Col sm="10">
                    <Form.Control
                        defaultValue={domain?.icon}
                        placeholder="username"
                        ref={form.register()}
                        name="telegram"
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
    )
}

const SiteConfigPage = () => {

    const domain = useDomain()
    const { locale } = useRouter()

    return (
        <MainLayout showHeaderTitle title={AppRouteList.Me.children.SiteConfig.name}>
            {!domain && <CenteredSpinner />}
            {domain && <EditForm domain={domain} />}
        </MainLayout>
    )
}

export default SiteConfigPage