
import { Badge, Col, Row } from 'react-bootstrap'
import { useDomain } from '../../hooks/useDomain'
import { groupBy2Key } from '../../helpers/group'
import { ImFacebook2 } from 'react-icons/im'
import { SiTiktok } from 'react-icons/si'
import { useCollectionData } from 'react-livequery-hooks'
import { DomainService } from '../../types'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { ServiceItem } from '../../components/services/ServiceItem'
import { Fragment } from 'react'


const ServiceList = [
	{
		id: 'facebook',
		icon: ImFacebook2,
		color: '#027bcd',
		name: 'Facebook'
	},
	{
		id: 'tiktok',
		icon: SiTiktok,
		color: '#b70053',
		name: 'Tiktok'
	}
]

const ServicePage = () => {
	const router = useRouter()
	const domain = useDomain()
	const { items, error } = useCollectionData<DomainService>(domain && `domains/${domain.id}/services`, { cache: { update: true, use: true } })
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
						<Row  >
							{[...services.get(id)?.values() || []].map(service => (
								<Col
									key={service.id}
									xs={6}
									md={3}
									xl={2}
									lg={3}
									className="pt-2"
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
