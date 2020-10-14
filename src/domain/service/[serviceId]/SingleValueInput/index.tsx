import React, { useEffect, useState } from 'react'
import { Col, Form, FormControl } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { compileJavascriptCode } from '../../../../helpers'
import styles from './index.module.scss'

interface ISingleValueInputProps {
	inputConfig: {
		label: string
		name: string
		required: string
		type: string
		placeholder?: string
		default_value?: any
		value?: any
	}
	prefixName?: string
	serviceConfig: object
}

const SingleValueInput = ({
	inputConfig: {
		label,
		name,
		required,
		type,
		placeholder,
		default_value,
		value,
	},
	prefixName,
	serviceConfig,
}: ISingleValueInputProps) => {
	const { register, errors, watch } = useFormContext()
	const watchAllFields = watch()

	const fieldName = prefixName ? `${prefixName}.${name}` : name
	const error =
		errors && prefixName
			? errors[prefixName] && errors[prefixName][name]
			: errors[name]

	const isRequired = required ? JSON.parse(required) : false

	const [defaultValue, setDefaultValue] = useState<any | null>(null)

	useEffect(() => {
		default_value &&
			setDefaultValue(
				compileJavascriptCode(default_value, {
					config: serviceConfig,
					...watchAllFields,
				}),
			)
	}, [watchAllFields])

	return (
		<Form.Row className="mb-3">
			<Col xs={3} className={styles.action__nameSelect}>
				{label}
			</Col>
			<Col>
				{type === 'textarea' && (
					<Form.Control
						ref={register({
							required: {
								value: isRequired,
								message: `Vui lòng điền ${label.toLocaleLowerCase()}`,
							},
						})}
						name={fieldName}
						as="textarea"
						rows={5}
						placeholder={placeholder}
						isInvalid={!!error}
						defaultValue={defaultValue}
					/>
				)}
				{type !== 'textarea' && type !== 'hidden' && (
					<Form.Control
						ref={register({
							required: {
								value: isRequired,
								message: `Vui lòng điền ${label?.toLocaleLowerCase()}`,
							},
						})}
						name={fieldName}
						type={type}
						placeholder={placeholder}
						isInvalid={!!error}
						defaultValue={defaultValue}
					/>
				)}
				{!!error && (
					<FormControl.Feedback type="invalid">
						{error.message}
					</FormControl.Feedback>
				)}
				{type === 'hidden' && (
					<Form.Control
						ref={register}
						name={fieldName}
						type="hidden"
						value={value}
					/>
				)}
			</Col>
		</Form.Row>
	)
}

export default SingleValueInput
