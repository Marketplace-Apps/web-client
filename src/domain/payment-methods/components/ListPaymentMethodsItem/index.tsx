import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import styles from './index.module.scss'

type ListPaymentMethodsItemProps = {
	data: {
		bankLogoUrl: string
		ownerName: string
		bankNumber: string
	}
	onSelect: () => void
}

const ListPaymentMethodsItem = ({
	data: {
		bankNumber,
		bankLogoUrl,
		ownerName
	},
	onSelect
}: ListPaymentMethodsItemProps) => {
	return (
		<Col xs={12} lg={12} xl={6}>
			<div
				className={styles.pageAddCash__Bank}
				style={{
					cursor: "pointer"
				}}
				onClick={onSelect}
			>
				<Row style={{alignItems: 'center'}}>
					<Image src={bankLogoUrl} thumbnail width="50px" />
					<Col xs={6}>
						<div className={styles.pageAddCash__info}>{ownerName}</div>
						<div className={styles.pageAddCash__info}>{bankNumber}</div>
					</Col>
				</Row>
			</div>
			{/* 1  */}
		</Col>
	)
}

export default ListPaymentMethodsItem
