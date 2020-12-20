import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'
import { LiveQueryContextProvider } from 'react-livequery-hooks'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import { useAuth } from 'firebase-easy-hooks'

const FIREBASE_CONFIG = {
	apiKey: 'AIzaSyATf0V5INt6D29LAE_nMmUJhlXhC8wzw40',
	authDomain: 'ssm-marketplace.firebaseapp.com',
	databaseURL: 'https://ssm-marketplace.firebaseio.com',
	projectId: 'ssm-marketplace',
	storageBucket: 'ssm-marketplace.appspot.com',
	messagingSenderId: '900124795238',
	appId: '1:900124795238:web:c4297a52569babba0928a7',
	measurementId: 'G-B6JX8YET24',
}

const NO_PROTECTED_ROUTES = [
	'/auth/sign-in',
	'/deposit',
	'/me',
	'/services',
	'/',
]

const BASE_URL = 'http://localhost:5555/livequery/'//process.env.NODE_ENV == 'development' ? 'http://localhost:5555/livequery/' : 'https://unhgl5ql7g.execute-api.ap-southeast-1.amazonaws.com/livequery/'

if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG)


firebase.firestore().settings({
	ignoreUndefinedProperties: true,
})

const websocket_url = BASE_URL.replace('http', 'ws') + 'realtime-updates'

export default function App({ Component, pageProps }: AppProps) {

	const router = useRouter()
	return (
		<LiveQueryContextProvider
			websocket_url={websocket_url}
			options={async () => ({
				prefix: BASE_URL,
				headers: {
					authorization: await firebase.auth().currentUser?.getIdToken()
				},
				retry: 3
			})}>
			{
				NO_PROTECTED_ROUTES.includes(router.pathname) ? <Component {...pageProps} /> : <ProtectedRoute Component={Component} pageProps={pageProps} />
			}
		</LiveQueryContextProvider>
	)
} 