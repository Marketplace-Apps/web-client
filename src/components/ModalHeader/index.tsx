import React from 'react'
import {Image} from 'react-bootstrap'
import styles from './index.module.scss'

type ModalHeaderProps = {
	title: string
	hasCloseButton?: boolean
	onClose: () => void
}

const ModalHeader = ({
	hasCloseButton = true,
	onClose,
	title
}: ModalHeaderProps) => {
	return (
		<div className={styles.PopupAddAction__header}>
			<div className={styles.PopupAddAction__headerText}>
				{title}
			</div>
			{
				hasCloseButton && <Image
					onClick={onClose}
					style={{height: '20px'}}
					className={styles.PopupAddAction__close}
					src="/images/+.png"
				/>
			}
		</div>
	)
}

export default ModalHeader
