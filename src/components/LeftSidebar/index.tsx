import { auth } from 'firebase/app'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AccountInformation from './AccountInformation'
import styles from './index.module.scss'
import LeftSidebarMenu from './LefSidebarMenu'

const LeftSidebar = (props: { domainId: string }) => {
	const [user] = useAuthState(auth())

	return (
		<div className={styles.sidebarLeft}>
			{user && <AccountInformation domainId={props.domainId} />}
			<LeftSidebarMenu />
		</div>
	)
}

export default LeftSidebar
