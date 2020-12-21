import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { useAuth } from 'firebase-easy-hooks'


export const ProtectedRoute = (props: {
	Component: NextComponentType<NextPageContext, any, {}>
	pageProps: any
}) => {
	const { Component, pageProps } = props

	const { loading, user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user && !loading) router.push('/auth/sign-in')
	}, [user, loading])
	
	return (
		<div>
			{
				user && <Component {...pageProps} />
			}
		</div>
	)
} 