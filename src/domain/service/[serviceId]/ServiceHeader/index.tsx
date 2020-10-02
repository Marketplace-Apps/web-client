import React from 'react'
import {Image} from 'react-bootstrap'

interface IServiceHeaderProps {
	icon: string
	name: string
}

const ServiceHeader = ({
	icon,
	name
}: IServiceHeaderProps) => (
		<>
			<div style={{fontSize: '1.5rem', padding: '2rem 2rem 1rem'}}>
				<Image
					src={icon}
					thumbnail
					width="50px"
				/>
				<span
					style={{marginLeft: '1rem', color: '#445C8C', fontSize: '1.4rem'}}
				>
					{name}
				</span>
			</div>
		</>
	)

export default ServiceHeader
