
import { Badge, Col, Row } from 'react-bootstrap'
import { useDomain } from '../../hooks/useDomain'
import { groupBy2Key } from '../../helpers/group'
import { ImFacebook2 } from 'react-icons/im'
import { SiTiktok } from 'react-icons/si'
import { useCollectionData } from 'react-livequery-hooks' 
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { ServiceItem } from '../../components/services/ServiceItem'
import { Fragment } from 'react'
import { FaInstagram } from 'react-icons/fa'
import { CenteredSpinner } from '../../components/common/CenteredSpinner'
import { ServiceList } from '../../const'
import { ServiceProvider } from '../../types'




const ServicePage = () => {
	const router = useRouter()
	const { items, loading } = useCollectionData<ServiceProvider>('services', { cache: { update: true, use: true } })
	const services = groupBy2Key(items, 'category', 'id')

	return (
		<MainLayout title={AppRouteList.Services.name}>

			{
				ServiceList.map(({ color, icon: Icon, id, name }) => (
					<Fragment key={id}>
						<Row className="pt-4">
							<Col className="d-flex justify-content-start align-items-center">
								<Icon size={25} color={color} />
								<div style={{ marginLeft: 10, fontSize: 20, color }}>{name}</div>
							</Col>
						</Row>
						<Row>
							{loading && <Col xs={12}><CenteredSpinner variant="info" size="sm" animation="grow" /></Col>}
							{[...services.get(id)?.values() || []].map(service => (
								<Col
									key={service.id}
									xs={6}
									md={3}
									xl={2}
									lg={3}
									className="pt-3"
								>
									<ServiceItem
										onClick={() => router.push(`services/${service.id}`)}
										service={service}
									/>
								</Col>
							))}
						</Row>
					</Fragment>
				))
			}
		</MainLayout>
	)
}

export default ServicePage
