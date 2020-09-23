import React from 'react'
import {Button, Col, Form, Modal, Row} from 'react-bootstrap'
import ModalHeader from '../../../components/ModalHeader'
import styles from './index.module.scss'

type CreateUpdateVoucherModalProps = {
	show: boolean
	onClose: () => void
	title: string
}

const CreateUpdateVoucherModal = ({
	show,
	onClose,
	title
}: CreateUpdateVoucherModalProps) => {
	return (
		<Modal
			size="lg"
			show={show}
			onHide={onClose}
			keyboard={false}
		>
			<div className={styles.PopupAddVoucher}>
				<ModalHeader
					onClose={onClose}
					title={title}
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
							<Form.Control type="text" placeholder="Mã voucher ..." />
						</Form.Group>
						<Form.Group>
							<Form.Control type="text" placeholder="Số lượng ..." />
						</Form.Group>
						<Form.Group>
							<Form.Control as="select">
								<option disabled>Dịch vụ được áp dụng</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Control type="text" placeholder="Giảm giá tối đa ..." />
						</Form.Group>
						<Form.Group>
							<Form.Control as="select">
								<option disabled>% giảm giá</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Control type="date" placeholder="Ngày mở voucher" />
						</Form.Group>
						<Form.Group>
							<Form.Control type="date" placeholder="Ngày đóng voucher" />
						</Form.Group>
						<h2
							style={{color: '#918A8A', fontSize: '1.2rem'}}
							className="mt-4 mb-4 text-center"
						>
							Khoảng tiền đơn hàng đủ điều kiện nhận voucher
						</h2>
						<Form.Group as={Row} controlId="formPlaintextPassword">
							<Col sm="6">
								<Form.Control
									className={styles.PopupAddVoucher__text}
									type="text"
									placeholder="Min price"
								/>
							</Col>

							<Col sm="6">
								<Form.Control
									className={styles.PopupAddVoucher__text}
									type="text"
									placeholder="Max price"
								/>
							</Col>
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

export default CreateUpdateVoucherModal
