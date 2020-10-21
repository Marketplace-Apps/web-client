import CenteredSpinner from 'components/CenteredSpinner'
import GroupedByTypeListServicesContainer from 'domain/home/components/GroupedByTypeListServicesContainer'
import GroupedByTypeListServicesHeader from 'domain/home/components/GroupedByTypeListServicesHeader'
import ServicePreview from 'domain/home/components/ServicePreview'
import { classifyDataByField } from 'helpers'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import React from 'react'
import { Container, Form, FormControl, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { DomainServiceDocument } from 'types/firebase'
import { useCollectionData, useDomain } from '../../hooks'
import styles from './index.module.scss'

const ServicePage = () => {
	const domain = useDomain()

	const { data: domainServices, loading } = useCollectionData<
		DomainServiceDocument
	>(`domains/${domain?.id}/services`, [['published', '==', true]], null, 100)

	const classifiedByTagServices = classifyDataByField<
		string,
		DomainServiceDocument & { key: string }
	>(domainServices?.map(el => ({ ...el, key: el.tag })) ?? [])

	return (
		<MainLayout title="Danh sách dịch vụ">
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
				{loading && <CenteredSpinner />}
				{!domainServices && !loading && (
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
