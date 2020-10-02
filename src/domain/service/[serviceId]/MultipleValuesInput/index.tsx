import React from 'react'
import {Col, Form, FormControl} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'
import styles from './index.module.scss'

interface IMultipleValuesInput {
	label: string
	name: string
	required: string
	type: string
	options: Array<{
		label: string
		value: string
	}>
	prefixName?: string
}

const MultipleValuesInput = ({
	label,
	name,
	required,
	type,
	options,
	prefixName
}: IMultipleValuesInput) => {

	const {
		register,
		errors
	} = useFormContext()

	const fieldName = prefixName ? `${prefixName}.${name}` : name
	const error =
		errors && prefixName
			? errors[prefixName] && errors[prefixName][name]
			: errors[name]

	return (
		<Form.Row
			className="mb-3"
		>
			<Col
				xs={3}
				className={styles.action__nameSelect}
			>
				{label}
			</Col>
			<Col>
				{
					type === "select" && (
						<>
							<Form.Control
								as="select"
								ref={register({
									required: {
										value: JSON.parse(required),
										message: `Vui lòng điền ${label.toLocaleLowerCase()}`
									}
								})}
								name={fieldName}
								isInvalid={!!error}
							>
								{
									options.map(option => (
										<option
											value={option.value.match(/^[0-9]*$/) ? +option.value : option.value}
										>
											{
												option.label
											}
										</option>
									))
								}
							</Form.Control>
							{
								!!error && (
									<FormControl.Feedback type="invalid">
										{
											error.message
										}
									</FormControl.Feedback>
								)
							}
						</>

					)
				}
				{
					(type === "radio" || type === "checkbox") && (
						<>
							{
								options.map(option => (
									<Form.Check
										type={type}
										label={option.label}
										value={option.value.match(/^[0-9]*$/) ? +option.value : option.value}
										ref={register({
											required: {
												value: JSON.parse(required),
												message: `Vui lòng điền ${label.toLocaleLowerCase()}`
											}
										})}
										name={fieldName}
										isInvalid={!!error}
									/>
								))
							}
							{
								!!error && (
									<FormControl.Feedback type="invalid">
										{
											error.message
										}
									</FormControl.Feedback>
								)
							}
						</>
					)
				}
			</Col>
		</Form.Row>
	)
}

export default MultipleValuesInput