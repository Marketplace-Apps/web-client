import CustomButton from 'components/CustomButton'
import ModalHeader from 'components/ModalHeader'
import React, {useEffect, useState} from 'react'
import {Col, Form, Modal} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {ServiceActionDocument} from 'types/firebase'
import {compileVtlString} from '../../../../helpers'
import AdvancedOptions from '../AdvancedOptions'
import CustomInput from '../CustomInput'
import styles from './index.module.scss'

interface IActionDetailModalProps {
	show: boolean
	onHide: () => void
	data: ServiceActionDocument
	serviceMinPrice: number
}

const ActionDetailModal = ({
	onHide,
	show,
	data,
	serviceMinPrice
}: IActionDetailModalProps) => {

	const methods = useForm()
	const watchAllFields = methods.watch()

	const form = data.form
	const advancedOptions = data.advanced_options
	const priceFunction = data.price_function

	const [totalBill, setTotalBill] = useState<any>(0)

	useEffect(() => {
		setTotalBill(compileVtlString(
			priceFunction,
			{
				...watchAllFields,
				min_price: serviceMinPrice,
				MIN_PRICE: serviceMinPrice,
				mp: serviceMinPrice,
				MP: serviceMinPrice
			}
		) || 0)
	}, [watchAllFields])

	const onSubmit = methods.handleSubmit(async data => {
		console.log(data)
	})

	return (
		<Modal show={show} onHide={onHide}>
			<div className={styles.action}>
				<ModalHeader
					onClose={onHide}
					title={data.name}
				/>
				<FormProvider {...methods}>
					<Form
						onSubmit={onSubmit}
					>
						<div className={styles.action__des}>
							<Form.Group>
								{
									form && form.map((config: any) => <CustomInput config={config} />)
								}
								{
									advancedOptions && <AdvancedOptions data={advancedOptions} />
								}
							</Form.Group>
							<div
								style={{
									border: "1px dashed black",
									padding: 10,
									margin: 15
								}}
							>
								<Form.Row
									className="mb-3"
								>
									<Col
										xs={3}
										className={styles.action__nameSelect}
									>
										Tổng tiền
									</Col>
									<Col>
										<Form.Control
											readOnly
											value={totalBill.toLocaleString()}
										/>
									</Col>
								</Form.Row>
							</div>
							<div className="text-center">
								<CustomButton
									style={{backgroundColor: '#66C8FF', color: '#fff'}}
									variant="outline-info"
									isLoading={false}
									loadingText="Đang thực hiện"
									type="submit"
								>
									Thực hiện
							</CustomButton>
							</div>
						</div>
					</Form>
				</FormProvider>
			</div>
		</Modal>
	)
}

export default ActionDetailModal