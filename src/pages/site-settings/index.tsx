import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Form} from 'react-bootstrap'
import styles from './index.module.scss'

const SiteSettingsPage = () => (
	<MainLayout
		title="Cài đặt trang"
	>
		<div className={styles.SiteSettings}>
			<Form className={styles.SiteSettings__form}>
				<Form.Group className="mb-4">
					<Form.Label className={styles.SiteSettings__label}>
						Tên site
					</Form.Label>
					<Form.Control type="text" />
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label className={styles.SiteSettings__label}>
						Logo icon{' '}
					</Form.Label>
					<Form.Control type="text" />
				</Form.Group>
				<Form.Group className="mb-4">
					<Form.Label className={styles.SiteSettings__label}>
						Màu sắc gradient{' '}
					</Form.Label>
					<Form.Control type="text" />
				</Form.Group>

				<div className="text-center">
					<Button variant="primary" type="submit">
						Lưu thông tin
					</Button>
				</div>
			</Form>
		</div>
	</MainLayout>
)

export default SiteSettingsPage
