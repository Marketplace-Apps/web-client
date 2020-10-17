import CenteredSpinner from 'components/CenteredSpinner'
import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import { firestore } from 'firebase/app'
import { classifyDataByField } from 'helpers'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import React, { useEffect } from 'react'
import { Container, Form, FormControl, Row } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BsSearch } from 'react-icons/bs'
import { DomainServiceDocument } from 'types/firebase'
import styles from './index.module.scss'

const ServicePage = (props: { domainId: string | null }) => {
	const [domainServices, loadingDomainServices] = useCollectionData<
		DomainServiceDocument
	>(
		firestore()
			.collection('domains')
			.doc(props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
			.collection('services')
			.where('published', '==', true),
	)

	const classifiedByTagServices = classifyDataByField<
		string,
		DomainServiceDocument & { key: string }
	>(domainServices?.map(el => ({ ...el, key: el.tag })) ?? [])

	useEffect(() => {
		if (props.domainId || typeof window != 'undefined' && window.location.hostname || 'null') localStorage.setItem('domain_id', props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
	}, [props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'])

	return (
		<MainLayout title="Danh sách dịch vụ" domainId={props.domainId || typeof window != 'undefined' && window.location.hostname || 'null'}>
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
								name={`Dịch vụ ${group.key}`}
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
 
export default ServicePage
