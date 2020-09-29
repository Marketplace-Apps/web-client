import EditableContent from 'components/EditableContent'
import React, {useState} from 'react'
import {Col, Form, Image, Row} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'
import styles from './index.module.scss'

export interface ISingleValueInputProps {
	data: {
		type: string,
		name: string
		label: string
		required: boolean
		placeholder?: string
	}
	onRemove: () => void
	baseName: string,
}

const SingleValueInput = ({
	data: {
		type,
		name,
		label,
		required,
		placeholder,
	},
	onRemove,
	baseName,
}: ISingleValueInputProps) => {
	const methods = useFormContext()
	const [currnentRequired, setCurrentRequired] = useState<boolean>(required)

	return (
		<Form.Group className={styles.PopupAddAction__FormGroup} as={Row}>
			<Form.Label
				column
				sm="2"
				className={styles.PopupAddAction__label}
			>
				<div className={styles.PopupAddAction__label__text}>
					{type}
				</div>
			</Form.Label>
			<Form.Control
				type="hidden"
				name={`${baseName}.type`}
				defaultValue={type}
				ref={methods.register}
			/>
			<Form.Control
				type="hidden"
				name={`${baseName}.required`}
				defaultValue={currnentRequired.toString()}
				ref={methods.register}
			/>
			<Col sm="9">
				<div className="mb-1">
					<Form.Label
						className={styles.PopupAddAction__label1 + ' mr-5 mb-2'}
						column
						sm="3"
					>
						<EditableContent
							value={label}
							name={`${baseName}.label`}
						/>
					</Form.Label>
					<Form.Label
						className={styles.PopupAddAction__label2 + ' mr-4 mb-2'}
						column
						sm="3"
					>
						<EditableContent
							value={name}
							name={`${baseName}.name`}
						/>
					</Form.Label>
					<Form.Label
						className={currnentRequired ? styles.PopupAddAction__label3 : styles.PopupAddAction__label4 + ' mb-2'}
						column
						sm="3"
						style={{cursor: "pointer"}}
						onClick={() => setCurrentRequired(!currnentRequired)}
					>
						{currnentRequired ? "required" : "optional"}
					</Form.Label>
				</div>
				<Form.Control
					className="mb-2"
					type="text"
					defaultValue={placeholder}
					placeholder="Điền placeholder của input"
					name={`${baseName}.placeholder`}
					ref={methods.register}
				/>
			</Col>
			<Col sm="1" className={styles.PopupAddAction__iconRemove}>
				<Image
					style={{cursor: "pointer"}}
					className={styles.PopupAddAction__close}
					src="/images/remove.png"
					onClick={onRemove}
				/>
			</Col>
		</Form.Group>
	)
}

export default SingleValueInput
