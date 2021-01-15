import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { FcAssistant } from 'react-icons/fc'
import { useAuth } from 'firebase-easy-hooks'
import { useDomain } from '../hooks/useDomain'
import { useInfinityScroll } from '../hooks/useInfinityScroll'
import { CenteredSpinner } from '../components/common/CenteredSpinner'
import { MainLayout } from '../layouts/MainLayout'
import { useCollectionData } from 'react-livequery-hooks'
import { Feed } from '../types'
import { FeedItem } from '../components/feeds/FeedItem'
import { FeedModal } from '../components/feeds/FeedModal'


const HomePage = () => {

	const domain = useDomain()
	const { user } = useAuth()

	const {
		items: feeds,
		loading,
		fetch_more,
		has_more,
		empty
	} = useCollectionData<Feed>(
		domain && `domains/${domain.id}/feeds`,
	)

	const is_owner = domain && (domain.owner_id == user?.uid)

	useInfinityScroll(() => has_more && fetch_more())

	const [selected_feed_index, set_selected_feed_index] = useState(-2)

	return (
		<MainLayout title={{ en: 'Home', vi: 'Trang chủ' }}>
			{
				is_owner && (
					<Row><Col xs={12} className="text-right">
						<Button onClick={() => set_selected_feed_index(-1)}>Create</Button>
					</Col></Row>
				)
			}
			{loading && <CenteredSpinner />}
			{empty && (
				<p className="text-center">Chưa có thông báo</p>
			)}
			{ selected_feed_index == -1 && <FeedModal onHide={() => set_selected_feed_index(-2)} />}
			{ selected_feed_index >= 0 && <FeedModal
				feed={feeds[selected_feed_index]}
				onHide={() => set_selected_feed_index(-2)}
			/>}
			{
				feeds.map((feed, i) => <FeedItem
					feed={feed}
					onClick={is_owner && (() => set_selected_feed_index(i))}
				/>)
			}
		</MainLayout>
	)

}

export default HomePage
