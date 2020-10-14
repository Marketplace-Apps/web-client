import React, { useEffect } from 'react'
import { Button, Col, Form, FormControl, Image, Row } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'
import styles from './index.module.scss'

interface IMultipleValuesInput {
	inputConfig: {
		label: string
		name: string
		required: string
		default_value?: any
		type: string
		options: Array<{
			label: string
			value: string
		}>
	}
	prefixName?: string
	serviceConfig: object
}

const MultipleValuesInput = ({
	inputConfig: { label, name, required, type, options, default_value },
	prefixName,
	serviceConfig,
}: IMultipleValuesInput) => {
	const { register, errors, trigger, control, watch } = useFormContext()
	const watchAllFields = watch()

	const fieldName = prefixName ? `${prefixName}.${name}` : name
	const error =
		errors && prefixName
			? errors[prefixName] && errors[prefixName][name]
			: errors[name]

	const isRequired = required ? JSON.parse(required) : false

	useEffect(() => {
		trigger(fieldName)
	}, [])

	return (
		<Form.Row className="mb-3">
			<Col xs={3} className={styles.action__nameSelect}>
				{label}
			</Col>
			<Col>
				{type === 'select' && (
					<>
						<Form.Control
							as="select"
							ref={register({
								required: {
									value: isRequired,
									message: `Vui lòng điền ${label.toLocaleLowerCase()}`,
								},
							})}
							name={fieldName}
							isInvalid={!!error}
							defaultValue={default_value}
						>
							{options.map(option => (
								<option value={option.value}>{option.label}</option>
							))}
						</Form.Control>
						{!!error && (
							<FormControl.Feedback type="invalid">
								{error.message}
							</FormControl.Feedback>
						)}
					</>
				)}
				{(type === 'radio' || type === 'checkbox') && (
					<>
						{options.map(option => (
							<Form.Check
								type={type}
								label={option.label}
								value={option.value}
								ref={register({
									required: {
										value: isRequired,
										message: `Vui lòng điền ${label.toLocaleLowerCase()}`,
									},
								})}
								name={fieldName}
								isInvalid={!!error}
								defaultChecked={default_value === option.value}
							/>
						))}
						{!!error && (
							<FormControl.Feedback type="invalid">
								{error.message}
							</FormControl.Feedback>
						)}
					</>
				)}
				{type === 'button_select' && (
					<Form.Group>
						<Row noGutters>
							{options.map(({ label, value }) => (
								<Controller
									name={fieldName}
									control={control}
									defaultValue={default_value}
									rules={{
										required: {
											value: isRequired,
											message: `Vui lòng chọn ${label?.toLocaleLowerCase()}`,
										},
									}}
									render={props => (
										<Col xs={6} sm={4} md={3}>
											<Button
												variant={
													watchAllFields[fieldName] == value
														? 'primary'
														: 'outline-primary'
												}
												onClick={() => props.onChange(value)}
											>
												{label}
											</Button>
										</Col>
									)}
								/>
							))}
						</Row>
						{!!error && (
							<div
								style={{
									color: '#dc3545',
									marginTop: '.25rem',
									fontSize: '80%',
									width: '100%',
								}}
							>
								{error.message}
							</div>
						)}
					</Form.Group>
				)}
				{type === 'icon_select' && (
					<Form.Group>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
							}}
						>
							{options.map(({ label, value }) => (
								<Controller
									name={fieldName}
									control={control}
									defaultValue={default_value}
									rules={{
										required: {
											value: isRequired,
											message: `Vui lòng chọn ${label?.toLocaleLowerCase()}`,
										},
									}}
									render={props => (
										<Image
											src={label}
											onClick={() => props.onChange(value)}
											className={styles.icon}
											roundedCircle
											style={
												watchAllFields[fieldName] == value
													? {
															border: '3px solid #2cbee0',
															borderRadius: '25px',
															marginBottom: '10px',
													  }
													: {}
											}
											onDragStart={e => e.preventDefault()}
											draggable={false}
										/>
									)}
								/>
							))}
						</div>
						{!!error && (
							<div
								style={{
									color: '#dc3545',
									marginTop: '.25rem',
									fontSize: '80%',
									width: '100%',
								}}
							>
								{error.message}
							</div>
						)}
					</Form.Group>
				)}
			</Col>
		</Form.Row>
	)
}

export default MultipleValuesInput
