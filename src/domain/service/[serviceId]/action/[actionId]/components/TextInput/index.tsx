import React from 'react'
import {Col, Form, Image, Row} from 'react-bootstrap'
import {FaEdit} from 'react-icons/fa'
import styles from './index.module.scss'

export interface ITextInputProps {
	type: string
	name: string
	label: string
	required: boolean
	placeholder: string
	onRemove: () => void
	onUpdate: () => void
}

const TextInput = ({
	type,
	name,
	label,
	required,
	placeholder,
	onRemove,
	onUpdate
}: ITextInputProps) => {
	return (
		<Form.Group className={styles.PopupAddAction__FormGroup} as={Row}>
			<Form.Label column sm="2" className={styles.PopupAddAction__label}>
				<div className={styles.PopupAddAction__label__text}>
					{type}
				</div>
			</Form.Label>
			<Col sm="9">
				<div className="mb-1">
					<Form.Label
						className={styles.PopupAddAction__label1 + ' mr-5 mb-2'}
						column
						sm="3"
					>
						{label}
					</Form.Label>
					<Form.Label
						className={styles.PopupAddAction__label2 + ' mr-4 mb-2'}
						column
						sm="3"
					>
						{name}
					</Form.Label>
					<Form.Label
						className={styles.PopupAddAction__label3 + ' mb-2'}
						column
						sm="3"
					>
						{required ? "required" : "optional"}
					</Form.Label>
				</div>
				<Form.Control
					className="mb-2"
					type="text"
					defaultValue={placeholder}
					readOnly
				/>
			</Col>
			<Col sm="1" className={styles.PopupAddAction__iconRemove}>
				<div
					style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}
				>
					<FaEdit
						style={{marginBottom: 25, cursor: "pointer"}}
						color="blue"
						onClick={onUpdate}
					/>
					<Image
						style={{cursor: "pointer"}}
						className={styles.PopupAddAction__close}
						src="/images/remove.png"
						onClick={onRemove}
					/>
				</div>
			</Col>
		</Form.Group>
	)
}

export default TextInput
