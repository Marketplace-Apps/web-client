import firebase from 'firebase'
import { useDomain } from '../../hooks/useDomain'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Dropdown, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { ChangeLanguage } from './ChangeLanguage'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuth } from 'firebase-easy-hooks'

export const MobileHeader = () => {
	const domain = useDomain()
	const router = useRouter()
	const user = useCurrentUser()
	const { user } = useAuth()

	const onLogout = () => {
		firebase.auth().signOut()
		router.push('/auth/sign-in')
	}

	return (
		<Row style={{ background: 'linear-gradient(90deg,#f64f59,#c471ed,#12c2e9)', padding: 10 }}>
			<Col>
				<img src={domain?.icon} style={{ width: 40 }} />
				<span style={{ marginLeft: 10, color: 'white', fontWeight: 'bold' }}>{domain?.name}</span>
			</Col>
			<Col className="d-flex justify-content-end align-items-center">
				<Button size="sm" className="mr-2" variant="outline-light" onClick={() => router.push('/me')}>
					<img src={user?.photoURL || 'https://www.w3schools.com/w3images/avatar2.png'} width={20} style={{ borderRadius: '100%', marginRight: 5 }} />
					<span>{user?.balance.toLocaleString()} đ</span>
				</Button>
				<ChangeLanguage />
			</Col>
		</Row>
	)
} 