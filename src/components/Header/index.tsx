import Link from 'next/link'
import React from 'react'
import { Image, Nav, Navbar } from 'react-bootstrap'
import { FaBell } from 'react-icons/fa'
import styles from './index.module.scss'

const Header = () => (
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
							src="https://ongmatmedia.com/img/logo.png"
							fluid
						/>
					</a>
				</Link>

				<Nav className="mr-auto">
					<Link href="/">
						<a style={{ color: '#fff', fontWeight: 'bold' }}>Ong Mật Media</a>
					</Link>
				</Nav>
				<div className="header__notify">
					<Link href="/notification">
						<FaBell size="30px" color="blue" />
					</Link>
				</div>
			</Navbar>
		</div>
	</div>
)

export default Header
