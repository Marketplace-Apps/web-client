import ListTransactionsItem from 'domain/transaction/ListTransactionsItem'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Col, Row} from 'react-bootstrap'

const HistoryPage = () => {
	return (
		<MainLayout>
			<div className="pageHistory" style={{padding: '1rem 0'}}>
				<div className="pageHistory__selectDate">
					<Row
						style={{
							padding: '0rem 1.5rem 1rem 1.5rem',
							marginRight: '0 !important',
						}}
					>
						<Col xs={4}>
							<div className="pageHistory__inputDate">Chọn ngày</div>
						</Col>
						<Col xs={8}>
							<input type="date" />
						</Col>
					</Row>
				</div>
				<div className="pageHistory__optionsDate">
					<div className="Day">
						<div
							style={{
								padding: '1rem 1.5rem',
								color: '#000000',
								fontWeight: 'bold',
								fontSize: '0.9rem',
								borderTop: '1px solid #e3e3e3',
								borderBottom: '1px solid #e3e3e3',
							}}
							className="pageHistory__day"
						>
							22/12/2020
            </div>
						<div className="pageHistory__option">
							<div className="pageHistory_services">
								{new Array(5).fill(null).map((_) => (
									<ListTransactionsItem />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}

export default HistoryPage
