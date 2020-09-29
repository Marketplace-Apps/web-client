import React, {useState} from 'react'
import {Col, Form, Image, Row} from 'react-bootstrap'
import {useFieldArray, useFormContext} from "react-hook-form"
import EditableContent from '../../../../../../../components/EditableContent'
import styles from './index.module.scss'

export interface IMultipleValuesInputProps {
	data: {
		type: string,
		name: string
		label: string
		required: boolean
	}
	onRemove: () => void
	baseName: string,
}

const MultipleValuesInput = ({
	data: {
		type,
		name,
		label,
		required,
	},
	onRemove,
	baseName,
}: IMultipleValuesInputProps) => {
	const methods = useFormContext()

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: `${baseName}.options`,
	})

	const [currnentRequired, setCurrentRequired] = useState<boolean>(required)

	return (
		<Form.Group
			className={styles.PopupAddAction__FormGroup}
			as={Row}
		>
			<Form.Label column sm="2" className={styles.PopupAddAction__label}>
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
				<div className="mb-3">
					<Form.Label
						className={styles.PopupAddAction__label1}
						column
						sm="4"
					>
						<EditableContent
							name={`${baseName}.label`}
							value={label}
						/>
					</Form.Label>
					<Form.Label
						className={styles.PopupAddAction__label2 + ' mr-4'}
						column
						sm="3"
					>
						<EditableContent
							name={`${baseName}.name`}
							value={name}
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
				{
					fields.map((item, index) => (
						<Row className="mb-3">
							<Col sm={5}>
								<Form.Control
									type="text"
									placeholder="Giá trị"
									name={`${baseName}["options"][${index}].value`}
									ref={methods.register}
									defaultValue={item.value}
								/>
							</Col>
							<Col sm={5}>
								<Form.Control
									type="text"
									placeholder="Giá trị hiển thị"
									name={`${baseName}["options"][${index}].label`}
									ref={methods.register}
									defaultValue={item.label}
								/>
							</Col>
							<Col sm={2} className={styles.PopupAddAction__iconRemove}>
								<Image
									style={{cursor: "pointer"}}
									className={styles.PopupAddAction__close}
									src="/images/remove.png"
									onClick={() => remove(index)}
								/>
							</Col>
						</Row>
					))
				}
				<Row>
					<Col sm={{span: 1, offset: 4}}>
						<Image
							style={{cursor: "pointer", marginLeft: '1rem'}}
							className={styles.PopupAddAction__close}
							src="/images/addplus.png"
							onClick={() => append({
								value: 0,
								label: '0 minute'
							})}
						/>
					</Col>
				</Row>
			</Col>
			<Col sm={1} className={styles.PopupAddAction__iconRemove}>
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

export default MultipleValuesInput
