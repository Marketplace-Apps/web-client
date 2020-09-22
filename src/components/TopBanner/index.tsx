import Link from 'next/link'
import React from 'react'
import {Image} from 'react-bootstrap'

const TopBanner = () => (
	<>
		<div className="banner-top d-none d-lg-block">
			<div className="banner-top__wrap">
				<Link href="/">
					<a>
						<Image
							style={{maxWidth: '80px', borderRadius: '50%'}}
							fluid
							className="banner-top__logo"
							src="https://ongmatmedia.com/img/logo.png"
						/>
					</a>
				</Link>

				<h1 className="banner-top__text">Ong mat media</h1>
			</div>
		</div>
		<style jsx>{`
			.banner-top {
				height: 220px;
				padding-bottom: 2rem;
				width: 100%;
				background-color: #1fc8db;
				background: linear-gradient(
					141deg,
					#9fb8ad 0%,
					#1fc8db 51%,
					#2cb5e8 75%
				);
				color: white;
				opacity: 0.95;
			}

			.banner-top__logo {
			}

			.banner-top__wrap {
				display: flex;
				justify-content: center;
				padding-top: 2rem;
				padding-bottom: 2rem;
			}

			.banner-top__text {
				display: flex;
				align-items: center;
				margin-left: 1.5rem;
			}
		`}</style>
	</>
)

export default TopBanner
