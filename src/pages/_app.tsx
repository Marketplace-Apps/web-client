import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {AppProps} from 'next/app'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './global.scss'

const FIREBASE_CONFIG = {
	apiKey: "AIzaSyATf0V5INt6D29LAE_nMmUJhlXhC8wzw40",
	authDomain: "ssm-marketplace.firebaseapp.com",
	databaseURL: "https://ssm-marketplace.firebaseio.com",
	projectId: "ssm-marketplace",
	storageBucket: "ssm-marketplace.appspot.com",
	messagingSenderId: "900124795238",
	appId: "1:900124795238:web:c4297a52569babba0928a7",
	measurementId: "G-B6JX8YET24"
}

if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG)
firebase.firestore().settings({
	ignoreUndefinedProperties: true,
})

export default function App ({Component, pageProps}: AppProps) {
	return <Component {...pageProps} />
}
