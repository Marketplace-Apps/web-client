import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Container, Form, FormControl, Image, Row} from 'react-bootstrap'
import styles from './index.module.scss'

const SERVICES = [
	{
		name: "Dịch vụ Instagram",
		icon: "/images/services/fb2.png",
		actions: [
			{
				name: "Like",
				icon: "/images/services/fb1.png"
			}
		]
	}
]

const HomePage = () => (
	<MainLayout title="Trang chủ">
		<div className={styles.list_button}>
			<Button
				className={styles.list_button__btn}
				variant="outline-primary"
				size="sm"
			>
				<Image
					className={styles.sidebarRight_guild__img}
					src="/images/copyservice.png"
					fluid
				/>{' '}
					Copy dịch vụ
			</Button>
			<Button
				className={styles.list_button__btn}
				variant="outline-secondary"
				size="sm"
			>
				<Image
					className={styles.sidebarRight_guild__img}
					src="/images/createservice.png"
					fluid
				/>{' '}
					Tạo dịch vụ mới
				</Button>
		</div>
		<div className={styles.header__search}>
			<Container>
				<Form inline className="pt-1">
					<FormControl
						type="text"
						placeholder="Search"
						className={styles.header__inputSearch}
					/>
					<Button
						variant="outline-success"
						className={styles.header__btnSearch}
					>
						<Image
							style={{
								borderRadius: '100%',
							}}
							src="/images/iconSearch.png"
						/>
					</Button>
				</Form>
			</Container>
		</div>
		{
			SERVICES.map(service => (
				<GroupedByTypeListServicesContainer>
					<GroupedByTypeListServicesHeader
						iconUrl={service.icon}
						name={service.name}
					/>
					<Row>
						{
							service.actions.map(serviceAction => (
								<ServicePreview
									iconUrl={serviceAction.icon}
									name={serviceAction.name}
								/>
							))
						}
					</Row>
				</GroupedByTypeListServicesContainer>
			))
		}
	</MainLayout>
)

export default HomePage
