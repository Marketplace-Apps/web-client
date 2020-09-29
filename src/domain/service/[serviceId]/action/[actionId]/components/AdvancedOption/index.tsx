import EditableContent from 'components/EditableContent'
import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import {useFieldArray, useFormContext} from 'react-hook-form'
import {FaTrash} from 'react-icons/fa'
import ActionAlert from '../ActionAlert'
import AddElementButton from '../AddElementButton'
import Input, {BASIC_INPUTS} from '../Input'
import SelectInputTypeModal from '../SelectInputTypeModal'
import styles from './index.module.scss'

interface IAdvancedOptionProps {
	data: any
	baseName: string
	onRemove: () => void
}

const AdvancedOption = ({
	baseName,
	data,
	onRemove
}: IAdvancedOptionProps) => {

	const methods = useFormContext()

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: `${baseName}.form`
	})

	const [isShowSelectInputTypeModal, setIsShowSelectInputTypeModal] = useState<boolean>(false)
	const onShowSelectInputTypeModal = () => setIsShowSelectInputTypeModal(true)
	const onHideSelectInputTypeModal = () => setIsShowSelectInputTypeModal(false)

	const onSelectInputType = (type: string) => {
		if (type === "alert") append({
			type,
			content: "Nội dung của thông báo",
			level: "success"
		})
		else append({
			label: "Label",
			name: "Name",
			type,
			required: true,
		})
	}

	return (
		<div
			className={styles.PopupAddAction__OptionsAdvanced}
		>
			<SelectInputTypeModal
				onHide={onHideSelectInputTypeModal}
				show={isShowSelectInputTypeModal}
				onSelect={type => {
					onSelectInputType(type)
					onHideSelectInputTypeModal()
				}}
			/>
			<div
				className={styles.PopupAddAction__OptionsAdvanced__title}
			>
				<EditableContent
					name={`${baseName}.label`}
					value={data.label}
				/>
				<Button
					className={styles.PopupAddAction__OptionsAdvanced__btn}
					variant="primary"
				>
					<EditableContent
						name={`${baseName}.id`}
						value={data.id}
					/>
				</Button>
				<FaTrash
					color="red"
					onClick={onRemove}
					style={{cursor: "pointer"}}
				/>
				{
					!!fields.length && fields.map((item, index) => (
						<>
							{
								BASIC_INPUTS.includes(item.type) && (
									<Input
										type={item.type}
										data={{
											label: item.label,
											name: item.name,
											placeholder: item.placeholder,
											required: item.required,
										}}
										onRemove={() => remove(
											fields.findIndex(el => el.id === item.id)
										)}
										baseName={`${baseName}.form[${index}]`}
									/>
								)
							}
							{
								item.type === 'alert' && (
									<ActionAlert
										data={{
											level: item.level,
											content: item.content
										}}
										onRemove={() => remove(
											fields.findIndex(el => el.id === item.id)
										)}
										baseName={`${baseName}.form[${index}]`}
									/>
								)
							}
						</>
					))
				}
				<AddElementButton
					onClick={onShowSelectInputTypeModal}
					text="Thêm input"
				/>
			</div>
		</div>
	)
}

export default AdvancedOption