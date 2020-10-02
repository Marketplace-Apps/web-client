import CustomButton from 'components/CustomButton'
import ActionAlert from 'domain/service/[serviceId]/action/[actionId]/components/ActionAlert'
import AddElementButton from 'domain/service/[serviceId]/action/[actionId]/components/AddElementButton'
import CodeEditor from 'domain/service/[serviceId]/action/[actionId]/components/CodeEditor'
import Input, {BASIC_INPUTS} from 'domain/service/[serviceId]/action/[actionId]/components/Input'
import SelectInputTypeModal from 'domain/service/[serviceId]/action/[actionId]/components/SelectInputTypeModal'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Alert, Col, Form, InputGroup, Row} from 'react-bootstrap'
import {FormProvider, useFieldArray, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {ServiceActionConfigDocument, ServiceActionDocument} from 'types/firebase'
import ActionTypeSelection from '../ActionTypeSelection'
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

	const [priceFunction, setPriceFunction] = useState<string | null>(action?.price_function)
	const [isUpdating, setIsUpdating] = useState<boolean>(false)

	const methods = useForm({
		defaultValues: {
			form: action?.form,
			advanced_options: action?.advanced_options
		}
	})

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: "form"
	})

	const watchFields = methods.watch("form", fields)

	const onSubmit = methods.handleSubmit(async data => {
		setIsUpdating(true)
		try
		{
			await firestore().collection('services').doc(`${serviceId}_config`).collection('actions').doc(actionId).set(
				{
					form: data.form,
					advanced_options: data.advanced_options,
					price_function: priceFunction,
					id: actionId,
					name: data.name,
					icon: data.icon,
					action_type: data.action_type
				},
				{
					merge: true
				}
			)
			await firestore().collection('services').doc(`${serviceId}_config`).collection('actions').doc(`${actionId}_config`).set({
				endpoint: data.endpoint,
				method: data.method,
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
											isInvalid={!!methods.errors.name}
											type="text"
											placeholder="Tên action"
											defaultValue={action?.name}
											name="name"
											ref={methods.register({
												required: {
													value: true,
													message: "Vui lòng nhập tên action"
												}
											})}
										/>
										{
											methods.errors.name && (
												<Alert className="mt-1" variant="warning">
													{methods.errors.name.message}
												</Alert>
											)
										}
									</Col>
								</Form.Group>
								<Form.Group as={Row}>
									<Col sm="12">
										<Form.Control
											isInvalid={!!methods.errors.icon}
											type="text"
											placeholder="Icon"
											defaultValue={action?.icon}
											name="icon"
											ref={methods.register({
												required: {
													value: true,
													message: "Vui lòng nhập đường dẫn icon"
												}
											})}
										/>
										{
											methods.errors.icon && (
												<Alert className="mt-1" variant="warning">
													{methods.errors.icon.message}
												</Alert>
											)
										}
									</Col>
								</Form.Group>
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<Form.Control
											as="select"
											custom
											name="method"
											ref={methods.register({
												required: {
													value: true,
													message: "Vui lòng nhập method"
												}
											})}
											defaultValue={actionConfig?.method ?? "POST"}
										>
											{
												[
													"POST",
													"GET"
												].map(method => (
													<option
														value={method}
													>
														{method}
													</option>
												))
											}
										</Form.Control>
									</InputGroup.Prepend>
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
								</InputGroup>
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
									defaultValue={priceFunction}
								/>
								<ActionTypeSelection
									fields={watchFields.map(item => ({
										name: item.name,
										label: item.label
									}))}
									actionType={action?.action_type}
									isOrderAction ={action?.is_order_action}
								/>
								<div className="text-center mt-5">
									<CustomButton
										isLoading={isUpdating}
										loadingText="Đang lưu"
										style={{
											padding: '10px 35px',
											backgroundColor: '#71A7F9',
											color: '#fff',
											fontWeight: 'bold',
										}}
										variant="outline-primary"
										type="submit"
									>
										Lưu
									</CustomButton>
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