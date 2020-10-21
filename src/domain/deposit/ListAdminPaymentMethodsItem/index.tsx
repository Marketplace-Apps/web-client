import { useCollectionData } from 'hooks'
import React from 'react'
import { Image } from 'react-bootstrap'
import {
	PaymentMethodDocument,
	PaymentMethodNoteDocument,
} from 'types/firebase'
import PaymentMethodNote from '../PaymentMethodNote'
import styles from './index.module.scss'

type ListAdminPaymentMethodsItemProps = PaymentMethodDocument & {
	domainId: string | null
}

const ListAdminPaymentMethodsItem = ({
	logo_url,
	bank_number,
	owner_name,
	note,
	id: paymentMethodId,
	domainId,
}: ListAdminPaymentMethodsItemProps) => {
	const { data: notes } = useCollectionData<PaymentMethodNoteDocument>(
		`domains/${domainId}/payment_methods/${paymentMethodId}/notes`,
		[],
		null,
		100,
	)

	return (
		<div className={styles.pageAddCash__Bank}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					paddingLeft: '10px',
				}}
			>
				<Image src={logo_url} width="100px" />
				<div className="ml-3">
					<div className={styles.pageAddCash__info}>{owner_name}</div>
					<div className={styles.pageAddCash__info}>{bank_number}</div>
					<div className={styles.pageAddCash__info}>{note}</div>
				</div>
			</div>
			<div
				style={{
					paddingLeft: '10px',
					marginTop: '10px',
				}}
			>
				{notes?.map(note => (
					<PaymentMethodNote content={note.content} type={note.type} />
				))}
			</div>
		</div>
	)
}

export default ListAdminPaymentMethodsItem
