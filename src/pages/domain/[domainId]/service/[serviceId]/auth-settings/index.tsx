import CenteredSpinner from 'components/CenteredSpinner'
import CustomButton from 'components/CustomButton'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {auth, firestore} from 'firebase'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {Alert, Form} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {DomainDocument, DomainServiceDocument, ServiceConfigDocument} from 'types/firebase'
import {AUTH_METHODS} from '../../../../../../constants'
import styles from './index.module.scss'

const ServiceActionAuthSettingsPage = () => {
	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [serviceConfig, loadingServiceConfig] = useDocumentData<ServiceConfigDocument>(
		firestore().collection('services').doc(`${serviceId}_config`)
	)

	const [service, loadingService, error] = useDocumentData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId)
	)

	const [domain, loadingDomain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	const [isSavingAuthSettings, setIsSavingAuthSettings] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		errors,
		reset
	} = useForm<{
		method: string
		header_name: string
		header_value: string
	}>()

	const onSubmit = handleSubmit(async data => {
		setIsSavingAuthSettings(true)
		try
		{
			await firestore().collection('services').doc(`${serviceId}_config`).set(
				{
					auth: data,
					user_id: auth().currentUser.uid
				},
				{
					merge: true
				}
			)
			reset()
			toast.success("Lưu thành công", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		} catch (error)
		{
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSavingAuthSettings(false)
	})

	const [isAllowed, setIsAllowed] = useState<boolean>(false)

	useEffect(() => {
		if (!domain) return
		if (auth().currentUser.email === domain.owner) setIsAllowed(true)
		else router.push(
			'/domain/[domainId]/service/[serviceId]',
			`/domain/${domainId}/service/${serviceId}`
		)
	}, [domain])

	return (
		<MainLayout
			title="Cài đặt xác thực"
		>
			{
				(loadingServiceConfig || loadingDomain || loadingService) && <CenteredSpinner />
			}
			{
				(!domain && !loadingDomain) || (!service && !loadingService) && <Error statusCode={400} title="Không tồn tại dịch vụ này" />
			}
			{
				isAllowed && service && domain && (
					<ServiceDetailContainer>
						<Form
							className={styles.ServiceManager__form}
							onSubmit={onSubmit}
						>
							<Form.Group>
								<Form.Control
									isInvalid={!!errors.method}
									as="select"
									custom
									name="method"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng chọn phương thức xác thực"
										}
									})}
									defaultValue={serviceConfig?.auth?.method}
								>
									{
										AUTH_METHODS.map(method => (
											<option
												value={method.value}
											>
												{
													method.name
												}
											</option>
										))
									}
								</Form.Control>
								{
									errors.method && (
										<Alert className="mt-1" variant="warning">
											{errors.method.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Tên header"
									name="header_name"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền tên header"
										}
									})}
									defaultValue={serviceConfig?.auth?.header_name}
									isInvalid={!!errors.header_name}
									autoComplete="off"
								/>
								{
									errors.header_name && (
										<Alert className="mt-1" variant="warning">
											{errors.header_name.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									type="text"
									placeholder="Giá trị header"
									name="header_value"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng giá trị header"
										}
									})}
									defaultValue={serviceConfig?.auth?.header_value}
									isInvalid={!!errors.header_value}
									autoComplete="off"
								/>
								{
									errors.header_value && (
										<Alert className="mt-1" variant="warning">
											{errors.header_value.message}
										</Alert>
									)
								}
							</Form.Group>

							<div className="text-center">
								<CustomButton
									isLoading={isSavingAuthSettings}
									loadingText="Đang lưu"
									style={{
										backgroundColor: '#3EADFD',
										color: '#fff',
										padding: '5px 20px',
									}}
									variant="outline-info"
									type="submit"
								>
									Lưu
								</CustomButton>
							</div>
						</Form>
					</ServiceDetailContainer>
				)
			}
		</MainLayout>
	)
}

export default ServiceActionAuthSettingsPage
