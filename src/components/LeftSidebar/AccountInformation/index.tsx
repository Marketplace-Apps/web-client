import { auth, firestore } from 'firebase/app'
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { UserDocument } from '../../../types/firebase'
import styles from './index.module.scss'

const AccountInformation = () => {
	const domainId = localStorage.getItem('domain_id')

	const [user] = useDocumentData<UserDocument>(
		firestore()
			.collection('domains')
			.doc(domainId)
			.collection('users')
			.doc(auth().currentUser.uid),
	)

	return (
		<div className={styles.sidebarLeft_infor}>
			<Row>
				<Col md={3}>
					<div className={styles.sidebarLeft_infor__avatar}>
						<Image
							src={
								auth().currentUser.isAnonymous
									? '/images/avatarfake.png'
									: auth().currentUser.providerData[0].photoURL
							}
							fluid
						/>
					</div>
				</Col>
				<Col md={9}>
					<div className={styles.sidebarLeft_infor__desc}>
						<div className={styles.sidebarLeft_infor__name}>
							<h1 className={styles.userName}>
								{auth().currentUser.isAnonymous
									? 'Ẩn danh'
									: auth().currentUser.providerData[0].displayName}
							</h1>
						</div>
						<div className={styles.sidebarLeft_infor__money}>
							{user?.balance.toLocaleString('vi')}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default AccountInformation
