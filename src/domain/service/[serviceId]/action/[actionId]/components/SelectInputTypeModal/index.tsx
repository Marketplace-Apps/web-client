import ModalHeader from 'components/ModalHeader'
import React from 'react'
import {Col, Modal, ModalBody, Row} from 'react-bootstrap'
import InputType from '../InputType'
import styles from './index.module.scss'

interface ISelectInputTypeModalProps {
	show: boolean
	onHide: () => void
	onSelect: (type: string) => void
}

const INPUT_TYPES: Array<{
	icon: string
	name: string
}> = [
		{
			icon: "/images/iconBlock1.png",
			name: "radio"
		},
		{
			icon: "/images/iconBlock2.png",
			name: "checkbox"
		},
		{
			icon: "/images/iconBlock3.png",
			name: "select"
		},
		{
			icon: "/images/iconBlock5.png",
			name: "number"
		},
		{
			icon: "/images/iconBlock6.png",
			name: "text"
		},
		{
			icon: "/images/iconBlock7.png",
			name: "alert"
		},
	]

const SelectInputTypeModal = ({
	onHide,
	show,
	onSelect
}: ISelectInputTypeModalProps) => {
	return (
		<Modal
			size="lg"
			show={show}
			onHide={onHide}
			keyboard={false}
			centered
		>
			<div className={styles.PopupAddAction}>
				<ModalHeader
					title="Thêm input"
					onClose={onHide}
				/>
				<ModalBody>
					<Row>
						{
							INPUT_TYPES.map(inputType => (
								<Col
									xs={4}
									sm={3}
									className="d-flex justify-content-center mb-3"
								>
									<InputType
										{...inputType}
										onSelect={onSelect}
									/>
								</Col>
							))
						}
					</Row>
				</ModalBody>
			</div>
		</Modal>
	)
}

export default SelectInputTypeModal
