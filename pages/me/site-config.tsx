import useTranslation from "next-translate/useTranslation"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AppRouteList } from "../../AppRouteList"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"



const SiteConfigPage = () => {

    const domain = useDomain()

    const form = useForm()

    const { t } = useTranslation('common')

    return (
        <MainLayout title={AppRouteList.Me.children.SiteConfig.name}>
            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2"> {t('title')} </Form.Label>
                    <Col sm="10"><Form.Control
                        defaultValue={domain?.name}
                        placeholder="SSM services"
                        ref={form.register()}
                        name="icon"
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

                <Button variant="primary" type="submit"> {t('submit')} </Button>
            </Form>
        </MainLayout>
    )
}

export default SiteConfigPage