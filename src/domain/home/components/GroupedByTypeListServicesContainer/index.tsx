import React from 'react'
import {Container} from 'react-bootstrap'
import styles from '../index.module.scss'

const GroupedByTypeListServicesContainer = (props: {children: any}) => {
	return (
		<div className={styles.service}>
			<Container>
				{
					props.children
				}
			</Container>
		</div>
	)
}

export default GroupedByTypeListServicesContainer