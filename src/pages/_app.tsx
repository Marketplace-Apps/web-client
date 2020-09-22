import 'bootstrap/dist/css/bootstrap.min.css'
import {AppProps} from 'next/app'
import React from 'react'
import './global.scss'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
