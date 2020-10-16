import CustomButton from 'components/CustomButton'
import MenuItem from 'domain/me/MenuItem'
import {auth, firestore} from 'firebase/app'
import MainLayout from 'layouts/MainLayout'
import React, {useState} from 'react'
import {Image, Row} from 'react-bootstrap'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {BsPersonFill} from 'react-icons/bs'
import {FcContacts, FcRules} from 'react-icons/fc'
import {toast} from 'react-toastify'
import {UserDocument} from '../../types/firebase'

const MENU_ITEMS = [
	{
		Icon: FcRules,
		route: '/rules',
		title: 'Nội quy hệ thống',
	},
	{
		Icon: FcContacts,
		route: '/contact',
		title: 'Liên hệ admin',
	},
]

const MePage = (props: { domainId: string }) => {
	const [user, loading] = useAuthState(auth())

	const [userDocument] = useDocumentData<UserDocument>(
		firestore()
			.collection('domains')
			.doc(props.domainId)
			.collection('users')
			.doc(auth().currentUser?.uid || 'uid'),
	)

	const [isSigningInAnonymously, setIsSigningInAnonymously] = useState<boolean>(
		false,
	)
	const [
		isSigningInWithGoogleProvider,
		setIsSigningInWithGoogleProvider,
	] = useState<boolean>(false)

	const createNewUser = async (
		uid: string,
		isAnonymous: boolean,
		user?: {
			email?: string
			photoUrl?: string
			displayName?: string
			balance?: number
			totalDeposit?: number
		},
	) =>
		await firestore()
			.collection('domains')
			.doc(props.domainId)
			.collection('users')
			.doc(uid)
			.set({
				id: uid,
				balance: user?.balance || 0,
				email: user?.email || '',
				avatar_url: user?.photoUrl || '',
				name: user?.displayName || '',
				total_deposit: user?.totalDeposit || 0,
				is_anonymous: isAnonymous,
			})

	const signInWithGoogleProvider = async () => {
		setIsSigningInWithGoogleProvider(true)
		try {
			const GoogleProvider = new auth.GoogleAuthProvider()
			await auth().signInWithPopup(GoogleProvider)
			toast.success('Đăng nhập Google thành công', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
			const userRef = await firestore()
				.collection('domains')
				.doc(props.domainId)
				.collection('users')
				.doc(auth().currentUser.uid)
				.get()
			if (!userRef.data())
				await createNewUser(auth().currentUser.uid, false, {
					displayName: auth().currentUser.displayName,
					email: auth().currentUser.email,
					photoUrl: auth().currentUser.photoURL,
				})
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSigningInWithGoogleProvider(false)
	}

	const fromAnonymousToGoogle = async () => {
		setIsSigningInWithGoogleProvider(true)
		try {
			const GoogleProvider = new auth.GoogleAuthProvider()
			const anonymousUser = auth().currentUser
			await anonymousUser.linkWithPopup(GoogleProvider)
			toast.success('Xác nhận tài khoản Google thành công', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
			const userRef = await firestore()
				.collection('domains')
				.doc(props.domainId)
				.collection('users')
				.doc(anonymousUser.uid)
				.get()
			const { providerData } = auth().currentUser
			const { displayName, email, photoURL, uid } = providerData[0]
			const oldUser = userRef.data()
			await firestore()
				.collection('domains')
				.doc(props.domainId)
				.collection('users')
				.doc(anonymousUser.uid)
				.delete()
			await createNewUser(uid, false, {
				balance: oldUser.balance,
				displayName,
				email,
				photoUrl: photoURL,
				totalDeposit: oldUser.totalDeposit,
			})
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSigningInWithGoogleProvider(false)
	}

	const signInAnonymously = async () => {
		setIsSigningInAnonymously(true)
		try {
			await auth().signInAnonymously()
			toast.success('Đăng nhập ẩn danh thành công', {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
			const userRef = await firestore()
				.collection('domains')
				.doc(props.domainId)
				.collection('users')
				.doc(auth().currentUser.uid)
				.get()
			if (!userRef.data()) await createNewUser(auth().currentUser.uid, true)
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 4000,
			})
		}
		setIsSigningInAnonymously(false)
	}

	return (
		<MainLayout title="Cá nhân" domainId={props.domainId}>
			<div className="pageUser">
				<div
					style={{
						padding: '3rem 2rem 4rem 2rem',
						background: 'linear-gradient(90deg, #9d0ff4 -1.45%, #2d8eff 100%)',
					}}
					className="pageUser__banner"
				>
					<div
						style={{
							display: 'flex',
							padding: '1.5rem 2.5rem',
							backgroundColor: '#fff',
							borderRadius: '10px',
						}}
						className="pageUser__user"
					>
						{!user && !loading && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<BsPersonFill size="45px" />
								<p>Bạn chưa đăng nhập </p>
							</div>
						)}
						{user && user.isAnonymous && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<BsPersonFill size="45px" />
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<p>Khách vãng lai</p>
									<p>ID: {user.uid}</p>
									<p>
										{userDocument?.balance
											? userDocument?.balance.toLocaleString('vi')
											: 0}{' '}
									</p>
								</div>
							</div>
						)}
						{user && !user.isAnonymous && (
							<>
								<div className="pageUser__img">
									<Image src={user.providerData[0].photoURL} />
								</div>
								<div className="pageUser__desWrap d-flex align-items-center">
									<div style={{ marginLeft: '2rem' }} className="pageUser__des">
										<div
											style={{
												marginBottom: '1rem',
												fontWeight: 'bold',
												fontSize: '1.2rem',
												lineHeight: '1.3rem',
												color: '#000000',
											}}
											className="pageUser__name"
										>
											{user.providerData[0].displayName}
										</div>
										<div
											style={{
												fontWeight: 'bold',
												fontSize: '1.1rem',
												lineHeight: '1.2rem',
												color: '#0088b3',
											}}
											className="pageUser__price"
										>
											{userDocument?.balance
												? userDocument?.balance.toLocaleString('vi')
												: 0}{' '}
											đ
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div style={{ padding: '2rem 1.5rem' }} className="pageUser__content">
					<Row
						style={{
							margin: 0,
						}}
						noGutters
					>
						{MENU_ITEMS.map(item => (
							<MenuItem {...item} />
						))}
					</Row>
				</div>
				{!user && !loading && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<CustomButton
							onClick={signInAnonymously}
							isLoading={isSigningInAnonymously}
							loadingText="Đang đăng nhập"
							disabled={isSigningInWithGoogleProvider}
						>
							Đăng nhập ẩn danh
						</CustomButton>
						<CustomButton
							className="mt-3"
							onClick={signInWithGoogleProvider}
							isLoading={isSigningInWithGoogleProvider}
							loadingText="Đang đăng nhập"
							disabled={isSigningInAnonymously}
						>
							Đăng nhập bằng tài khoản Google
						</CustomButton>
					</div>
				)}
				{user && user.isAnonymous && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<p>
							Bạn vui lòng xác nhận tài khoản bằng Google để tránh mất tài khoản
						</p>
						<CustomButton
							onClick={fromAnonymousToGoogle}
							isLoading={isSigningInWithGoogleProvider}
							loadingText="Đang xác nhận"
						>
							Xác nhận tài khoản Google
						</CustomButton>
					</div>
				)}
			</div>
		</MainLayout>
	)
}

MePage.getInitialProps = async (ctx: any) => {
	const host = ctx.req ? ctx.req.headers.host.split(':')[0] : location.hostname
	const domain = await firestore()
		.collection('domains')
		.where('domain_name', '==', host)
		.get()
	return {
		domainId: domain.docs.length ? domain.docs[0].id : null,
	}
}

export default MePage
