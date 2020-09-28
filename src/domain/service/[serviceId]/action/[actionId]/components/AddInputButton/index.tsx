import React from 'react'
import {Button} from 'react-bootstrap'
import {FaPlus} from 'react-icons/fa'

const AddInputButton = (props: {onClick: () => void}) => (
	<div className="text-center mb-4">
		<Button
			onClick={props.onClick}
		>
			<FaPlus />
			Thêm input
		</Button>
	</div>
)

export default AddInputButton