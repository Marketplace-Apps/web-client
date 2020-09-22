import React from 'react'
import {Col, Image, ListGroup, Row} from 'react-bootstrap'
import styles from './index.module.scss'
import LeftSidebarListFeatureItem from './LeftSidebarListFeatureItem'

const LeftSidebar = () => (
	<div className={styles.sidebarLeft}>
		<div className={styles.sidebarLeft_infor}>
			<Row>
				<Col md={3}>
					<div className={styles.sidebarLeft_infor__avatar}>
						<Image src="/images/avatarfake.png" fluid />
					</div>
				</Col>
				<Col md={9}>
					<div className={styles.sidebarLeft_infor__desc}>
						<div className={styles.sidebarLeft_infor__name}>
							<h1 className={styles.userName}>Duong Van Ba</h1>
						</div>
						<div className={styles.sidebarLeft_infor__money}>9992599 VND</div>
					</div>
				</Col>
			</Row>
		</div>
		<div className="sidebar_services">
			<ListGroup>
				<LeftSidebarListFeatureItem />
			</ListGroup>
		</div>
	</div>
)

export default LeftSidebar
