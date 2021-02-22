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
import { Credit } from './Credit'

export const MobileHeader = () => {
	const domain = useDomain()
	const router = useRouter()
	const me = useCurrentUser()
	const { user } = useAuth()

	return (
		<Row style={{ background: 'linear-gradient(90deg,#f64f59,#c471ed,#12c2e9)', padding: 10 }}>
			<Col className="p-0 d-flex justify-content-start align-items-center">
				<img src={domain?.icon} style={{ width: 40 }} />
				<span style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{domain?.name}</span>
			</Col>
			<Col className="d-flex justify-content-end align-items-center">
				<Button
					size="sm"
					variant="outline-light"
					onClick={() => router.push(user ? '/me' : 'auth/sign-in')}
					style={{ borderRadius: 20 }}
				>
					<img src={user?.photoURL || DEFAULT_AVATAR} width={20} style={{ borderRadius: '100%', marginRight: 5 }} />
					<span><Credit value={me?.balance} /></span>
				</Button>
				{/* <ChangeLanguage /> */}
			</Col>
		</Row>
	)
} 