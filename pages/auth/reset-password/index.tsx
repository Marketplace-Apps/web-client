import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner, Image, Form } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import styles from './index.module.scss'

const ResetPage = () => {
	return (
		<div className={styles.Reset}>
			<Row
				style={{
					marginRight: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Col md={6} lg={8} className={styles.bgS + ' d-none d-md-block'}></Col>
				<Col
					// style={{ background: '#fff' }}
					xs={12}
					md={6}
					lg={4}
					className={styles.Reset_main + '  p-5'}
				>
					<div style={{ position: 'relative', marginTop: '15%' }}>
						<div className={styles.title + ' text-center'}>
							<h1 className="mb-5">Đăng nhập</h1>
							<h2 className="mb-3 text-center">
								Hệ thống bán VIP top Việt Nam
							</h2>
							<Form>
								<Form.Control
									className="mb-4"
									type="email"
									placeholder="Email bạn đăng ký tài khoản "
								/>

								<Button
									style={{ fontSize: '1.4rem' }}
									variant="primary"
									type="submit"
								>
									Đặt lại mật khẩu
								</Button>
							</Form>
							<h2
								className="mt-4 mb-4"
								style={{ color: 'red', fontSize: '1.6rem', margin: '0 2rem' }}
							>
								Bạn vui lòng check đường link trong email để đặt lại mật khẩu
							</h2>

							<Form>
								<Form.Control
									className="mb-4"
									placeholder="duongvanba@gmail.com"
									disabled
								/>

								<Form.Control
									className="mb-4"
									type="password"
									placeholder="Mật khẩu"
								/>
								<Form.Control
									className="mb-4"
									type="password"
									placeholder="Đặt lại mật khẩu"
								/>

								<Button
									style={{ fontSize: '1.4rem' }}
									variant="primary"
									type="submit"
								>
									Đặt lại mật khẩu
								</Button>
							</Form>
						</div>
						<Button
							style={{
								paddingTop: '1rem',
								paddingBottom: '1rem',
								display: 'flex',
								margin: '0 auto',
							}}
							variant="primary mt-5"
							// onClick={ResetWithGoogleProvider}
							// disabled={isResetgIn}
						>
							{/* {isResetgIn ? (
								<Spinner animation="border" variant="light" size="sm" />
							) : ( */}
							<>
								<Image
									style={{
										width: '25px',
										height: '25px',
										marginRight: '5px',
									}}
									src="/images/iconGG.png"
									roundedCircle
									fluid
								/>
								Đăng nhập bằng Google
							</>
							{/* )} */}
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ResetPage
