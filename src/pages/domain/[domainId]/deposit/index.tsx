import ListAdminPaymentMethodsItem from 'domain/deposit/ListAdminPaymentMethodsItem'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Image} from 'react-bootstrap'

const PAYMENT_METHODS = [
	{
		ownerName: 'Dương Văn Ba',
		cardNumber: ' 0301.0003.81458',
		department: 'Chi nhánh Hà Thành',
		bankLogoUrl: '/images/vietcombank.png',
	},
]

const Title = (props: {title: string}) => (
	<h2
		style={{
			fontWeight: 'bold',
			fontSize: '1.1rem',
			lineHeight: '1.3rem',
			textAlign: 'center',
			color: ' #339be7',
		}}
		className="pageAddCash__title mt-3 mb-5"
	>
		{props.title}
	</h2>
)

const DepositPage = () => {
	return (
		<MainLayout>
			<div className="pageAddCash" style={{padding: '1rem 1.5rem'}}>
				<Title title="Vui lòng chọn một trong các phương thức thanh toán dưới đây" />
				<div className="pageAddCash__VNPayQr text-center">
					<Image src="/images/vnpayqr.png" />
					<div
						className="pageAddCash__input"
						style={{marginTop: '1rem', marginBottom: '1rem'}}
					>
						<input
							style={{
								width: '80%',
								backgroundColor: '#f2f2f2',
								border: '1px solid #f2f2f2',
								padding: '5px 10px',
								borderRadius: '5px',
							}}
							placeholder="Nhập số tiền..."
							type="text"
						/>
					</div>

					<div className="text-center mt-3 mb-4">
						<Button variant="info">Thanh toán qua VNPay</Button>{' '}
					</div>
				</div>

				<Title
					title=" Hoặc chuyển tiền vào các tài khoản dưới đây với nội dung là email của
          bạn trên hệ thống"
				/>
				{PAYMENT_METHODS.map(paymentMethods => (
					<ListAdminPaymentMethodsItem
						{...paymentMethods}
					/>
				))}
			</div>
		</MainLayout>
	)
}

export default DepositPage
