import CustomButton from 'components/CustomButton'
import ModalHeader from 'components/ModalHeader'
import React, {useState} from 'react'
import {Button, Form, Modal, ModalBody} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {UserDocument} from 'types/firebase'

interface TransferMoneyModalProps {
	show: boolean
	onHide: () => void
	data: UserDocument
}

const TransferMoneyModal = ({
	onHide,
	show,
	data: {
		id,
		name,
		balance
	}
}: TransferMoneyModalProps) => {

	const {
		register,
		handleSubmit,
		errors,
		reset
	} = useForm<{
		amount: number
	}>()

	const [isTransferingMoney, setIsTransferingMoney] = useState<boolean>(false)

	const onSubmit = handleSubmit(async ({amount}) => {
		setIsTransferingMoney(true)
		try {
			toast.success("Chuyển tiền thành công", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsTransferingMoney(false)
	})

	return (
		<Modal
			show={show}
			onHide={onHide}
			keyboard={false}
			animation={false}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<ModalHeader
				onClose={onHide}
				title={`Chuyển tiền cho ${name}`}
			/>
			<Form
				onSubmit={onSubmit}
			>
				<ModalBody
					style={{
						padding: "30px"
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							color: "#2D7AC0",
							fontWeight: "bold"
						}}
					>
						<p>Số tiền hiện tại</p>
						<p>
							{
								balance.toLocaleString()
							}
						</p>
					</div>
					<Form.Group>
						<Form.Control
							type="number"
							placeholder="Số tiền nạp thêm "
							name="bank_number"
							style={{
								borderRadius: "20px"
							}}
							autoComplete="off"
						/>
					</Form.Group>
					<div
						style={{
							display: "flex",
							justifyContent: "center"
						}}
					>
						<CustomButton
							isLoading={isTransferingMoney}
							style={{padding: '5px 25px', fontWeight: 'bold', borderRadius: "20px"}}
							variant="outline-primary"
							className="mr-3"
							type="submit"
							loadingText="Đang gửi"
						>
							Gửi tiền
						</CustomButton>
						<Button
							style={{padding: '5px 25px', fontWeight: 'bold', borderRadius: "20px", color: "red"}}
							variant="outline-primary"
							onClick={onHide}
						>
							Đóng
						</Button>
					</div>
				</ModalBody>
			</Form>
		</Modal>
	)
}

export default TransferMoneyModal
