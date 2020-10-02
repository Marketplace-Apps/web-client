import React from 'react'
import {ALERT, MULTIPLE_VALUES_INPUTS, SINGLE_VALUE_INPUTS} from '../../../../constants'
import AlertBox from '../AlertBox'
import MultipleValuesInput from '../MultipleValuesInput'
import SingleValueInput from '../SingleValueInput'

const CustomInput = (props: {
	config: any
	prefixName?: string
}) => {
	const {config, prefixName} = props

	return (
		<>
			{
				SINGLE_VALUE_INPUTS.includes(config.type) && <SingleValueInput {...config} prefixName={prefixName} />
			}
			{
				MULTIPLE_VALUES_INPUTS.includes(config.type) && <MultipleValuesInput {...config} prefixName={prefixName} />
			}
			{
				config.type === ALERT && <AlertBox type={config.level} content={config.content} />
			}
		</>
	)
}

export default CustomInput