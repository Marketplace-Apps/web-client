import firebase from 'firebase'
import { useDomain } from '../../hooks/useDomain'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Col, Dropdown, Image, Nav, Navbar, Row } from 'react-bootstrap'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { ChangeLanguage } from './ChangeLanguage'

export const MobileHeader = () => {
	const domain = useDomain()
	const router = useRouter()

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
				<ChangeLanguage /> 
			</Col>
		</Row>
	)
} 