import { firestore } from 'firebase'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ServiceActionDocument } from '../../../../types/firebase'
import ActionDetailModal from '../ActionDetailModal'
import styles from './index.module.scss'

const ListActionsContainer = (props: { children: any }) => (
	<div className={styles.HeaderServices__header}>
		<div className={styles.HeaderServices__buttonGroup}>{props.children}</div>
	</div>
)

const ListActions = (props: { minPrice: number }) => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const [isShowActionDetailModal, setIsShowActionDetailModal] = useState<
		boolean
	>(false)
	const onShowActionDetailModal = () => setIsShowActionDetailModal(true)
	const onHideActionDetailModal = () => setIsShowActionDetailModal(false)

	const [
		selectedAction,
		setSelectedAction,
	] = useState<ServiceActionDocument | null>(null)

	const [actions] = useCollectionData<ServiceActionDocument>(
		firestore()
			.collection('services')
			.doc(`${serviceId}_config`)
			.collection('actions')
			.where('is_order_action', '==', false),
	)

	return (
		<ListActionsContainer>
			{selectedAction && (
				<ActionDetailModal
					show={isShowActionDetailModal}
					onHide={() => {
						setSelectedAction(null)
						onHideActionDetailModal()
					}}
					data={selectedAction}
					serviceMinPrice={props.minPrice}
				/>
			)}
			{actions?.map(action => (
				<Button
					className={styles.HeaderServices__button}
					onClick={() => {
						setSelectedAction(action)
						onShowActionDetailModal()
					}}
					variant="outline-secondary"
				>
					<Image thumbnail src={action.icon} width="25px" />
					<span style={{ color: '#25ADE1' }}>{action.name}</span>
				</Button>
			))}
		</ListActionsContainer>
	)
}

export default ListActions
