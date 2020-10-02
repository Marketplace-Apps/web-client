import React from 'react'
import {Col, Form, FormControl} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'
import styles from './index.module.scss'

interface ISingleValueInputProps {
	label: string
	name: string
	required: string
	type: string
	placeholder?: string
	prefixName?: string
}

const SingleValueInput = ({
	label,
	name,
	required,
	type,
	placeholder,
	prefixName
}: ISingleValueInputProps) => {

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
				<Form.Control
					ref={register({
						required: {
							value: JSON.parse(required),
							message: `Vui lòng điền ${label.toLocaleLowerCase()}`
						}
					})}
					name={fieldName}
					type={type}
					placeholder={placeholder}
					isInvalid={!!error}
				/>
				{
					!!error && (
						<FormControl.Feedback type="invalid">
							{
								error.message
							}
						</FormControl.Feedback>
					)
				}
			</Col>
		</Form.Row>
	)
}

export default SingleValueInput