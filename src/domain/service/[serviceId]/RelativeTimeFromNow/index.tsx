import React from 'react'
import { Image } from 'react-bootstrap'

type RelativeTimeFromNowProps = {
	day: string
}

const RelativeTimeFromNow = ({ day }: RelativeTimeFromNowProps) => {
	return (
		<h2
			className="pageFiles_content__day"
			style={{
				fontSize: '1rem',
				lineHeight: '1.2rem',
				marginBottom: '1rem',
				color: '#71a7f9',
			}}
		>
			<Image
				className="pageFiles_content__img mr-2"
				src="/images/calendar.png"
				fluid
			/>
			{day}
		</h2>
	)
}

export default RelativeTimeFromNow
