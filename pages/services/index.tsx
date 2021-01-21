
import { Badge, Col, Row } from 'react-bootstrap'
import { useDomain } from '../../hooks/useDomain'
import { groupBy2Key } from '../../helpers/group'
import { ImFacebook2 } from 'react-icons/im'
import { useCollectionData } from 'react-livequery-hooks'
import { DomainService } from '../../types'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { ServiceItem } from '../../components/services/ServiceItem'

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
						xs={6}
						md={3}
						xl={2}
						lg={3}

					>
						<ServiceItem
							onClick={() => router.push(`services/${service.id}`)} 
							service={service}
						/>
					</Col>
				))}
			</Row>
		</MainLayout>
	)
}

export default ServicePage
