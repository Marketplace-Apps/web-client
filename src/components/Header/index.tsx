import { auth } from 'firebase/app'
import { useDomain } from 'hooks'
import Link from 'next/link'
import React from 'react'
import { Image, Nav, Navbar } from 'react-bootstrap'
import { GrLogout } from 'react-icons/gr'
import styles from './index.module.scss'

const Header = () => {
	const domain = useDomain()

	const onLogout = () => {
		auth().signOut()
	}

	return (
		<div className={styles.header}>
			<div className={styles.header__top + ' ' + 'd-block d-lg-none'}>
				<Navbar className={styles.e} variant="dark">
					<Link href="/">
						<a>
							<Image
								style={{
									maxWidth: '50px',
									borderRadius: '50%',
									marginRight: '1rem',
								}}
								src={domain?.logo_url}
								fluid
							/>
						</a>
					</Link>

					<Nav className="mr-auto">
						<Link href="/">
							<a style={{ color: '#fff', fontWeight: 'bold' }}>
								{domain?.site_name}
							</a>
						</Link>
					</Nav>
					<div className="header__notify" onClick={onLogout}>
						<GrLogout size="25px" />
					</div>
				</Navbar>
			</div>
		</div>
	)
}

export default Header
