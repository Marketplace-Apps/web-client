import { Col, Row } from "react-bootstrap"
import { FcAutomatic, FcBusinessman } from "react-icons/fc"
import { AppRouteList } from "../../AppRouteList"
import { LinkCard } from "../../components/common/LinkCard"
import { MainLayout } from "../../layouts/MainLayout"



const MePage = () => { 

	return (
		<MainLayout title={AppRouteList.Me.name}>
			<Row>
				{
					Object
						.values({
							...AppRouteList.Me.children,
							Logout: AppRouteList.Logout
						})
						.map(item => (
							<Col xs={12} sm={6} md={4} lg={3}>
								<LinkCard {...item} />
							</Col>
						))
				}
			</Row>
		</MainLayout>
	)
}

export default MePage
