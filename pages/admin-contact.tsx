import { Alert, Card, Col, Row } from "react-bootstrap"
import { AppRouteList } from "../AppRouteList"
import { useDomain } from "../hooks/useDomain"
import { MainLayout } from "../layouts/MainLayout"

const AdminContact = () => {

	const domain = useDomain()

	const methods = []

	domain?.phone_number && methods.push({
		name: 'Phone',
		icon: 'https://image.freepik.com/free-vector/hand-hold-cell-smart-phone-application-online-call-center-client-support-banner-flat-vector-illustra_48369-3640.jpg',
		text: domain.phone_number,
		link: `tel:${domain.phone_number}`
	})


	domain?.phone_number && methods.push({
		name: 'Zalo',
		icon: 'https://cdn.tgdd.vn/Files/2020/07/21/1272550/unnamed_800x480.png',
		text: domain.zalo,
		link: `https://zalo.me/${domain.zalo}`
	})

	domain?.phone_number && methods.push({
		name: 'Facebook',
		icon: 'https://blog.viecngay.vn/wp-content/uploads/2018/04/facebook-page-manager.png',
		text: domain.telegram,
		link: `https://fb.com/${domain.facebook}`
	})

	domain?.phone_number && methods.push({
		name: 'Messenger',
		icon: 'https://isdownrightnow.net/wp-content/uploads/2015/02/Facebook-Messenger.jpg',
		text: domain.telegram,
		link: `https://m.me/${domain.facebook}`
	})

	domain?.phone_number && methods.push({
		name: 'Telegram',
		icon: 'https://www.messengerpeople.com/wp-content/uploads/2019/09/messenger-overview-telegram.png',
		text: domain.telegram,
		link: `https://t.me/${domain.telegram}`
	})

	return (
		<MainLayout title={AppRouteList.Contact.name} showHeaderTitle>
			<Row>
				{
					methods.map(method => (
						<Col xs={12} sm={6} md={6} xl={3} lg={4}>
							<div className="p-2">
								<Card
									style={{ cursor: 'pointer', width: '100%' }}
									onClick={() => typeof window != 'undefined' && window.open(method.link, '_blank')}
								>
									<Card.Img height={120} src={method.icon} />
									<Card.Body>
										<Card.Title>{method.name}</Card.Title>
										<Card.Text>{method.text}</Card.Text>
									</Card.Body>
								</Card>
							</div>
						</Col>
					))
				}
			</Row>
		</MainLayout>
	)
}

export default AdminContact