import React from 'react'
import {Button} from 'react-bootstrap'
import {FaPlus} from 'react-icons/fa'

const AddElementButton = (props: {onClick: () => void, text: string}) => (
	<div className="text-center mb-4 mt-3">
		<Button
			onClick={props.onClick}
		>
			<FaPlus />
			{props.text}
		</Button>
	</div>
)

export default AddElementButton