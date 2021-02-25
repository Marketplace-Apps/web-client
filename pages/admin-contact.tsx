import { useRouter } from "next/router"
import { Alert, Card, Col, Row } from "react-bootstrap"
import { AppRouteList } from "../AppRouteList"
import { useDomain } from "../hooks/useDomain"
import { MainLayout } from "../layouts/MainLayout"

export const AdminContactGuide = () => {

	const { locale } = useRouter()

	return (
		<Row className="mt-4"><Col xs={12}>
			{locale == 'en' && <Alert variant="info">You can click bellow methods to contact with admin</Alert>} 
			{locale == 'vi' && <Alert variant="info">Bạn chọn một phương thức dưới để liên hệ với admin nhé</Alert>} 
		</Col></Row>
	)
}

const AdminContact = () => {

	const { current_domain } = useDomain()

	const methods = []

	current_domain?.phone_number && methods.push({
		name: 'Phone',
		icon: 'https://image.freepik.com/free-vector/cartoon-mobile-phone-screen-during-call_68708-765.jpg',
		text: current_domain.phone_number,
		link: `tel:${current_domain.phone_number}`
	})


	current_domain?.phone_number && methods.push({
		name: 'Zalo',
		icon: 'https://cdn.tgdd.vn/Files/2020/07/21/1272550/unnamed_800x480.png',
		text: current_domain.zalo,
		link: `https://zalo.me/${current_domain.zalo}`
	})

	current_domain?.phone_number && methods.push({
		name: 'Facebook',
		icon: 'https://blog.viecngay.vn/wp-content/uploads/2018/04/facebook-page-manager.png',
		text: current_domain.facebook,
		link: `https://fb.com/${current_domain.facebook}`
	})

	current_domain?.phone_number && methods.push({
		name: 'Messenger',
		icon: 'https://isdownrightnow.net/wp-content/uploads/2015/02/Facebook-Messenger.jpg',
		text: current_domain.facebook,
		link: `https://m.me/${current_domain.facebook}`
	})

	current_domain?.phone_number && methods.push({
		name: 'Telegram',
		icon: 'https://www.messengerpeople.com/wp-content/uploads/2019/09/messenger-overview-telegram.png',
		text: current_domain.telegram,
		link: `https://t.me/${current_domain.telegram}`
	})

	return (
		<MainLayout title={AppRouteList.Contact.name} showHeaderTitle>
			<AdminContactGuide />
			<Row>
				
				{
					methods.map(method => (
						<Col xs={6} sm={6} md={6} xl={2} lg={3} key={method.id}>
							<div className="p-0 mt-4">
								<Card
									style={{ cursor: 'pointer', width: '100%' }}
									onClick={() => typeof window != 'undefined' && window.open(method.link, '_blank')}
								>
									<Card.Img height={120} src={method.icon} style={{objectFit:'cover'}} />
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