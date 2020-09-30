import CenteredSpinner from 'components/CenteredSpinner'
import CustomButton from 'components/CustomButton'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import Error from 'next/error'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Alert, Form, Image} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {DomainDocument, DomainServiceDocument} from 'types/firebase'
import {SERVICE_TAGS} from '../../../../../constants'
import styles from './index.module.scss'

const ServiceActionGeneralSettingsPage = () => {

	const router = useRouter()
	const {domainId, serviceId} = router.query as {domainId: string, serviceId: string}

	const [service, loadingService, error] = useDocumentData<DomainServiceDocument>(
		firestore().collection('domains').doc(domainId).collection('services').doc(serviceId)
	)

	const [domain, loadingDomain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	const [isExecuting, setIsExecuting] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		errors,
		reset
	} = useForm<{
		icon: string
		min_price: number
		name: string
		tag: string
	}>()

	const onSubmit = handleSubmit(async data => {
		setIsExecuting(true)
		try
		{
			await firestore().collection('domains').doc(domainId).collection('services').doc(serviceId).update({
				...data,
				published: true
			})
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
		setIsExecuting(false)
	})

	return (
		<MainLayout
			title="Cài đặt chung"
		>
			{
				(loadingService || loadingDomain) && <CenteredSpinner />
			}
			{
				(!domain && !loadingDomain) || (!service && !loadingService) && <Error statusCode={400} title="Không tồn tại dịch vụ này" />
			}
			{
				domain && service && (
					<ServiceDetailContainer>
						<div className={styles.ServiceManager_id}>
							<div className={styles.ServiceManager_id__text}>ID dịch vụ</div>
							<div className={styles.ServiceManager_id__id}>
								{serviceId}
								<Image className="ml-3" src="/images/iconCopy.png" fluid />
							</div>
						</div>

						<Form
							className={styles.ServiceManager__form}
							onSubmit={onSubmit}
						>
							<Form.Group>
								<Form.Control
									isInvalid={!!errors.name}
									type="text"
									placeholder="Tên dịch vụ"
									defaultValue={service?.name}
									name="name"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền tên dịch vụ"
										}
									})}
									autoComplete="off"
								/>
								{
									errors.name && (
										<Alert className="mt-1" variant="warning">
											{errors.name.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									isInvalid={!!errors.icon}
									type="text"
									placeholder="Icon"
									defaultValue={service?.icon}
									name="icon"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền đường dẫn icon"
										}
									})}
									autoComplete="off"
								/>
								{
									errors.icon && (
										<Alert className="mt-1" variant="warning">
											{errors.icon.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									isInvalid={!!errors.min_price}
									type="number"
									placeholder="Giá hiển thị"
									defaultValue={service?.min_price}
									name="min_price"
									ref={register({
										required: {
											value: true,
											message: "Vui lòng điền giá hiển thị"
										}
									})}
								/>
								{
									errors.min_price && (
										<Alert className="mt-1" variant="warning">
											{errors.min_price.message}
										</Alert>
									)
								}
							</Form.Group>
							<Form.Group>
								<Form.Control
									isInvalid={!!errors.tag}
									as="select"
									custom
									name="tag"
									defaultValue={service?.tag}
									ref={register({
										required: {
											value: true,
											message: "Vui lòng chọn tag"
										}
									})}
								>
									{
										SERVICE_TAGS.map(tag => (
											<option
												value={tag.value}
											>
												{
													tag.name
												}
											</option>
										))
									}
								</Form.Control>
								{
									errors.tag && (
										<Alert className="mt-1" variant="warning">
											{errors.tag.message}
										</Alert>
									)
								}
							</Form.Group>
							<div className="text-center">
								<CustomButton
									isLoading={isExecuting}
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

export default ServiceActionGeneralSettingsPage
