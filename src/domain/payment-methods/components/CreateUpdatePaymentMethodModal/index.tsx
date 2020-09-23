import ModalHeader from 'components/ModalHeader'
import React from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import styles from './index.module.scss'

type CreateUpdatePaymentMethodModalProps = {
	show: boolean
	onHide: () => void
}

const CreateUpdatePaymentMethodModal = ({
	show,
	onHide
}: CreateUpdatePaymentMethodModalProps) => {
	return (
		<Modal
			size="lg"
			show={show}
			onHide={onHide}
			keyboard={false}
		>
			<div className={styles.PopupAddVoucher}>
				<ModalHeader
					onClose={onHide}
					title="Thêm phương thức thanh toán"
				/>
				<div className={styles.PopupAddVoucher__content}>
					<div className={styles.PopupAddVoucher__active}>
						<Form.Check
							checked
							type="switch"
							id="custom-switch"
							className={styles.PopupAddVoucher__label}
							label="Kích hoạt"
						/>
					</div>
					<Form>
						<Form.Group>
							<Form.Control type="text" placeholder="Tên phương thức ..." />
						</Form.Group>
						<Form.Group>
							<Form.Control type="text" placeholder="URL ảnh ..." />
						</Form.Group>

						<Form.Group>
							<Form.Control type="text" placeholder="Chủ tài khoản" />
						</Form.Group>
						<Form.Group>
							<Form.Control type="text" placeholder="Số tài khoản" />
						</Form.Group>

						<div className="text-center mt-5">
							<Button
								style={{padding: '5px 25px'}}
								variant="outline-primary"
								type="submit"
							>
								Lưu
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Modal>
	)
}

export default CreateUpdatePaymentMethodModal
