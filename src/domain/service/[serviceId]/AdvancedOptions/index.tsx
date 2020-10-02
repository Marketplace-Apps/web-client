import React from 'react'
import AdvancedOption from '../AdvancedOption'

const AdvancedOptions = (props: {
	data: Array<{
		id: string
		label: string
		form: any
	}>
}) => {
	const {data} = props
	return (
		<>
			{
				data.map(advancedOption => (
					<AdvancedOption {...advancedOption} />
				))
			}
		</>
	)

}

export default AdvancedOptions