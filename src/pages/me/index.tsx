import MenuItem from 'domain/me/MenuItem'
import {auth} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Button, Image, Row} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'
import {BsPersonFill} from 'react-icons/bs'

const MENU_ITEMS = [
	{
		thumbnail: '/images/rules.png',
		route: '/rules',
		title: 'Nội quy hệ thống',
	},
	{
		thumbnail: '/images/contact.jpg',
		route: '/contact',
		title: 'Liên hệ admin',
	},
]

const MePage = () => {
	const [user, loading] = useAuthState(auth())

	return (
		<MainLayout
			title=""
		>
			<div className="pageUser">
				<div
					style={{
						padding: '3rem 2rem 4rem 2rem',
						background: 'linear-gradient(90deg, #9d0ff4 -1.45%, #2d8eff 100%)',
					}}
					className="pageUser__banner"
				>
					<div
						style={{
							display: 'flex',
							padding: '1.5rem 2.5rem',
							backgroundColor: '#fff',
							borderRadius: '10px',
						}}
						className="pageUser__user"
					>
						{
							!user && !loading && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<BsPersonFill size="45px" />
									<p>Bạn chưa đăng nhập </p>
								</div>
							)
						}
						{
							user && user.isAnonymous && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<BsPersonFill size="45px" />
									<div
										style={{
											display: "flex",
											flexDirection: "column"
										}}
									>
										<p>Khách vãng lai</p>
										<p>123.456.789 đ</p>
									</div>
								</div>
							)
						}
						{
							user && !user.isAnonymous && (
								<>
									<div className="pageUser__img">
										<Image src="/images/avatar5.png" />
									</div>
									<div className="pageUser__desWrap d-flex align-items-center">
										<div style={{marginLeft: '2rem'}} className="pageUser__des">
											<div
												style={{
													marginBottom: '1rem',
													fontWeight: 'bold',
													fontSize: '1.2rem',
													lineHeight: '1.3rem',
													color: '#000000',
												}}
												className="pageUser__name"
											>
												Phạm Vũ Khánh Linh
                			</div>
											<div
												style={{
													fontWeight: 'bold',
													fontSize: '1.1rem',
													lineHeight: '1.2rem',
													color: '#0088b3',
												}}
												className="pageUser__price"
											>
												123.456.789 đ
                			</div>
										</div>
									</div>
								</>
							)
						}
					</div>
				</div>
				<div style={{padding: '2rem 1.5rem'}} className="pageUser__content">
					<Row>
						{MENU_ITEMS.map((item) => <MenuItem {...item} />)}
					</Row>
				</div>
				{
					!user && !loading && (
						<div
							style={{
								display: "flex",
								justifyContent: "center"
							}}
						>
							<Button>
								Đăng nhập vào hệ thống
							</Button>
						</div>
					)
				}
				{
					user && user.isAnonymous && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column"
							}}
						>
							<p>
								Bạn vui lòng xác nhận tài khoản bằng Google để tránh mất tài khoản
							</p>
							<Button>
								Xác nhận tài khoản Google
							</Button>
						</div>
					)
				}
			</div>
		</MainLayout>
	)
}

export default MePage
