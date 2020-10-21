import {useCollectionData} from 'hooks'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {Button, Image} from 'react-bootstrap'
import {IframeDocument} from 'types/firebase'
import ClientPopupIframe from '../ClientPopupIframe'
import styles from './index.module.scss'

const ListClientPopupIframes = () => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const [isShowClientPopupIframe, setIsShowClientPopupIframe] = useState<
		boolean
	>(false)
	const onShowClientPopupIframe = () => setIsShowClientPopupIframe(true)
	const onHideClientPopupIframe = () => setIsShowClientPopupIframe(false)

	const [
		selectedPopupIframe,
		setSelectedPopupIframe,
	] = useState<IframeDocument | null>(null)

	const { data: clientPopupIframes } = useCollectionData<IframeDocument>(
		`services/${serviceId}_config/iframes`,
		[['type', '==', 'service_popup']],
		null,
		100,
	)

	return (
		<>
			{selectedPopupIframe && (
				<ClientPopupIframe
					onHide={() => {
						onHideClientPopupIframe()
						setSelectedPopupIframe(null)
					}}
					show={isShowClientPopupIframe}
					url={selectedPopupIframe.url}
				/>
			)}
			{clientPopupIframes?.map(clientPopupIframe => (
				<Button
					className={styles.HeaderServices__button}
					variant="outline-secondary"
					onClick={() => {
						onShowClientPopupIframe()
						setSelectedPopupIframe(clientPopupIframe)
					}}
				>
					<Image
						thumbnail
						src={clientPopupIframe.icon}
						width="25px"
						className="mr-2"
					/>
					<span style={{ color: '#25ADE1' }}>{clientPopupIframe.name}</span>
				</Button>
			))}
		</>
	)
}

export default ListClientPopupIframes
