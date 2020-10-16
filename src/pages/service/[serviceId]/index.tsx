import CenteredSpinner from 'components/CenteredSpinner'
import ListActions from 'domain/service/[serviceId]/ListActions'
import ServiceHeader from 'domain/service/[serviceId]/ServiceHeader'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React from 'react'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {DomainServiceDocument} from 'types/firebase'
import ListOrders from '../../../domain/service/[serviceId]/ListOrders'

const ServiceDetailPage = (props: { domainId: string }) => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }
	const [service, loadingService, error] = useDocumentData<
		DomainServiceDocument
	>(
		firestore()
			.collection('domains')
			.doc(props.domainId ?? 'domain-id')
			.collection('services')
			.doc(serviceId),
	)

	return (
		<MainLayout title="Chi tiết dịch vụ">
			{loadingService && <CenteredSpinner />}
			{!service && !loadingService && (
				<Error statusCode={400} title="Không có dữ liệu về dịch vụ này" />
			)}
			{error && <Error statusCode={500} title="Có lỗi xảy ra!" />}
			{service && (
				<div style={{minHeight: "100vh"}}>
					<ServiceHeader icon={service.icon} name={service.name} />
					<ListActions minPrice={service.min_price} />
					<ListOrders domainId={props.domainId} serviceId={serviceId} />
				</div>
			)}
		</MainLayout>
	)
}

ServiceDetailPage.getInitialProps = async (ctx: any) => {
	const host = ctx.req ? ctx.req.headers.host.split(':')[0] : location.hostname
	const domain = await firestore()
		.collection('domains')
		.where('domain_name', '==', host)
		.get()
	return {
		domainId: domain.docs.length ? domain.docs[0].id : null,
	}
}

export default ServiceDetailPage
