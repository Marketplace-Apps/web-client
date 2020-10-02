import React from 'react'
import {Alert, Form} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'

interface IActionTypeSelectionProps {
	fields: any
	actionType: {
		type: string
		by?: string
	}
	isOrderAction: ConstrainBoolean
}

const FormActionTypeSelection = (props: {
	actionType: {
		type: string
		by?: string
	}
	fields: any
}) => {
	const {
		actionType,
		fields
	} = props

	const {register, errors, watch} = useFormContext()
	const isOneTimeOrder = watch("action_type.type") === "one_time_order" || actionType?.type === "one_time_order"


	return (
		<>
			<Form.Check
				type="radio"
				label="Action này tạo đơn hàng đơn lẻ sử dụng 1 lần"
				name="action_type.type"
				value="one_time_order"
				ref={register}
				defaultChecked={actionType?.type === "one_time_order"}
			/>
			<Form.Check
				type="radio"
				label="Action này tạo 1 subscription tính theo dung lượng/số lần sử dụng"
				name="action_type.type"
				value="bulk_order"
				ref={register}
				defaultChecked={actionType?.type === "bulk_order"}
			/>
			<Form.Check
				type="radio"
				label="Action này tạo 1 subscription có kỳ hạn"
				name="action_type.type"
				value="time_limited_order"
				ref={register}
				defaultChecked={actionType?.type === "time_limited_order"}
			/>
			{
				!isOneTimeOrder && (
					<Form.Group>
						<Form.Label>Trường phụ thuộc</Form.Label>
						<Form.Control
							as="select"
							custom
							name="action_type.by"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng chọn trường phụ thuộc"
								}
							})}
							defaultValue={actionType?.by || fields[0]?.name || null}
						>
							{
								fields.map(item => (
									<option
										value={item.name}
									>
										{
											item.label
										}
									</option>
								))
							}
						</Form.Control>
						{
							errors.action_type?.by && (
								<Alert className="mt-1" variant="warning">
									{errors.action_type.by.message}
								</Alert>
							)
						}
					</Form.Group>
				)
			}
		</>
	)
}

const OrderActionTypeSelection = (props: {
	actionType: {
		type: string
		by?: string
	}
	fields: any
}) => {
	const {
		actionType,
		fields
	} = props

	const {register, errors, watch} = useFormContext()
	const isExtendAction = watch("action_type.type") === "extend" || actionType?.type === "extend"

	return (
		<>
			<Form.Check
				type="radio"
				label="Action này có chức năng riêng biệt"
				name="action_type.type"
				value="other"
				ref={register}
				defaultChecked={actionType?.type === "other"}
			/>
			<Form.Check
				type="radio"
				label="Action này yêu cầu hủy đơn hàng  + hoàn tiền"
				name="action_type.type"
				value="refund"
				ref={register}
				defaultChecked={actionType?.type === "refund"}
			/>
			<Form.Check
				type="radio"
				label="Action này kích hoạt  đơn hàng"
				name="action_type.type"
				value="active"
				ref={register}
				defaultChecked={actionType?.type === "active"}
			/>
			<Form.Check
				type="radio"
				label="Action này vô hiệu hóa đơn hàng "
				name="action_type.type"
				value="disable"
				ref={register}
				defaultChecked={actionType?.type === "disable"}
			/>
			<Form.Check
				type="radio"
				label="Action này gia hạn đơn hàng"
				name="action_type.type"
				value="extend"
				ref={register}
				defaultChecked={actionType?.type === "extend"}
			/>
			{
				isExtendAction && (
					<Form.Group>
						<Form.Label>Trường phụ thuộc</Form.Label>
						<Form.Control
							as="select"
							custom
							name="action_type.by"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng chọn trường phụ thuộc"
								}
							})}
							defaultValue={actionType?.by || fields[0]?.name || null}
						>
							{
								fields.map(item => (
									<option
										value={item.name}
									>
										{
											item.label
										}
									</option>
								))
							}
						</Form.Control>
						{
							errors.action_type?.by && (
								<Alert className="mt-1" variant="warning">
									{errors.action_type.by.message}
								</Alert>
							)
						}
					</Form.Group>
				)
			}
		</>
	)
}

const ActionTypeSelection = ({
	fields,
	actionType,
	isOrderAction
}: IActionTypeSelectionProps) => {

	const {register, errors, watch} = useFormContext()
	const isOneTimeOrder = watch("action_type.type") === "one_time_order" || actionType?.type === "one_time_order"

	return (
		<div
			className="mt-3"
		>
			{
				!isOrderAction && (
					<FormActionTypeSelection
						actionType={actionType}
						fields={fields}
					/>
				)
			}
			{
				isOrderAction && (
					<OrderActionTypeSelection
						actionType={actionType}
						fields={fields}
					/>
				)
			}
		</div>
	)
}

export default ActionTypeSelection