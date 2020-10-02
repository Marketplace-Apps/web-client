import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'
import {PaymentMethodDocument} from 'types/firebase'
import styles from './index.module.scss'

const ListAdminPaymentMethodsItem = ({
	logo_url,
	bank_number,
	owner_name,
}: PaymentMethodDocument) => (
		<div className={styles.pageAddCash__Bank}>
			<Row>
				<Col xs={6}>
					<Image src={logo_url} thumbnail width="150px" />
				</Col>
				<Col xs={6}>
					<div className={styles.pageAddCash__info}>{owner_name}</div>

					<div className={styles.pageAddCash__info}>{bank_number}</div>
				</Col>
			</Row>
		</div>
	)

export default ListAdminPaymentMethodsItem
