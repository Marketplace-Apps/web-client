
import { Badge, Col, Row } from 'react-bootstrap'
import { useDomain } from '../../hooks/useDomain'
import { groupBy2Key } from '../../helpers/group'
import { ImFacebook2 } from 'react-icons/im'
import { useCollectionData } from 'react-livequery-hooks'
import { DomainService } from '../../types'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'

const ServicePage = () => {
	const router = useRouter()
	const domain = useDomain('page services')
	const { items, error } = useCollectionData<DomainService>(domain && `domains/${domain.id}/services`, { cache: { update: true, use: true } })
	const services = groupBy2Key(items, 'category', 'id')

	const facebook_services = [...services.get('facebook')?.values() || []]

	return (
		<MainLayout title={AppRouteList.Services.name}>

			<Row>
				<Col className="d-flex justify-content-start align-items-center">
					<ImFacebook2 size={25} color="#027bcd" />
					<div style={{ marginLeft: 10, fontSize: 20, color: '#027bcd' }}>Facebook</div>
				</Col>
			</Row>
			<Row style={{ marginTop: 20 }}>
				{facebook_services.map(service => (
					<Col
						key={service.id}
						xs={4}
						md={4}
						lg={2}
						onClick={() => router.push(`services/${service.id}`)} style={{ cursor: 'pointer' }}
					>
						<div
							className="d-flex-column"
						>
							<div className="d-flex justify-content-center align-items-start">
								<img
									src={service.icon}
									width={80}
									height={80} 
								/>
								<Badge
									pill
									variant="danger"
									style={{ position: 'absolute', top: 10, right: 80 }}
								>{service.price} đ </Badge>
							</div>
							<div className="text-center" style={{ fontWeight: 'bold', color: '#46aaea' }}>
								{service.name[router.locale]}
							</div>
							<div className="d-flex justify-content-center align-items-start">

								{service.maintain && <Badge pill variant="light" style={{ marginLeft: 5 }}>Bảo trì</Badge>}
							</div>
						</div>
					</Col>
				))}
			</Row>
		</MainLayout>
	)
}

export default ServicePage
