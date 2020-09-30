import CenteredSpinner from 'components/CenteredSpinner'
import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import {firestore} from 'firebase/app'
import {classifyDataByTag} from 'helpers'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React from 'react'
import {Button, Container, Form, FormControl, Image, Row} from 'react-bootstrap'
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainDocument, DomainServiceDocument} from 'types/firebase'
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

	const [domain, loadingDomain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	const [domainServices, loadingDomainServices] = useCollectionData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').where("published", "==", true)
	)

	const onCreateNewService = async () => {
		const serviceId = firestore().collection('domains').doc(domainId).collection('services').doc().id
		await firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).set({
			visible: true,
			published: false
		})
		router.push(
			'/domain/[domainId]/service/[serviceId]',
			`/domain/${domainId}/service/${serviceId}`
		)
	}

	const classifiedByTagServices = classifyDataByTag(domainServices ?? [])

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
					/>
						Copy dịch vụ
				</Button>
				<Button
					className={styles.list_button__btn}
					variant="outline-secondary"
					size="sm"
					onClick={onCreateNewService}
				>
					<Image
						className={styles.sidebarRight_guild__img}
						src="/images/createservice.png"
						fluid
					/>
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
				loadingDomain && loadingDomainServices && <CenteredSpinner />
			}
			{
				!domain && !loadingDomain && <Error statusCode={400} title="Không tồn tại domain này" />
			}
			{
				domain && !loadingDomain && domainServices && classifiedByTagServices?.map(group => (
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
