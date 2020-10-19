import { auth } from 'firebase/app'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AccountInformation from './AccountInformation'
import styles from './index.module.scss'
import LeftSidebarMenu from './LefSidebarMenu'

const LeftSidebar = () => {
	const [user] = useAuthState(auth())

	return (
		<div className={styles.sidebarLeft}>
			{user && <AccountInformation />}
			<LeftSidebarMenu />
		</div>
	)
}

export default LeftSidebar
