import React from 'react'
import {Image} from 'react-bootstrap'
import styles from './index.module.scss'

const InputType = (props: {
	icon: string
	name: string
	onSelect: (type: string) => void
}) => (
		<div
			className={styles.PopupAddAction__btnTextBlock}
			style={{
				cursor: "pointer"
			}}
			onClick={() => props.onSelect(props.name)}
		>
			<Image
				style={{height: '20px'}}
				className={styles.PopupAddAction__close + ' mr-1'}
				src={props.icon}
			/>
			{props.name}
		</div>
	)

export default InputType