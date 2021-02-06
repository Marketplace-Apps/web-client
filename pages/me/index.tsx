import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Col, Row } from "react-bootstrap"
import { AppRouteList } from "../../AppRouteList"
import { Credit } from "../../components/common/Credit"
import { LinkCard } from "../../components/common/LinkCard"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { LanguageList } from "../../LanguageList"
import { MainLayout } from "../../layouts/MainLayout"



const MePage = () => {

	const domain = useDomain()
	const user = useCurrentUser()
	const isAdmin = domain?.owner_id && domain?.owner_id == user?.id
	const { t } = useTranslation('common')

	const router = useRouter()

	return (
		<MainLayout title={AppRouteList.Me.name}>

			<div style={{
				boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
				margin: 3,
				padding: 10,
				borderRadius: 10
			}}>
				<Row>
					<Col xs={12} className="d-flex justify-content-center align-items-center ">
						<div>
							<img
								src={user?.avatar}
								style={{ borderRadius: '100%', width: 80, height: 80 }}
							/>
						</div>
						<div className="ml-2">
							<div style={{ fontSize: 20, fontWeight: 'bold', color: '#1ebce9' }}>{user?.name || t('guest')}</div>
							<div style={{ fontSize: 15, color: '#cf6acc' }}>{user?.email}</div>
							<div style={{ fontSize: 15, color: '#e2500b' }}>
								<Credit value={user?.balance} />
							</div>
						</div>
					</Col>
				</Row>
			</div>

			<Row>
				<Col xs={12} className="text-right">
					{
						LanguageList.map(({ icon, id }) => (
							<img
								src={icon}
								width={60}
								height={30}
								className="m-2"
								style={{ cursor: 'pointer' }}
								onClick={() => {

									router.push(router.pathname, router.asPath, {
										locale: id
									})

								}}
							/>
						))
					}
				</Col>
			</Row>

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
