import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import styles from './index.module.scss'

type ListPaymentMethodsItemProps = {
	bankLogoUrl: string
	ownerName: string
	cardNumber: string
	department: string
}

const ListPaymentMethodsItem = ({
	bankLogoUrl,
	cardNumber,
	ownerName,
	department
}: ListPaymentMethodsItemProps) => {
	return (
		<Col xs={12} lg={12} xl={6}>
			<div className={styles.pageAddCash__Bank}>
				<Row style={{alignItems: 'center'}}>
					<Image src={bankLogoUrl} />
					<Col xs={6}>
						<div className={styles.pageAddCash__info}>{ownerName}</div>

						<div className={styles.pageAddCash__info}>{cardNumber}</div>
						<div className={styles.pageAddCash__info}>{department}</div>
					</Col>
				</Row>
			</div>
			{/* 1  */}
		</Col>
	)
}

export default ListPaymentMethodsItem
