import CustomButton from 'components/CustomButton'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Alert, Form} from 'react-bootstrap'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {DomainDocument} from 'types/firebase'
import styles from './index.module.scss'

const SiteSettingsPage = () => {
	const router = useRouter()
	const {domainId} = router.query as {domainId: string}

	const [domain] = useDocumentData<DomainDocument>(
		firestore().collection('domains').doc(domainId)
	)

	const [isUpdatingDomain, setIsUpdatingDomain] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		errors,
		reset
	} = useForm<{
		site_name: string
		logo_url: string
		background_color: string
		currency: string
	}>()

	const onSubmit = handleSubmit(async data => {
		setIsUpdatingDomain(true)
		try
		{
			await firestore().collection('domains').doc(domainId).update(data)
			toast.success("Cập nhật thông tin thành công", {
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
		setIsUpdatingDomain(false)
	})

	return (
		<MainLayout
			title="Cài đặt trang"
		>
			<div className={styles.SiteSettings}>
				<Form
					onSubmit={onSubmit}
					className={styles.SiteSettings__form}
				>
					<Form.Group className="mb-4">
						<Form.Label className={styles.SiteSettings__label}>
							Tên trang
						</Form.Label>
						<Form.Control
							type="text"
							name="site_name"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng điền tên trang"
								}
							})}
							defaultValue={domain?.site_name}
						/>
						{
							errors.site_name && (
								<Alert className="mt-1" variant="warning">
									{errors.site_name.message}
								</Alert>
							)
						}
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label className={styles.SiteSettings__label}>
							Logo
						</Form.Label>
						<Form.Control
							type="text"
							name="logo_url"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng điền đường dẫn logo trang web"
								}
							})}
							defaultValue={domain?.logo_url}
						/>
						{
							errors.logo_url && (
								<Alert className="mt-1" variant="warning">
									{errors.logo_url.message}
								</Alert>
							)
						}
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label className={styles.SiteSettings__label}>
							Màu nền
						</Form.Label>
						<Form.Control
							type="text"
							name="background_color"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng điền màu nền trang web"
								}
							})}
							defaultValue={domain?.background_color}
						/>
						{
							errors.background_color && (
								<Alert className="mt-1" variant="warning">
									{errors.background_color.message}
								</Alert>
							)
						}
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label className={styles.SiteSettings__label}>
							Đơn vị tiền tệ
						</Form.Label>
						<Form.Control
							type="text"
							name="currency"
							ref={register({
								required: {
									value: true,
									message: "Vui lòng điền đơn vị tiền tệ"
								}
							})}
							defaultValue={domain?.currency}
						/>
						{
							errors.currency && (
								<Alert className="mt-1" variant="warning">
									{errors.currency.message}
								</Alert>
							)
						}
					</Form.Group>
					<div className="text-center">
						<CustomButton
							isLoading={isUpdatingDomain}
							loadingText="Đang lưu"
							type="submit"
						>
							Lưu thông tin
						</CustomButton>
					</div>
				</Form>
			</div>
		</MainLayout>
	)
}

export default SiteSettingsPage
