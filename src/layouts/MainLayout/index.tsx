
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { MobileBottomMenu } from '../../components/common/MobileBottomMenu'
import { MobileHeader } from '../../components/common/MobileHeader'
import { PcHeader } from '../../components/common/PcHeader'
import { PcSidebar } from '../../components/common/PcSidebar'
import { I18N } from '../../types'

export type MainLayout = {
	children?: ReactNode
	title?: I18N
}
export const MainLayout = ({ children, title }: MainLayout) => {

	const { locale } = useRouter()

	return (
		<div style={{ overflowX: 'hidden' }}>
			<Head>
				<title>{title[locale]}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Container fluid>
				<Row>
					<Col xs={12} className="d-md-none d-sm-block">
						<MobileHeader />
					</Col>
					<Col md={12} className="d-none d-md-flex" style={{
						background: 'linear-gradient(90deg, rgb(246, 79, 89), rgb(196, 113, 237), rgb(18, 194, 233))',
						padding: '15px 0 170px 0',
						marginBottom: -150,
						height:300
					}}>
						<PcHeader />
					</Col>
					<Col md="auto" className="d-none d-md-flex" >
						<div style={{
							backgroundColor: 'white',
							padding: '40px 14px 0 60px',
							marginLeft: 0,
							height: 'calc(100vh - 150px)',
							borderRadius: 10,
							width:300,
							border: '1px solid #e8e8e8' 
						}}>
							<PcSidebar />
						</div>
					</Col>
					<Col
						style={{
							backgroundColor: 'white',
							borderRadius: 20,
							padding: 20
						}}
						className="flex-grow-1"
					>
						{children}
					</Col>
					<Col
						xs="auto"
						className="d-none d-md-block"
						style={{ width: 15, margin: 0, padding: 0 }}
					></Col>
					<Col xs={12} style={{ height: 64 }} className="d-md-none d-sm-block"> </Col>
					<Col xs={12} className="d-md-none d-sm-block"><MobileBottomMenu /></Col>
				</Row>
			</Container>
		</div>
	)
}