import CenteredSpinner from 'components/CenteredSpinner'
import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import { firestore } from 'firebase/app'
import { classifyDataByTag } from 'helpers'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import React, { useEffect } from 'react'
import { Container, Form, FormControl, Row } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BsSearch } from 'react-icons/bs'
import { DomainServiceDocument } from 'types/firebase'
import styles from './index.module.scss'

const HomePage = (props: { domainId: string | null }) => {
	const [domainServices, loadingDomainServices] = useCollectionData<
		DomainServiceDocument
	>(
		firestore()
			.collection('domains')
			.doc(props.domainId ?? 'domain-id')
			.collection('services')
			.where('published', '==', true),
	)

	const classifiedByTagServices = classifyDataByTag(domainServices ?? [])

	useEffect(() => {
		if (props.domainId) localStorage.setItem('domain_id', props.domainId)
	}, [props.domainId])

	return (
		<MainLayout title="Trang chủ">
			<div className={styles.header__search}>
				<Container>
					<Form inline className={styles.header__form}>
						<FormControl
							type="text"
							placeholder="Search"
							className={styles.header__inputSearch}
						/>
						<BsSearch
							className={styles.header__btnSearch}
							style={{ fontSize: '2rem', color: 'green' }}
						/>
					</Form>
				</Container>
			</div>
			<GroupedByTypeListServicesContainer>
				{loadingDomainServices && <CenteredSpinner />}
				{!domainServices && !loadingDomainServices && (
					<Error statusCode={400} title="Không có dữ liệu về tên miền này" />
				)}
				{domainServices &&
					classifiedByTagServices?.map(group => (
						<>
							<GroupedByTypeListServicesHeader
								iconUrl="/images/services/fb2.png"
								name={group.tag}
							/>
							<Row>
								{group.data.map(serviceAction => (
									<ServicePreview {...serviceAction} />
								))}
							</Row>
						</>
					))}
			</GroupedByTypeListServicesContainer>
		</MainLayout>
	)
}

HomePage.getInitialProps = async (ctx: any) => {
	const host = ctx.req ? ctx.req.headers.host.split(':')[0] : location.hostname
	const domain = await firestore()
		.collection('domains')
		.where('domain_name', '==', host)
		.get()
	return {
		domainId: domain.docs.length ? domain.docs[0].id : null,
	}
}

export default HomePage
