import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AppRouteList } from "../../AppRouteList"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"



const SiteConfigPage = () => {

    const domain = useDomain()

    const form = useForm()



    return (
        <MainLayout title={AppRouteList.Me.children.SiteConfig.name}>
            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm="2"> Tên site </Form.Label>
                    <Col sm="10"><Form.Control
                        defaultValue={domain?.name}
                        placeholder="SSM services"
                        ref={form.register()}
                        name="icon"
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm="2"> Icon  </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            defaultValue={domain?.icon}
                            placeholder="https://www.exmample.com/icon.png"
                            ref={form.register()}
                            name="icon"
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Submit </Button>
            </Form>
        </MainLayout>
    )
}

export default SiteConfigPage