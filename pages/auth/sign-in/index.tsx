import firebase from 'firebase'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Button, Form, FormControl, InputGroup, Spinner } from 'react-bootstrap'
import { useAuth } from 'firebase-easy-hooks'
import { toast } from 'react-toastify'
import useTranslation from 'next-translate/useTranslation'
import { AiFillLock, AiOutlineUser } from 'react-icons/ai'
import { CenteredSpinner } from '../../../components/common/CenteredSpinner'
import { FormProvider, useForm } from 'react-hook-form'

const SignInPage = () => {

	const router = useRouter()

	const { user } = useAuth()

	const { t } = useTranslation('common')

	const [allow_password, set_allow_password] = useState(false)
	const form = useForm()
	const [loading, set_loading] = useState(false)
	const [error, set_error] = useState()

	useEffect(() => {
		if (user) router.replace('/')
	}, [user])

	const signInWithGoogleProvider = async () => {
		try {
			const GoogleProvider = new firebase.auth.GoogleAuthProvider()
			await firebase.auth().signInWithPopup(GoogleProvider)
			router.push('/')
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
	}

	async function loginWithUsernameAndPassword() {
		const values = form.watch()
		set_loading(true)
		try {
			await firebase.auth().signInWithEmailAndPassword(values.username, values.password)
			router.push('/')
		} catch (e) {
			set_error(e.code)
		}
		set_loading(false)
	}


	return (
		<div className="d-flex justify-content-center align-items-center" style={{
			width: '100%',
			height: '100vh',
			background: 'linear-gradient(to right, #fc5c7d, #6a82fb)'
		}}>
			<div style={{
				width: '100%',
				backgroundColor: 'white',
				maxWidth: 500,
				height: allow_password ? 500 : 400,
				borderRadius: 10,
				marginRight: 10,
				marginLeft: 10,
				padding: 40
			}}>
				<div className="text-center mt-5" style={{ color: '#9d74cf' }}>
					<h1 className="font-weight-bold">{t('login.submit')}</h1>
				</div>
				<Form.Group style={{ margin: '30px 10px 0 10px' }}>
					<FormProvider {...form}>
						<Form onSubmit={form.handleSubmit(loginWithUsernameAndPassword)}>
							{
								allow_password && (
									<Fragment>
										<InputGroup className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text

													style={{ backgroundColor: 'white', color: '#9d74cf' }}>
													<AiOutlineUser size={30} />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												size="lg"
												placeholder={t('login.username')}
												ref={form.register()}
												name="username"
											/>
										</InputGroup>
										<InputGroup className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text style={{ backgroundColor: 'white', color: '#9d74cf' }}> <AiFillLock size={30} /> </InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												size="lg"
												placeholder={t('login.password')}
												ref={form.register()}
												name="password"
												type="password"
											/>
										</InputGroup>
										{error && <Alert variant="danger" >{t(`login.${error}`)}</Alert>}
										<div style={{
											background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
											textAlign: 'center',
											color: 'white',
											padding: 10,
											borderRadius: 20,
											cursor: 'pointer'
										}}
											onClick={loginWithUsernameAndPassword}>
											<span>{loading ? <Spinner
												size="sm"
												variant="light"
												animation="border"
											/> : t('login.submit')}</span>
										</div>
										<button type="submit" style={{ visibility: 'hidden' }}></button>
									</Fragment>
								)
							}
						</Form>
					</FormProvider>
					<div onClick={signInWithGoogleProvider} style={{
						border: '1px solid #9d74cf',
						color: '#9d74cf',
						textAlign: 'center',
						padding: 10,
						marginTop: 10,
						borderRadius: 20,
						cursor: 'pointer',
						fontWeight: 'bold'
					}}>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
							width={20}
							className="mr-2"
						/>Đăng nhập với Google/Sign in with Google</div>
				</Form.Group>
				{
					!allow_password && (
						<div className="mt-5 text-center">
							<Button
								size="sm"
								variant="outline-dark"
								onClick={() => set_allow_password(true)}
							>{t('login.has_username_and_password')}</Button>
						</div>
					)
				}
			</div>

		</div>
	)
}

export function getServerSideProps() {
	return {
		props: {}
	}
}

export default SignInPage
