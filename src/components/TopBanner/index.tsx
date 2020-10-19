import Link from 'next/link'
import React from 'react'
import { Image } from 'react-bootstrap'

const TopBanner = () => (
	<>
		<div className="banner-top d-none d-lg-block">
			<div className="banner-top__wrap">
				<Link href="/">
					<a>
						<Image
							style={{ maxWidth: '80px', borderRadius: '50%' }}
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
				background: -webkit-linear-gradient(
					to right,
					#f64f59,
					#c471ed,
					#12c2e9
				); /* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(
					to right,
					#f64f59,
					#c471ed,
					#12c2e9
				); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
