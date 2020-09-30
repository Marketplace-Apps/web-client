import React, {useState} from 'react'
import {Alert, Form} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'

interface IActionTypeSelectionProps {
	fields: any
	actionType: {
		type: string
		by?: string
	}
}

const ActionTypeSelection = ({
	fields,
	actionType
}: IActionTypeSelectionProps) => {

	const {register, errors} = useFormContext()
	const [isDisplayNameSelection, setIsDisplayNameSelection] = useState<boolean>(actionType.type !== "one_time_order")

	return (
		<div
			className="mt-3"
		>
			<Form.Check
				type="radio"
				label="Action này tạo đơn hàng đơn lẻ sử dụng 1 lần"
				name="action_type.type"
				value="one_time_order"
				ref={register}
				onClick={() => setIsDisplayNameSelection(false)}
				defaultChecked={actionType.type === "one_time_order"}
			/>
			<Form.Check
				type="radio"
				label="Action này tạo 1 subscription tính theo dung lượng/số lần sử dụng"
				name="action_type.type"
				value="bulk_order"
				ref={register}
				onClick={() => setIsDisplayNameSelection(true)}
				defaultChecked={actionType.type === "bulk_order"}
			/>
			<Form.Check
				type="radio"
				label="Action này tạo 1 subscription có kỳ hạn"
				name="action_type.type"
				value="time_limited_order"
				ref={register}
				onClick={() => setIsDisplayNameSelection(true)}
				defaultChecked={actionType.type === "time_limited_order"}
			/>
			{
				isDisplayNameSelection && (
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
							defaultValue={actionType.by || fields[0]?.name || null}
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
		</div>
	)
}

export default ActionTypeSelection