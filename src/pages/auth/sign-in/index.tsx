import { yupResolver } from '@hookform/resolvers'
import { auth } from 'firebase/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import styles from './index.module.scss'

interface ISignInData {
	email: string
	password: string
}

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Vui lòng điền email')
		.email('Email không hợp lệ'),
	password: yup.string().required('Vui lòng điền mật khẩu'),
})

const SignInPage = () => {
	const router = useRouter()

	const [user] = useAuthState(auth())

	useEffect(() => {
		if (user) router.replace('/')
	}, [user])

	const { register, handleSubmit, reset, errors, clearErrors } = useForm<
		ISignInData
	>({
		resolver: yupResolver(schema),
	})

	const [isSigningIn, setIsSigningIn] = useState<boolean>(false)

	const onSubmit = handleSubmit(async ({ email, password }) => {
		setIsSigningIn(true)
		try {
			await auth().signInWithEmailAndPassword(email, password)
			router.push('/')
			reset()
			clearErrors()
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSigningIn(false)
	})

	const signInWithGoogleProvider = async () => {
		try {
			const GoogleProvider = new auth.GoogleAuthProvider()
			await auth().signInWithPopup(GoogleProvider)
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
	}

	return (
		<div className={styles.signin}>
			<Row
				style={{
					marginRight: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Col md={6} lg={8} className={styles.bgS + ' d-none d-md-block'}></Col>
				<Col xs={12} md={6} lg={4} className={styles.signin_main + '  p-5'}>
					<div style={{ position: 'relative', marginTop: '15%' }}>
						<div className={styles.title + ' text-center'}>
							<h1 className="mb-5">Đăng nhập</h1>
							<h2 className="mb-3 text-center">
								Hệ thống bán VIP top Việt Nam
							</h2>
							<Form onSubmit={onSubmit}>
								<Form.Control
									className="mb-4"
									type="text"
									placeholder="Email"
									name="email"
									ref={register}
								/>
								{errors.email && (
									<Alert className="mt-1" variant="warning">
										{errors.email.message}
									</Alert>
								)}
								<Form.Control
									className="mb-4"
									type="password"
									placeholder="Mật khẩu"
									name="password"
									ref={register}
								/>
								{errors.password && (
									<Alert className="mt-1" variant="warning">
										{errors.password.message}
									</Alert>
								)}
								<Button
									style={{ fontSize: '1.4rem' }}
									variant="primary"
									type="submit"
									disabled={isSigningIn}
								>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<span>Đăng nhập</span>
										{isSigningIn && (
											<Spinner animation="border" variant="light" size="sm" />
										)}
									</div>
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
							onClick={signInWithGoogleProvider}
						>
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
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default SignInPage
