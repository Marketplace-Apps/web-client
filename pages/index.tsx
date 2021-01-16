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
import useTranslation from 'next-translate/useTranslation'


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

	const is_edit_mode = is_owner && typeof location != 'undefined' && location.search.includes('edit=true')

	const [selected_feed_index, set_selected_feed_index] = useState(-2)

	function clickFeed(index: number) {
		if (is_edit_mode) {
			set_selected_feed_index(index)
			return
		}
	}

	useInfinityScroll(() => has_more && fetch_more())

	const { t } = useTranslation('common')


	return (
		<MainLayout title={{ en: 'Home', vi: 'Trang chủ' }}>
			{
				is_edit_mode && (
					<Row><Col xs={12} className="text-right">
						<Button onClick={() => set_selected_feed_index(-1)}>{t('create')}</Button>
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

			<Row className="mt-1">
				{
					feeds.map((feed, i) => (
						<Col xs={12} md={12} xl={6} className="p-2" >
							<FeedItem
								feed={feed}
								onClick={() => clickFeed(i)}
							/>
						</Col>
					))
				}
			</Row>
		</MainLayout>
	)

}

export default HomePage
