import React from 'react'
import {Image} from 'react-bootstrap'

interface IServiceHeaderProps {
	iconUrl: string
	name: string
}

const GroupedByTypeListServicesHeader = ({iconUrl, name}: IServiceHeaderProps) => {
	return (
		<div
			className="service__title"
			style={{color: '#2E67D5', fontSize: '1rem'}}
		>
			<h1 className="mb-4">
				<Image className="mr-3" src={iconUrl} fluid />
				{name}
			</h1>
		</div>
	)
}

export default GroupedByTypeListServicesHeader