import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useRouter } from "next/router"
import { Col, Nav, Row } from "react-bootstrap"
import { ServiceProvider } from "../../types"

export const ServiceNav = ({ service }: { service: ServiceProvider<any> }) => {
    const router = useRouter()
    const { service_id } = router.query
    const { asPath } = router
    const { t } = useTranslation('common')
    const navs = ['', 'history', 'api'].map(r => ({ href: `/services/${service_id}${r && `/${r}`}`, name: r || 'create' }))

    return (
        <Row>
            <Col xs={12} lg={6} className="d-flex justify-content-start align-items-center">
                <img src={service?.icon} width={30} height={30} />
                <div style={{ marginLeft: 10, fontWeight: 'bold' }}>{service?.name[router.locale]}</div>
            </Col>
            <Col xs={12}>
                <Nav variant="tabs">
                    {
                        navs.map(({ href, name }) => (
                            <Nav.Link
                                style={{ textDecoration: 'none !important' }}
                                active={asPath.endsWith(href)}>
                                <Link href={href} >{name == 'api' ? 'Api' : t(name)}</Link>
                            </Nav.Link>
                        ))
                    }
                </Nav>
            </Col>
        </Row>

    )

}