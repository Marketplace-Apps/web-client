
import { Badge, Col, Row } from 'react-bootstrap'
import { groupBy2Key } from '../../helpers/group' 
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'
import { ServiceItem } from '../../components/services/ServiceItem'
import { Fragment } from 'react'
import { BASE_URL, ServiceList } from '../../const'
import { ServiceProvider } from '../../types'
import { GetStaticProps } from 'next'
import { Response } from 'react-livequery-hooks'


export type ServicePage = { services: ServiceProvider[] }
const ServicePage = (props: ServicePage) => {

	const router = useRouter()
	const services = groupBy2Key(props.services, 'category', 'id')

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
							{[...services.get(id)?.values() || []].map(service => (
								<Col
									key={service.id}
									xs={4}
									sm={3}
									md={4}
									xl={2}
									lg={3}
									style={{ padding: '10px 5px 5px 5px' }}
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

export const getStaticProps: GetStaticProps<ServicePage> = async ctx => {
	const { data: { items } } = await fetch(`${BASE_URL}services`).then(r => r.json()) as Response<ServiceProvider>
	return { props: { services: items }, revalidate: 60 }
}

