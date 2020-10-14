import React from 'react'
import {
	MULTIPLE_VALUES_INPUTS,
	SINGLE_VALUE_INPUTS,
} from '../../../../constants'
import MultipleValuesInput from '../MultipleValuesInput'
import SingleValueInput from '../SingleValueInput'

type GenericInputProps = {
	inputConfig: any
	prefixName?: string
	serviceConfig: object
}

const GenericInput = ({
	inputConfig,
	prefixName,
	serviceConfig,
}: GenericInputProps) => (
	<>
		{SINGLE_VALUE_INPUTS.includes(inputConfig.type) && (
			<SingleValueInput
				inputConfig={inputConfig}
				prefixName={prefixName}
				serviceConfig={serviceConfig}
			/>
		)}
		{MULTIPLE_VALUES_INPUTS.includes(inputConfig.type) && (
			<MultipleValuesInput
				inputConfig={inputConfig}
				prefixName={prefixName}
				serviceConfig={serviceConfig}
			/>
		)}
	</>
)
export default GenericInput
