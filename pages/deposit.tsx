
import React, { useState } from 'react'
import { useDomain } from '../hooks/useDomain'
import { MainLayout } from '../layouts/MainLayout'
import { useCollectionData } from 'react-livequery-hooks'
import { PaymentMethod } from '../types'
import { Alert, Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { AppRouteList } from '../AppRouteList'
import { useAuth } from 'firebase-easy-hooks'
import { PaymentMethodItem } from '../components/deposit/PaymentMethodItem'
import { PaymentMethodModal } from '../components/deposit/PaymentMethodModal'
import useTranslation from 'next-translate/useTranslation'
import { CenteredSpinner } from '../components/common/CenteredSpinner'
import { useRouter } from 'next/router'


export const DepositGuide = () => {

	const { locale } = useRouter()

	return (
		<Row className="mt-4"><Col xs={12}>
			{locale == 'en' && <Alert variant="info">Send money to one if this accounts</Alert>}
			{locale == 'en' && <Alert variant="danger">Include your email address in payment note</Alert>}
			{locale == 'vi' && <Alert variant="info">Bạn có thể gửi tiền vào một trong các tài khoản dưới dây</Alert>}
			{locale == 'vi' && <Alert variant="danger">Vui lòng ghi kèm email của bạn trong nội dung chuyển khoản</Alert>}
		</Col></Row>
	)
}


const DepositPage = () => {
	const { current_domain, is_domain_owner } = useDomain()
	console.log({ current_domain, is_domain_owner})
	const { user } = useAuth()
	const is_edit_mode = is_domain_owner && typeof location != 'undefined' && location.search.includes('edit=true')

	const { items: payment_methods, loading, empty } = useCollectionData<
		PaymentMethod
	>(current_domain && `domains/${current_domain.id}/payment-methods`)
	const { t } = useTranslation('common')

	const [selected_payment_method_index, set_selected_payment_method_index] = useState(-2)


	return (
		<MainLayout title={AppRouteList.Deposit.name} showHeaderTitle>
			{
				selected_payment_method_index >= 0 && (
					<PaymentMethodModal
						payment_method={payment_methods[selected_payment_method_index]}
						onHide={() => set_selected_payment_method_index(-2)}
					/>
				)
			}
			{
				selected_payment_method_index == -1 && (
					<PaymentMethodModal
						onHide={() => set_selected_payment_method_index(-2)}
					/>
				)
			}
			{
				is_edit_mode && (
					<Row>
						<Col className="text-right">
							<Button
								size="sm"
								onClick={() => set_selected_payment_method_index(-1)}
							>{t('create')}</Button>
						</Col>
					</Row>
				)
			}
			{empty && <div className="text-center">{t('empty_data')}</div>}
			{loading && <CenteredSpinner />}
			{ !is_edit_mode && <DepositGuide />}
			<Row style={{ color: '#1678db', padding: 0 }}>
				{
					payment_methods.map((payment_method, index) => <Col
						xs={12}
						md={4}
					>
						<PaymentMethodItem
							payment_method={payment_method}
							onClick={is_edit_mode ? (() => set_selected_payment_method_index(index)) : null}
						/>
					</Col>
					)
				}
			</Row>
		</MainLayout >
	)
}

export default DepositPage
