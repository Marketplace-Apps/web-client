import CenteredSpinner from 'components/CenteredSpinner'
import ActionAlert from 'domain/service/[serviceId]/action/[actionId]/components/ActionAlert'
import AddElementButton from 'domain/service/[serviceId]/action/[actionId]/components/AddElementButton'
import CodeEditor from 'domain/service/[serviceId]/action/[actionId]/components/CodeEditor'
import Input, {BASIC_INPUTS} from 'domain/service/[serviceId]/action/[actionId]/components/Input'
import SelectInputTypeModal from 'domain/service/[serviceId]/action/[actionId]/components/SelectInputTypeModal'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Alert, Button, Col, Form, Row} from 'react-bootstrap'
import {FormProvider, useFieldArray, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {ServiceActionConfigDocument, ServiceActionDocument} from 'types/firebase'
import AdvancedOptions from '../AdvancedOptions'
import styles from './index.module.scss'

interface IActionDetailPageBodyProps {
	action: ServiceActionDocument
	actionConfig: ServiceActionConfigDocument
}

const ActionDetailPageBody = ({
	action,
	actionConfig
}: IActionDetailPageBodyProps) => {
	const router = useRouter()
	const {domainId, serviceId, actionId} = router.query as {domainId: string, serviceId: string, actionId: string}

	const [priceFunction, setPriceFunction] = useState<string | null>(null)
	const [isUpdating, setIsUpdating] = useState<boolean>(false)

	const methods = useForm({
		defaultValues: {
			form: action.form,
			advanced_options: action.advanced_options
		}
	})

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: "form"
	})

	const onSubmit = methods.handleSubmit(async data => {
		setIsUpdating(true)
		try
		{
			await firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(actionId).update({
				form: data.form,
				advanced_options: data.advanced_options,
				price_function: priceFunction
			})
			await firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).collection('actions').doc(`${actionId}_config`).update({
				endpoint: data.endpoint,
				method: data.method
			})
			toast.success("Cập nhật action thành công", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		} catch (error)
		{
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsUpdating(false)
	})

	const [isShowSelectInputTypeModal, setIsShowSelectInputTypeModal] = useState<boolean>(false)
	const onShowSelectInputTypeModal = () => setIsShowSelectInputTypeModal(true)
	const onHideSelectInputTypeModal = () => setIsShowSelectInputTypeModal(false)
	const onSelectInputType = (type: string) => {
		if (type === "alert") append({
			type,
			content: "Nội dung của thông báo",
			level: "success"
		})
		else append({
			label: "Label",
			name: "Name",
			type,
			required: true,
		})
	}

	return (
		<>
			<SelectInputTypeModal
				onHide={onHideSelectInputTypeModal}
				show={isShowSelectInputTypeModal}
				onSelect={type => {
					onSelectInputType(type)
					onHideSelectInputTypeModal()
				}}
			/>
			<ServiceDetailContainer>
				<h2 className={styles.ServiceManager__title}>Cài đặt action</h2>
				<div className={styles.PopupAddAction}>
					<div className={styles.PopupAddAction__content}>
						<FormProvider {...methods}>
							<Form
								onSubmit={onSubmit}
							>
								<Form.Group as={Row}>
									<Col sm="12">
										<Form.Control
											isInvalid={!!methods.errors.method}
											type="text"
											placeholder="Tên method"
											defaultValue={actionConfig?.method}
											name="method"
											ref={methods.register({
												required: {
													value: true,
													message: "Vui lòng nhập method"
												}
											})}
										/>
										{
											methods.errors.method && (
												<Alert className="mt-1" variant="warning">
													{methods.errors.method.message}
												</Alert>
											)
										}
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Col sm="12">
										<Form.Control
											isInvalid={!!methods.errors.endpoint}
											type="text"
											placeholder="Url"
											defaultValue={actionConfig?.endpoint}
											name="endpoint"
											ref={methods.register({
												required: {
													value: true,
													message: "Vui lòng nhập endpoint"
												}
											})}
										/>
										{
											methods.errors.endpoint && (
												<Alert className="mt-1" variant="warning">
													{methods.errors.endpoint.message}
												</Alert>
											)
										}
									</Col>
								</Form.Group>
								{
									!!fields.length && fields.map((item, index) => (
										<>
											{
												BASIC_INPUTS.includes(item.type) && (
													<Input
														type={item.type}
														data={{
															label: item.label,
															name: item.name,
															placeholder: item.placeholder,
															required: item.required,
														}}
														onRemove={() => remove(
															fields.findIndex(el => el.id === item.id)
														)}
														baseName={`form[${index}]`}
													/>
												)
											}
											{
												item.type === 'alert' && (
													<ActionAlert
														data={{
															level: item.level,
															content: item.content
														}}
														onRemove={() => remove(
															fields.findIndex(el => el.id === item.id)
														)}
														baseName={`form[${index}]`}
													/>
												)
											}
										</>
									))
								}
								<AddElementButton
									onClick={onShowSelectInputTypeModal}
									text="Thêm input"
								/>
								<AdvancedOptions />
								<CodeEditor
									onChange={code => setPriceFunction(code)}
									defaultValue={action?.price_function}
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
										disabled={isUpdating}
									>
										Save
										{
											isUpdating && <CenteredSpinner />
										}
									</Button>
								</div>
							</Form>
						</FormProvider>
					</div>
				</div>
			</ServiceDetailContainer>
		</>
	)
}

export default ActionDetailPageBody