import React from 'react'
import {useFieldArray, useFormContext} from 'react-hook-form'
import {v4 as uuidV4} from 'uuid'
import AddElementButton from '../AddElementButton'
import AdvancedOption from '../AdvancedOption'

const AdvancedOptions = () => {

	const methods = useFormContext()

	const {fields, append, remove} = useFieldArray({
		control: methods.control,
		name: "advanced_options"
	})

	const onAddAvancedOption = () => append({
		id: uuidV4(),
		label: `Tùy chọn nâng cao ${fields.length + 1}`
	})

	return (
		<>
			{
				fields.map((item, index) => (
					<AdvancedOption
						data={item}
						baseName={`advanced_options[${index}]`}
						onRemove={() => remove(index)}
					/>
				))
			}
			<AddElementButton
				onClick={onAddAvancedOption}
				text="Thêm tùy chọn nâng cao"
			/>
		</>
	)
}

export default AdvancedOptions