import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React from 'react'
import {Button, Container, Form, FormControl, Image, Row} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import CenteredSpinner from '../../../components/CenteredSpinner'
import {classifyDataByTag} from '../../../helpers'
import {DomainServiceDocument} from '../../../types/firebase'
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

const HomePage = () => {

	const router = useRouter()
	const {domainId} = router.query as {domainId: string}

	const [services, loading] = useCollectionData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services')
	)

	const classifiedByTagServices = classifyDataByTag(services ?? [])

	return (
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
				loading && <CenteredSpinner />
			}
			{
				!loading && classifiedByTagServices?.map(group => (
					<GroupedByTypeListServicesContainer>
						<GroupedByTypeListServicesHeader
							iconUrl="/images/services/fb2.png"
							name={group.tag}
						/>
						<Row>
							{
								group.data.map(serviceAction => (
									<ServicePreview
										{...serviceAction}
										domainId={domainId}
									/>
								))
							}
						</Row>
					</GroupedByTypeListServicesContainer>
				))
			}
		</MainLayout>
	)
}

export default HomePage
