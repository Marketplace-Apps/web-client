import React from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {FormProvider, useForm, useFormContext} from "react-hook-form"

interface ICreateUpdateInputModalProps {
	show: boolean
	onHide: () => void
	updatedItem: any
	fields: any
}

const CreateUpdateTextInput = (props: {data: any}) => {
	const methods = useFormContext()
	const {register, errors} = methods

	return (
		<>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Label"
					name="label"
					ref={register}
					defaultValue={props.data.label}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Name"
					name="name"
					ref={register}
					defaultValue={props.data.name}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Placeholder"
					ref={register}
					name="placeholder"
					defaultValue={props.data.placeholder}
				/>
			</Form.Group>
			<Form.Check
				custom
				type="radio"
				label="Required"
				defaultChecked={props.data.required}
				name="required"
				ref={register}
			/>
			<Form.Check
				custom
				type="radio"
				label="Optional"
				defaultChecked={!props.data.required}
			/>
		</>
	)
}

const CreateUpdateInputModal = ({
	show,
	onHide,
	updatedItem
}: ICreateUpdateInputModalProps) => {
	const methods = useForm()
	const onSubmit = methods.handleSubmit(data => console.log({data}))

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Chỉnh sửa input</Modal.Title>
			</Modal.Header>
			<FormProvider {...methods}>
				<Form
					onSubmit={onSubmit}
				>
					<Modal.Body>
						{
							updatedItem.type === "text" && (
								<CreateUpdateTextInput
									data={updatedItem}
								/>
							)
						}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={onHide}>
							Hủy
				</Button>
						<Button
							variant="primary"
							type="submit"
						>
							Lưu
				</Button>
					</Modal.Footer>
				</Form>
			</FormProvider>
		</Modal >
	)
}

export default CreateUpdateInputModal