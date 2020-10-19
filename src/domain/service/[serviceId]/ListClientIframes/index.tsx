import { useRouter } from 'next/router'
import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { IframeDocument } from 'types/firebase'
import { useCollectionData, useDomain } from '../../../../hooks'
import styles from './index.module.scss'

const ListClientIframesContainer = (props: { children: any }) => (
	<div className={styles.HeaderServices__header}>
		<div className={styles.HeaderServices__buttonGroup}>{props.children}</div>
	</div>
)

const ListClientIframes = () => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }
	const domain = useDomain()

	const { data: clientIframes } = useCollectionData<IframeDocument>(
		`domains/${domain?.id}/services/${serviceId}/client_iframes`,
		[],
		null,
		100,
	)

	return (
		<>
			{clientIframes?.map(clientIframe => (
				<Button
					className={styles.HeaderServices__button}
					variant="outline-secondary"
				>
					<Image thumbnail src={clientIframe.icon_url} width="25px" />
					<span style={{ color: '#25ADE1' }}>{clientIframe.name}</span>
				</Button>
			))}
		</>
	)
}

export default ListClientIframes
