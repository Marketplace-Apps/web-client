import CustomButton from 'components/CustomButton'
import ModalHeader from 'components/ModalHeader'
import {firestore} from 'firebase/app'
import React, {useState} from 'react'
import {Alert, Form, Modal} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {PaymentMethodDocument} from 'types/firebase'
import {omit} from '../../../../helpers'
import styles from './index.module.scss'

const BANKS = [
	{
		name: "Momo",
		value: "momo",
		logo_url: "https://static.mservice.io/img/logo-momo.png"
	},
	{
		name: "Vietcombank",
		value: "vietcombank",
		logo_url: "https://seeklogo.net/wp-content/uploads/2016/07/vietcombank-vector-logo.png"
	},
	{
		name: "BIDV",
		value: "bidv",
		logo_url: "https://miro.medium.com/max/946/0*J6yh-HoTsVGv5ayw.png"
	}
]

type CreateUpdatePaymentMethodModalProps = {
	show: boolean
	onHide: () => void
	data: PaymentMethodDocument | null
	domainId: string
}

const CreateUpdatePaymentMethodModal = ({
	show,
	onHide,
	data,
	domainId
}: CreateUpdatePaymentMethodModalProps) => {

	const {
		register,
		handleSubmit,
		errors,
		reset,
		watch
	} = useForm<{
		type: string
		logo_url: string
		bank_number: string
		owner_name: string
		credential?: string,
		is_auto: boolean
	}>()

	const isAuto = watch("is_auto", false)

	console.log({credential: data?.credential, isAuto})

	const [isSavingPaymentMethod, setIsSavingPaymentMethod] = useState<boolean>(false)

	const onSubmit = handleSubmit(async formData => {
		setIsSavingPaymentMethod(true)
		try
		{
			const paymentMethod = {
				...omit(formData, ["is_auto"]),
				logo_url: BANKS.find(bank => bank.value === formData.type).logo_url
			}
			if (!data)
			{
				const paymentMethodId = firestore().collection('domains').doc(domainId).collection('payment_methods').doc().id
				await firestore().collection('domains').doc(domainId).collection('payment_methods').doc(paymentMethodId).set({
					...paymentMethod,
					id: paymentMethodId,
				})
			}
			else await firestore().collection('domains').doc(domainId).collection('payment_methods').doc(data.id).update(paymentMethod)
			toast.success("Lưu thông tin thành công", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
			onHide()
		} catch (error)
		{
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSavingPaymentMethod(false)
	})

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
				<Form
					onSubmit={onSubmit}
				>
					<div className={styles.PopupAddVoucher__content}>
						<div className={styles.PopupAddVoucher__active}>
							<Form.Check
								defaultChecked={data?.active ?? true}
								type="switch"
								id="custom-switch"
								className={styles.PopupAddVoucher__label}
								label="Kích hoạt"
								name="active"
								ref={register}
							/>
						</div>
						<Form>
							<Form.Group>
								<Form.Control
									as="select"
									custom
									name="type"
									ref={register}
									defaultValue={data?.type}
								>
									{
										BANKS.map(bank => (
											<option
												value={bank.value}
											>
												{bank.name}
											</option>
										))
									}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Số tài khoản/số thẻ"
									defaultValue={data?.bank_number}
									name="bank_number"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền số tài khoản/số thẻ"
										}
									})}
								/>
								{
									errors.bank_number && (
										<Alert className="mt-1" variant="warning">
											{errors.bank_number.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Tên chủ tài khoản"
									defaultValue={data?.owner_name}
									name="owner_name"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền tên chủ tài khoản"
										}
									})}
								/>
								{
									errors.owner_name && (
										<Alert className="mt-1" variant="warning">
											{errors.owner_name.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Check
								type="checkbox"
								label="Nạp tự động"
								className="mb-3"
								defaultChecked={!!data?.credential}
								name="is_auto"
								ref={register}
							/>
							{
								(!!data?.credential || isAuto) && (
									<Form.Group>
										<Form.Control
											type="text"
											placeholder="API Key/Cookie"
											defaultValue={data?.credential}
											name="credential"
											ref={register({
												required: {
													value: true,
													message: "Vui lòng điền API Key/Cookie"
												}
											})}
										/>
										{
											errors.credential && (
												<Alert className="mt-1" variant="warning">
													{errors.credential.message}
												</Alert>
											)
										}
									</Form.Group>
								)
							}
							<div className="text-center mt-5">
								<CustomButton
									style={{padding: '5px 25px'}}
									variant="outline-primary"
									type="submit"
									loadingText="Đang lưu"
									isLoading={isSavingPaymentMethod}
								>
									Lưu
							</CustomButton>
							</div>
						</Form>
					</div>
				</Form>
			</div>
		</Modal>
	)
}

export default CreateUpdatePaymentMethodModal
