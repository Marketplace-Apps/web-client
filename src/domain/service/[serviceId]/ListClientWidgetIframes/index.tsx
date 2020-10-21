import { useCollectionData } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { IframeDocument } from 'types/firebase'

const ListClientWidgetIframes = () => {
	const router = useRouter()
	const { serviceId } = router.query as { serviceId: string }

	const { data: clientWidgetIframes } = useCollectionData<IframeDocument>(
		`services/${serviceId}_config/iframes`,
		[['type', '==', 'service_widget']],
		null,
		100,
	)

	return (
		<>
			{clientWidgetIframes?.map(({ url }) => (
				<div>
					<iframe
						src={url}
						width="100%"
						seamless
						style={{
							border: 'none',
							height: '100%',
						}}
					/>
				</div>
			))}
		</>
	)
}

export default ListClientWidgetIframes
