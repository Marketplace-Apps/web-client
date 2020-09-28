import AddInputButton from 'domain/service/[serviceId]/action/[actionId]/components/AddInputButton'
import SelectInputTypeModal from 'domain/service/[serviceId]/action/[actionId]/components/SelectInputTypeModal'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {useFieldArray, useForm} from 'react-hook-form'
import {ServiceActionConfigDocument, ServiceActionDocument} from 'types/firebase'
import CreateUpdateInputModal from '../../../../../../../domain/service/[serviceId]/action/[actionId]/components/CreateUpdateInputModal'
import Input from '../../../../../../../domain/service/[serviceId]/action/[actionId]/components/Input'
import styles from './index.module.scss'

const ActionDetailPage = () => {

	const router = useRouter()
	const {domainId, serviceId, actionId} = router.query as {domainId: string, serviceId: string, actionId: string}

	const methods = useForm()

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: "form"
	})

	const [action] = useDocumentData<ServiceActionDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(actionId)
	)

	const [actionConfig, loading, error] = useDocumentData<ServiceActionConfigDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(`${actionId}_config`)
	)

	const [updatedInput, setUpdatedInput] = useState<any>(null)


	const [isShowSelectInputTypeModal, setIsShowSelectInputTypeModal] = useState<boolean>(false)
	const onShowSelectInputTypeModal = () => setIsShowSelectInputTypeModal(true)
	const onHideSelectInputTypeModal = () => setIsShowSelectInputTypeModal(false)
	const onSelectInputType = (type: string) => {
		append({
			type,
			required: true
		})
	}

	const [isShowCreateUpdateInputModal, setIsShowCreateUpdateInputModal] = useState<boolean>(false)
	const onShowCreateUpdateInputModal = () => setIsShowCreateUpdateInputModal(true)
	const onHideCreateUpdateInputModal = () => setIsShowCreateUpdateInputModal(false)

	return (
		<MainLayout
			title="Cài đặt form"
		>
			<SelectInputTypeModal
				onHide={onHideSelectInputTypeModal}
				show={isShowSelectInputTypeModal}
				onSelect={type => {
					onSelectInputType(type)
					onHideSelectInputTypeModal()
				}}
			/>
			{
				updatedInput && (
					<CreateUpdateInputModal
						onHide={onHideCreateUpdateInputModal}
						show={isShowCreateUpdateInputModal}
						fields={fields}
						updatedItem={updatedInput}
					/>
				)
			}
			<ServiceDetailContainer>
				<h2 className={styles.ServiceManager__title}>Cài đặt action</h2>
				<div className={styles.PopupAddAction}>
					<div className={styles.PopupAddAction__content}>
						<Form>
							<Form.Group as={Row}>
								<Col sm="12">
									<Form.Control
										type="text"
										placeholder="Tên method"
										defaultValue={actionConfig?.method}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Col sm="12">
									<Form.Control
										type="text"
										placeholder="Url"
										defaultValue={actionConfig?.endpoint}
									/>
								</Col>
							</Form.Group>
							{
								!!fields.length && fields.filter(item => item.type === "text").map(item => (
									<Input.Text
										label={item.label ?? "Input label"}
										name={item.name ?? "Input name"}
										placeholder={item.placeholder ?? "Input placeholder"}
										required={item.required}
										type={item.type}
										onRemove={() => remove(
											fields.findIndex(el => el.id === item.id)
										)}
										onUpdate={() => {
											setUpdatedInput(item)
											onShowCreateUpdateInputModal()
										}}
									/>
								))
							}
							<AddInputButton
								onClick={onShowSelectInputTypeModal}
							/>
							<div className="text-center mt-5">
								<Button
									style={{
										padding: '10px 35px',
										backgroundColor: '#71A7F9',
										color: '#fff',
										fontWeight: 'bold',
									}}
									variant="outline-primary"
									type="submit"
								>
									Save
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</ServiceDetailContainer>
		</MainLayout>
	)
}

export default ActionDetailPage