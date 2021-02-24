import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'
import { LiveQueryContextProvider } from 'react-livequery-hooks'
import { ProtectedRoute } from '../components/common/ProtectedRoute'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ToastContainer } from 'react-toastify'
import { BASE_URL, WS_URL, FIREBASE_CONFIG, NO_PROTECTED_ROUTES } from '../const'

dayjs.extend(relativeTime)




if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG)


export default function App({ Component, pageProps }: AppProps) {

	const router = useRouter()
	return (
		<LiveQueryContextProvider
			websocket_url={WS_URL}
			options={async () => {
				const authorization = await firebase.auth().currentUser?.getIdToken()
				return {
					prefix: BASE_URL,
					headers: authorization ? { authorization } : {},
					retry: 3
				}
			}}>
			<ToastContainer />
			{
				NO_PROTECTED_ROUTES.includes(router.pathname) ? <Component {...pageProps} /> : <ProtectedRoute Component={Component} pageProps={pageProps} />
			}
		</LiveQueryContextProvider>
	)
} 
