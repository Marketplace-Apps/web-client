import TableRow from 'domain/users/TableRow'
import TransferMoneyModal from 'domain/users/TransferMoneyModal'
import {firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Form, Table} from 'react-bootstrap'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {UserDocument} from 'types/firebase'
import styles from './index.module.scss'

const UsersPage = () => {

	const router = useRouter()
	const {domainId} = router.query as {domainId: string}

	const [users] = useCollectionData<UserDocument>(
		firestore().collection('domains').doc(domainId).collection('users')
	)

	const [isShowTransferMoneyModal, setIsShowTransferMoneyModal] = useState<boolean>(false)
	const onShowTransferMoneyModal = () => setIsShowTransferMoneyModal(true)
	const onHideTransferMoneyModal = () => setIsShowTransferMoneyModal(false)

	const [selectedUser, setSelectedUser] = useState<UserDocument | null>(null)
	const [searchValue, setSearchValue] = useState<string | null>(null)

	const filteredUsers = searchValue && searchValue !== "" ? users.filter(user => user.name.includes(searchValue)) : users

	return (
		<MainLayout
			title="Quản lý người dùng"
		>
			<div className={styles.UserManagement}>
				{
					selectedUser && (
						<TransferMoneyModal
							onHide={onHideTransferMoneyModal}
							show={isShowTransferMoneyModal}
							data={selectedUser}
						/>
					)
				}
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end"
					}}
				>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Nhập tên"
							name="bank_number"
							style={{
								borderRadius: "20px"
							}}
							autoComplete="off"
							onChange={e => setSearchValue(e.target.value.trim().toLocaleUpperCase())}
						/>
					</Form.Group>
				</div>
				<Table hover responsive>
					<thead>
						<tr>
							<th>Tên</th>
							<th>Số dư</th>
							<th>Tổng nạp</th>
							<th>E-mail</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							filteredUsers?.map(user => (
								<TableRow
									data={user}
									onSelect={() => {
										setSelectedUser(user)
										onShowTransferMoneyModal()
									}}
								/>
							))
						}
					</tbody>
				</Table>
			</div>
		</MainLayout>
	)
}

export default UsersPage