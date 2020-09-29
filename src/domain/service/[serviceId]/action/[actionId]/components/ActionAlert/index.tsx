import EditableContent from 'components/EditableContent'
import React from 'react'
import {Form} from 'react-bootstrap'
import {useFormContext} from 'react-hook-form'
import {FaTrash} from 'react-icons/fa'
import styles from './index.module.scss'

interface IAlertProps {
	data: {
		level: string
		content: string
	}
	onRemove: () => void
	baseName: string,
}

const LEVELS = [
	{
		value: "error",
		displayText: "Error"
	},
	{
		value: "warning",
		displayText: "Warning"
	},
	{
		value: "info",
		displayText: "Info"
	},
	{
		value: "success",
		displayText: "Success"
	}
]

const ActionAlert = ({
	data: {
		content,
		level
	},
	baseName,
	onRemove
}: IAlertProps) => {
	const methods = useFormContext()

	return (
		<div className={styles.PopupAddAction__full}>
			<div className={styles.PopupAddAction__full__noti}>
				<Form.Control
					type="hidden"
					name={`${baseName}.type`}
					defaultValue="alert"
					ref={methods.register}
				/>
				<Form.Group controlId="exampleForm.SelectCustom">
					<Form.Label>Chọn loại thông báo</Form.Label>
					<Form.Control
						as="select"
						custom
						name={`${baseName}.level`}
						ref={methods.register}
						defaultValue={level}
					>
						{
							LEVELS.map(level => (
								<option
									value={level.value}
								>
									{
										level.displayText
									}
								</option>
							))
						}
					</Form.Control>
				</Form.Group>
			</div>
			<div className={styles.PopupAddAction__full__title}>
				<EditableContent
					name={`${baseName}.content`}
					value={content}
				/>
				<FaTrash
					onClick={onRemove}
					style={{cursor: "pointer", color: "red"}}
				/>
			</div>
		</div>
	)
}

export default ActionAlert