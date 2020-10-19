import React from 'react'
import AdvancedOption from '../AdvancedOption'

const AdvancedOptions = (props: {
	data: Array<{
		id: string
		label: string
		form: any
	}>
	serviceConfig: object
}) => {
	const { data, serviceConfig } = props
	return (
		<>
			{data.map(advancedOption => (
				<AdvancedOption data={advancedOption} serviceConfig={serviceConfig} />
			))}
		</>
	)
}

export default AdvancedOptions
