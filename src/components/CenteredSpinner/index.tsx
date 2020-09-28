import React from 'react'
import {Spinner} from 'react-bootstrap'

const CenteredSpinner = () => (
	<div className="text-center mt-2">
		<Spinner animation="border" variant="primary" />
	</div>
)

export default CenteredSpinner