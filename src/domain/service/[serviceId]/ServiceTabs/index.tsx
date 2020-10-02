import React from 'react'
import {Col, Row} from 'react-bootstrap'
import ServiceActionsTabPane from '../ServiceActionsTabPane'
import styles from './index.module.scss'

const ServiceTabPane = (props: {
	children: any,
	onChangeTab?: () => void
}) => (
		<Col
			className={styles.HeaderServices__ButtonItem}
		>
			{
				props.onChangeTab && (
					<div
						onClick={props.onChangeTab}
					>
						{
							props.children
						}
					</div>
				)
			}
			{
				!props.onChangeTab && (
					<>
						{
							props.children
						}
					</>
				)
			}
		</Col>
	)

const ServiceTabsContainer = (props: {
	children: any
}) => (
		<div className={styles.HeaderServices__header}>
			<div className={styles.HeaderServices__buttonGroup}>
				<Row>
					{
						props.children
					}
				</Row>
			</div>
		</div>
	)

const ServiceTabs = () => {
	return (
		<ServiceTabsContainer>
			<ServiceTabPane>
				<ServiceActionsTabPane />
			</ServiceTabPane>
		</ServiceTabsContainer>
	)
}

export default ServiceTabs