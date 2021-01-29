import firebase from 'firebase'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useAuth } from 'firebase-easy-hooks'
import { toast } from 'react-toastify'
import useTranslation from 'next-translate/useTranslation'

const SignInPage = () => {

	const router = useRouter()

	const { user } = useAuth()

	const { t } = useTranslation('common')

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
				height: 500,
				borderRadius: 10,
				marginRight: 10,
				marginLeft: 10,
				padding: 40
			}}>
				<div className="text-center mt-5" style={{ color: '#9d74cf' }}><h1 className="font-weight-bold">Login</h1></div>
				<Form.Group style={{ margin: '100px 10px 0 10px' }}>
					{/* <InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text style={{ backgroundColor: 'white', color: '#9d74cf' }}> <AiOutlineUser size={30} /> </InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl size="lg" placeholder="Username" />
					</InputGroup>
					<InputGroup className="mb-5">
						<InputGroup.Prepend>
							<InputGroup.Text style={{ backgroundColor: 'white', color: '#9d74cf' }}> <AiFillLock size={30} /> </InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl size="lg" placeholder="Password" />
					</InputGroup>
					<div style={{
						background: 'linear-gradient(to right, #fc5c7d, #6a82fb)',
						textAlign: 'center',
						color: 'white',
						padding: 10,
						borderRadius: 20,
						cursor: 'pointer'
					}}>
						{isSigningIn && <Spinner animation="border" variant="light" size="sm" className="mr-2" />}
						<span>ĐĂNG NHẬP</span>
					</div> */}
					<div onClick={signInWithGoogleProvider} style={{
						border: '1px solid #9d74cf',
						color: '#9d74cf',
						textAlign: 'center',
						padding: 10,
						marginTop: 60,
						borderRadius: 20,
						cursor: 'pointer',
						fontWeight: 'bold'
					}}>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png"
							width={20}
							className="mr-2"
						/>Google</div>
				</Form.Group>
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
