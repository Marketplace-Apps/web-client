import Header from 'components/Header'
import LeftSidebar from 'components/LeftSidebar'
import MobileBottomMenu from 'components/MobileBottomMenu'
import RightSidebar from 'components/RightSidebar'
import TopBanner from 'components/TopBanner'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import styles from './index.module.scss'

type Props = {
	children?: ReactNode
	title?: string
}

const MainLayout = ({ children, title = 'Market Apps' }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</Head>
		<div>
			<TopBanner />
			<div className={styles.page_wrapper}>
				<div>
					<Row className={styles.FixMobile}>
						<Col lg={4} xl={3} className="sidebar-wrap d-none d-lg-block">
							<LeftSidebar />
						</Col>
						<Col xs={12} sm={12} lg={8} xl={6} className={styles.FixMobile}>
							<div className={styles.page_main}>
								<Header />
								<div>{children}</div>
							</div>
							<div className="d-lg-none">
								<MobileBottomMenu />
							</div>
						</Col>
						<Col xl={3} className="d-none d-xl-block">
							<RightSidebar />
						</Col>
					</Row>
				</div>
			</div>
		</div>
		<ToastContainer />
	</div>
)

export default MainLayout
