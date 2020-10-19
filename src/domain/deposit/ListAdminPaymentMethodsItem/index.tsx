import React from 'react'
import { Image } from 'react-bootstrap'
import { PaymentMethodDocument } from 'types/firebase'
import styles from './index.module.scss'

const ListAdminPaymentMethodsItem = ({
	logo_url,
	bank_number,
	owner_name,
	note,
}: PaymentMethodDocument) => (
	<div className={styles.pageAddCash__Bank}>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Image src={logo_url} thumbnail width="150px" />
			<div className="ml-5">
				<div className={styles.pageAddCash__info}>{owner_name}</div>
				<div className={styles.pageAddCash__info}>{bank_number}</div>
				<div className={styles.pageAddCash__info}>{note}</div>
			</div>
		</div>
	</div>
)

export default ListAdminPaymentMethodsItem
