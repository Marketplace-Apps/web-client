import React from 'react'
import AccountInformation from './AccountInformation'
import styles from './index.module.scss'
import LeftSidebarMenu from './LefSidebarMenu'

const LeftSidebar = () => (
	<div className={styles.sidebarLeft}>
		<AccountInformation />
		<LeftSidebarMenu />
	</div>
)

export default LeftSidebar
