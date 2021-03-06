
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { MobileBottomMenu } from '../../components/common/MobileBottomMenu'
import { MobileHeader } from '../../components/common/MobileHeader'
import { PcHeader } from '../../components/common/PcHeader'
import { PcSidebar } from '../../components/common/PcSidebar'
import { I18N } from '../../types'
import { IoIosArrowBack } from 'react-icons/io'
import { IconButton } from '../../components/common/IconButton'
import { useDomain } from '../../hooks/useDomain'

export type MainLayout = {
	children?: ReactNode
	title?: I18N
	showHeaderTitle?: boolean
}
export const MainLayout = ({ children, title, showHeaderTitle }: MainLayout) => {

	const { locale } = useRouter()
	const { current_domain } = useDomain()

	return (
		<div style={{ overflowX: 'hidden' }}>
			<Head>
				<title>{title[locale]}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Container fluid>
				<Row  >
					<Col xs={12} className="d-md-none d-sm-block">
						<MobileHeader />
					</Col>
					<Col md={12} className="d-none d-md-flex" style={{
						background: current_domain?.background,
						padding: '15px 0 170px 0',
						marginBottom: -150,
						height: 300
					}}>
						<PcHeader />
					</Col>
					<Col md="auto" className="d-none d-md-flex" >
						<div style={{
							backgroundColor: 'white',
							padding: '30px 15px 0 20px',
							marginLeft: 0,
							borderRadius: 20,
							width: 250,
							border: '1px solid #e8e8e8'
						}}>
							<PcSidebar />
						</div>
					</Col>
					<Col
						style={{
							backgroundColor: 'white',
							borderRadius: 20,
							padding: 20,
							minHeight: 'calc(100vh - 30px)'
						}}
						className="flex-grow-1"
					>
						{showHeaderTitle && <h5>{title[locale]}</h5>}
						{children}
					</Col>
					<Col
						md="auto"
						className="d-none d-md-block"
						style={{ width: 15, margin: 0, padding: 0 }}
					></Col>
					<Col xs={12} style={{ height: 64 }} className="d-md-none d-sm-block"> </Col>
					<Col xs={12} className="d-md-none d-sm-block" style={{ zIndex: 99 }}><MobileBottomMenu /></Col>
				</Row>
			</Container>
		</div>
	)
}