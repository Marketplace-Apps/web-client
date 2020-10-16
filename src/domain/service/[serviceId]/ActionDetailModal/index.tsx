import CustomButton from 'components/CustomButton'
import ModalHeader from 'components/ModalHeader'
import { auth } from 'firebase/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Col, Form, Modal } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { ServiceActionDocument } from 'types/firebase'
import useFetch, { CachePolicies } from 'use-http'
import { compileJavascriptCode } from '../../../../helpers'
import AdvancedOptions from '../AdvancedOptions'
import AlertBox from '../AlertBox'
import GenericInput from '../GenericInput'
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
	serviceMinPrice,
}: IActionDetailModalProps) => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const methods = useForm()
	const watchAllFields = methods.watch()

	const form = data.form
	const actionId = data.id
	const advancedOptions = data.advanced_options
	const priceFunction = data.price_function

	const [totalBill, setTotalBill] = useState<any>(0)

	const { post, response, loading, error } = useFetch<boolean>(
		'http://localhost:8080/orders',
		{
			interceptors: {
				request: async ({ options, url, path, route }) => {
					const idToken = await auth().currentUser.getIdToken()
					// @ts-ignore
					options.headers.authorization = idToken
					return options
				},
			},
			cachePolicy: CachePolicies.NO_CACHE,
		},
	)

	useEffect(() => {
		setTotalBill(
			compileJavascriptCode(priceFunction, {
				...watchAllFields,
				min_price: serviceMinPrice,
				MIN_PRICE: serviceMinPrice,
				mp: serviceMinPrice,
				MP: serviceMinPrice,
				...(data.config || {}),
			}) || 0,
		)
	}, [watchAllFields])

	const onSubmit = methods.handleSubmit(async data => {
		try {
			const bodyData = {
				data,
				service_id: serviceId,
				action_id: actionId,
				domain_id: localStorage.getItem('domain_id'),
			}
			await post(bodyData)
			if (response.ok) {
				onHide()
			} else {
				const result = await response.json()
				console.log({ error: result.message })
			}
		} catch (error) {
			console.log({ error })
		}
	})

	return (
		<Modal show={show} onHide={onHide} size="lg" keyboard={false}>
			<div className={styles.action}>
				<ModalHeader onClose={onHide} title={data.name} />
				<FormProvider {...methods}>
					<Form onSubmit={onSubmit}>
						<div className={styles.action__des}>
							<Form.Group>
								{form &&
									form.map((item: any) => (
										<>
											{item.type === 'alert' && (
												<AlertBox
													content={item.content}
													level={item.level}
													visible={item.visible}
													config={data.config || {}}
												/>
											)}
											{item.type !== 'alert' && (
												<GenericInput
													inputConfig={item}
													serviceConfig={data.config || {}}
												/>
											)}
										</>
									))}
								{advancedOptions && (
									<AdvancedOptions
										data={advancedOptions}
										serviceConfig={data.config || {}}
									/>
								)}
							</Form.Group>
							<div
								style={{
									border: '1px dashed black',
									padding: 10,
									margin: 15,
								}}
							>
								<Form.Row className="mb-3">
									<Col xs={3} className={styles.action__nameSelect}>
										Tổng tiền
									</Col>
									<Col>
										<Form.Control readOnly value={totalBill.toLocaleString()} />
									</Col>
								</Form.Row>
							</div>
							<div className="text-center">
								<CustomButton
									style={{ backgroundColor: '#66C8FF', color: '#fff' }}
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
