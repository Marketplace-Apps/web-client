import { firestore } from 'firebase'
import { useRouter } from 'next/router'
import React from 'react'
import { Image } from 'react-bootstrap'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ServiceActionDocument } from 'types/firebase'
import styles from './index.module.scss'

const ListActions = (props: {
	minPrice: number
	onSelectAction: (action: ServiceActionDocument) => void
}) => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const [actions] = useCollectionData<ServiceActionDocument>(
		firestore()
			.collection('services')
			.doc(`${serviceId}_config`)
			.collection('actions')
			.where('is_order_action', '==', false),
	)

	return (
		<>
			{actions?.map(action => (
				<div
					className={styles.HeaderServices__button}
					onClick={() => props.onSelectAction(action)}
					style={{
						border: '1px solid #25ADE1',
						borderRadius: '60px',
						padding: '7px 10px 7px 10px',
					}}
				>
					<Image
						thumbnail
						src={action.icon}
						width="25px"
						roundedCircle
						style={{
							border: 'none',
						}}
					/>
					<span style={{ color: '#25ADE1' }}>{action.name}</span>
				</div>
			))}
		</>
	)
}

export default ListActions
