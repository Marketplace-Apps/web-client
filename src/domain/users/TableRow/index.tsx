import React from 'react'
import {FaDollarSign} from 'react-icons/fa'
import {UserDocument} from 'types/firebase'
import styles from './index.module.scss'

interface ITableRowProps {
	data: UserDocument
	onSelect: () => void
}

const TableRow = ({
	data: {
		avatar_url,
		name,
		balance,
		email,
		total_deposit
	},
	onSelect
}: ITableRowProps) => {
	return (
		<tr>
			<td className={styles.UserManagement__name}>
				{name}
			</td>
			<td className={styles.UserManagement__money}>{balance.toLocaleString()}</td>
			<td className={styles.UserManagement__money}>{total_deposit.toLocaleString()}</td>
			<td className={styles.UserManagement__email}>{email}</td>
			<td className={styles.UserManagement__action}>
				<FaDollarSign size="20px" style={{cursor: "pointer"}} onClick={onSelect} />
			</td>
		</tr>
	)
}

export default TableRow
