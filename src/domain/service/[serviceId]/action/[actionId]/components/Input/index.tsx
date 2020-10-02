import React from 'react'
import MultipleValuesInput from '../MultipleValuesInput'
import SingleValueInput from '../SingleValueInput'

export enum INPUT_TYPES {
	TEXT = 'text',
	NUMBER = 'number',
	RADIO = 'radio',
	SELECT = 'select',
	VIDEO_INPUT = "video input",
	CHECKBOX = 'checkbox'
}

export const BASIC_INPUTS = [
	INPUT_TYPES.NUMBER,
	INPUT_TYPES.TEXT,
	INPUT_TYPES.CHECKBOX,
	INPUT_TYPES.RADIO,
	INPUT_TYPES.SELECT,
	INPUT_TYPES.VIDEO_INPUT
]
interface IInputProps {
	type: INPUT_TYPES
	data: {
		name: string
		label: string
		required: boolean
		placeholder?: string
	}
	onRemove: () => void
	baseName: string,
}

const Input = ({
	baseName,
	onRemove,
	data,
	type
}: IInputProps) => (
		<>
			{
				(type === INPUT_TYPES.RADIO || type === INPUT_TYPES.SELECT || type === INPUT_TYPES.CHECKBOX) && <MultipleValuesInput baseName={baseName} onRemove={onRemove} data={{...data, type}} />
			}
			{
				(type === INPUT_TYPES.TEXT || type === INPUT_TYPES.NUMBER || type === INPUT_TYPES.VIDEO_INPUT) && <SingleValueInput baseName={baseName} onRemove={onRemove} data={{...data, type}} />
			}
		</>
	)

export default Input