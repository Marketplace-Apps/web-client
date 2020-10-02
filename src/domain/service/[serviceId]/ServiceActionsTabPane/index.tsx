import {firestore} from 'firebase/app'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Dropdown, Image} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {VscGithubAction} from 'react-icons/vsc'
import {ServiceActionDocument} from 'types/firebase'
import ActionDetailModal from '../ActionDetailModal'
import styles from './index.module.scss'

const ServiceActionsTabPane = () => {
	const router = useRouter()
	const {serviceId} = router.query as {serviceId: string}

	const [actions] = useCollectionData<ServiceActionDocument>(
		firestore().collection('services').doc(`${serviceId}_config`).collection('actions').where("is_order_action", "==", false)
	)

	const [isShowActionDetailModal, setIsShowActionDetailModal] = useState<boolean>(false)
	const onShowActionDetailModal = () => setIsShowActionDetailModal(true)
	const onHideActionDetailModal = () => setIsShowActionDetailModal(false)
	const [selectedAction, setSelectedAction] = useState<ServiceActionDocument | null>(null)

	return (
		<>
			{
				selectedAction && (
					<ActionDetailModal
						show={isShowActionDetailModal}
						onHide={() => {
							setSelectedAction(null)
							onHideActionDetailModal()
						}}
						data={selectedAction}
					/>
				)
			}

			<Dropdown
				className={
					styles.HeaderServices__dropdown +
					' ' +
					styles.HeaderServices__btn
				}
			>
				<Dropdown.Toggle
					className={styles.HeaderServices__btn}
					id="dropdown-basic"
					variant='outline-success'
				>
					<VscGithubAction
						style={{fontSize: '1.2rem'}}
						className={styles.HeaderServices_content__img + ' mr-1'}
					/>
      Action
    </Dropdown.Toggle>
				<Dropdown.Menu>
					{
						actions?.map(action => (
							<Dropdown.Item>
								<div
									style={{marginBottom: '1rem', width: "100%"}}
									className="list_component__item"
									onClick={() => {
										setSelectedAction(action)
										onShowActionDetailModal()
									}}
								>
									<Image
										thumbnail
										src={action.icon}
										width="25px"
									/>
									<span style={{color: '#25ADE1'}}>
										{
											action.name
										}
									</span>
								</div>
							</Dropdown.Item>
						))
					}
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}

export default ServiceActionsTabPane