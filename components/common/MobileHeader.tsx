import firebase from 'firebase'
import { useDomain } from '../../hooks/useDomain'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { DEFAULT_AVATAR } from '../../const'
import { ChangeLanguage } from './ChangeLanguage'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuth } from 'firebase-easy-hooks'

export const MobileHeader = () => {
	const domain = useDomain()
	const router = useRouter()
	const user = useCurrentUser()
	const { user: firebase_user } = useAuth()

	return (
		<Row style={{ background: 'linear-gradient(90deg,#f64f59,#c471ed,#12c2e9)', padding: 10 }}>
			<Col className="p-0">
				<img src={domain?.icon} style={{ width: 40 }} />
				<span style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{domain?.name}</span>
			</Col>
			<Col xs="auto" className="d-flex justify-content-between align-items-center">
				<Button
					size="sm"
					className="mr-2"
					variant="outline-light"
					onClick={() => router.push(firebase_user ? '/me' : 'auth/sign-in')}
				>
					<img src={firebase_user?.photoURL || DEFAULT_AVATAR} width={20} style={{ borderRadius: '100%', marginRight: 5 }} />
					<span>{user?.balance.toLocaleString() || 0} đ</span>
				</Button>
				<ChangeLanguage />
			</Col>
		</Row>
	)
} 