import { useAuth } from "firebase-easy-hooks"
import { Col, Row } from "react-bootstrap"
import { FcAutomatic, FcBusinessman } from "react-icons/fc"
import { AppRouteList } from "../../AppRouteList"
import { LinkCard } from "../../components/common/LinkCard"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"



const MePage = () => {

	const domain = useDomain()
	const { user } = useAuth()
	const isAdmin = domain?.owner_id && domain?.owner_id == user?.uid

	return (
		<MainLayout title={AppRouteList.Me.name}>
			<Row>
				{
					Object
						.values({
							...AppRouteList.Me.children,
							Logout: AppRouteList.Logout
						})
						.filter(item => !item.admin || (item.admin && isAdmin))
						.map(item => (
							<Col xs={12} sm={6} md={4} lg={3} key={item.name.en}>
								<LinkCard {...item} />
							</Col>
						))
				}
			</Row>
		</MainLayout>
	)
}

export default MePage
