
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



const DepositPage = () => {
	const domain = useDomain()
	const { user } = useAuth()
	const is_owner = domain && (user?.uid == domain.owner_id)
	const is_edit_mode = is_owner && typeof location != 'undefined' && location.search.includes('edit=true')

	const { items: payment_methods, loading, empty } = useCollectionData<
		PaymentMethod
	>(domain && `domains/${domain.id}/payment-methods`)
	const { t } = useTranslation('common')

	const [selected_payment_method_index, set_selected_payment_method_index] = useState(-2)
	

	return (
		<MainLayout title={AppRouteList.Deposit.name}>
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
