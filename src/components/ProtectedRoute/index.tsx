import firebase from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import {NextComponentType, NextPageContext} from 'next'
import {useRouter} from 'next/dist/client/router'
import Error from 'next/error'
import React, {useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'

const WaitingComponent = (props: {displayText: string}) => (
	<MainLayout>
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				flexDirection: 'column',
			}}
		>
			<Spinner animation="border" variant="primary" />
			<p style={{marginTop: 5}}>{props.displayText}</p>
		</div>
	</MainLayout>
)

const ProtectedRoute = (props: {
	Component: NextComponentType<NextPageContext, any, {}>
	pageProps: any
}) => {
	const {Component, pageProps} = props

	const [user, loading, error] = useAuthState(firebase.auth())
	const router = useRouter()

	useEffect(() => {
		if (!user && !loading && !error) router.push('/auth/sign-in')
	}, [user, loading, error])

	if (loading) return <WaitingComponent displayText="Khởi tạo người dùng..." />
	if (user && !loading) return <Component {...pageProps} />
	if (error) return <Error statusCode={500} />
	return <WaitingComponent displayText="Đang điều hướng..." />
}

export default ProtectedRoute