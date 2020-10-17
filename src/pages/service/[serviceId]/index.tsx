import CenteredSpinner from 'components/CenteredSpinner'
import ActionDetailModal from 'domain/service/[serviceId]/ActionDetailModal'
import ListActions from 'domain/service/[serviceId]/ListActions'
import ListOrders from 'domain/service/[serviceId]/ListOrders'
import ServiceHeader from 'domain/service/[serviceId]/ServiceHeader'
import { firestore } from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { DomainServiceDocument, ServiceActionDocument } from 'types/firebase'

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

	const [isShowActionDetailModal, setIsShowActionDetailModal] = useState<
		boolean
	>(false)
	const onShowActionDetailModal = () => setIsShowActionDetailModal(true)
	const onHideActionDetailModal = () => setIsShowActionDetailModal(false)

	const [
		selectedAction,
		setSelectedAction,
	] = useState<ServiceActionDocument | null>(null)

	return (
		<MainLayout title="Chi tiết dịch vụ" domainId={props.domainId}>
			{loadingService && (
				<div style={{ minHeight: '100vh' }}>
					<CenteredSpinner />
				</div>
			)}
			{!service && !loadingService && (
				<Error statusCode={400} title="Không có dữ liệu về dịch vụ này" />
			)}
			{error && <Error statusCode={500} title="Có lỗi xảy ra!" />}
			{service && (
				<div style={{ minHeight: '100vh' }}>
					{selectedAction && (
						<ActionDetailModal
							show={isShowActionDetailModal}
							onHide={() => {
								setSelectedAction(null)
								onHideActionDetailModal()
							}}
							data={selectedAction}
							serviceMinPrice={service.min_price}
						/>
					)}
					<ServiceHeader icon={service.icon} name={service.name} />
					<ListActions
						minPrice={service.min_price}
						onSelectAction={action => {
							setSelectedAction(action)
							onShowActionDetailModal()
						}}
					/>
					<ListOrders
						domainId={props.domainId}
						serviceData={service}
						onSelectAction={action => {
							setSelectedAction(action)
							onShowActionDetailModal()
						}}
					/>
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
