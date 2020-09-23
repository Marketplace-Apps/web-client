import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import styles from './index.module.scss'

type ListAdminPaymentMethodsItemProps = {
	bankLogoUrl: string
	ownerName: string
	cardNumber: string
	department: string
}

const ListAdminPaymentMethodsItem = ({
	bankLogoUrl,
	cardNumber,
	department,
	ownerName
}: ListAdminPaymentMethodsItemProps) => (
		<div className={styles.pageAddCash__Bank}>
			<Row>
				<Col xs={6}>
					<Image src={bankLogoUrl} />
				</Col>
				<Col xs={6}>
					<div className={styles.pageAddCash__info}>{ownerName}</div>

					<div className={styles.pageAddCash__info}>{cardNumber}</div>
					<div className={styles.pageAddCash__info}>{department}</div>
				</Col>
			</Row>
		</div>
	)

export default ListAdminPaymentMethodsItem
