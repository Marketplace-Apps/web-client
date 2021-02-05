import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useRouter } from "next/router"
import { Nav } from "react-bootstrap"

export const ServiceNav = () => {
    const router = useRouter()
    const { service_id } = router.query
    const { asPath } = router
    const { t } = useTranslation('common')
    const navs = ['', 'history', 'api'].map(r => ({ href: `/services/${service_id}${r && `/${r}`}`, name: r || 'create' }))

    return (
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
    )

}