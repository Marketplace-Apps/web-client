import CenteredSpinner from 'components/CenteredSpinner'
import ActionDetailModal from 'domain/service/[serviceId]/ActionDetailModal'
import ListActions from 'domain/service/[serviceId]/ListActions'
import ListOrders from 'domain/service/[serviceId]/ListOrders'
import ServiceHeader from 'domain/service/[serviceId]/ServiceHeader'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { DomainServiceDocument, ServiceActionDocument } from 'types/firebase'
import { useDocumentData, useDomain } from '../../../hooks'

const ServiceDetailPage = () => {
	const domain = useDomain()

	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const { data: service, loading, error } = useDocumentData<
		DomainServiceDocument
	>(`domains/${domain?.id}/services/${serviceId}`)

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
		<MainLayout title="Chi tiết dịch vụ">
			{!service && (
				<div style={{ minHeight: '100vh' }}>
					<CenteredSpinner />
				</div>
			)}
			{!service && !loading && (
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

export default ServiceDetailPage
