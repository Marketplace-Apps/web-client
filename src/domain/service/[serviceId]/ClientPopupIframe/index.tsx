import React from 'react'
import { Modal } from 'react-bootstrap'
import styles from './index.module.scss'

type ClientPopupIframeProps = {
	show: boolean
	onHide: () => void
	url: string
	name: string
}

const ClientPopupIframe = ({
	show,
	onHide,
	url,
	name,
}: ClientPopupIframeProps) => {
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			dialogClassName={styles.custom_dialog}
			scrollable
		>
			<Modal.Header closeButton>
				<Modal.Title>{name}</Modal.Title>
			</Modal.Header>
			<Modal.Body
				style={{
					height: '100%',
					overflowY: 'hidden',
				}}
			>
				<iframe
					src={url}
					className={styles.iframe}
					style={{
						height: '100%',
						width: '100%',
						border: 'none',
					}}
				/>
			</Modal.Body>
		</Modal>
	)
}

export default ClientPopupIframe
