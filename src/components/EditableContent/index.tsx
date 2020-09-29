import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import {Controller, useFormContext} from "react-hook-form"

interface IEditableContentProps {
	value: any
	name: string
}

const EditableContent = ({
	value,
	name,
}: IEditableContentProps) => {
	const [isEditing, setEditing] = useState<boolean>(false)
	const [currentValue, setCurrentValue] = useState<any>(value)
	const methods = useFormContext()

	return (
		<>
			<Controller
				control={methods.control}
				name={name}
				render={props => (
					<>
						<Form.Control
							type={isEditing ? "text" : "hidden"}
							name={props.name}
							defaultValue={value}
							onBlur={e => {
								setCurrentValue(e.target.value)
								setEditing(false)
								props.onBlur()
							}}
							onChange={props.onChange}
						/>
					</>
				)}
			/>
			{
				!isEditing && (
					<p
						onClick={() => setEditing(true)}
					>
						{currentValue}
					</p>
				)
			}
		</>
	)
}

export default EditableContent