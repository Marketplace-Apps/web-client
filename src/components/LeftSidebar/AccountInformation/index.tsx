import { auth, firestore } from 'firebase/app'
import React from 'react'
import { Image } from 'react-bootstrap'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { UserDocument } from '../../../types/firebase'
import styles from './index.module.scss'

const AccountInformation = (props: { domainId: string }) => {
	const [user] = useDocumentData<UserDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId || typeof window != 'undefined' && window.location.hostname || 'null')
			.collection('users')
			.doc(auth().currentUser.uid),
	)

	return (
		<div className={styles.sidebarLeft_infor}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<div className={styles.sidebarLeft_infor__avatar}>
					<Image
						src={
							auth().currentUser.isAnonymous
								? '/images/avatarfake.png'
								: auth().currentUser.providerData[0].photoURL
						}
						fluid
						width="50px"
						roundedCircle
					/>
				</div>
				<div className={styles.sidebarLeft_infor__desc}>
					<div className={styles.sidebarLeft_infor__name}>
						<span className={styles.userName}>
							{auth().currentUser.isAnonymous
								? 'Ẩn danh'
								: auth().currentUser.providerData[0].displayName}
						</span>
					</div>
					<div className={styles.sidebarLeft_infor__money}>
						{user?.balance.toLocaleString('vi')}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AccountInformation
