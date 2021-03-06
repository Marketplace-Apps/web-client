import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router'


const HomePage = () => {

	const { current_domain, is_domain_owner } = useDomain()
	const { locale } = useRouter()
 
	const is_edit_mode = is_domain_owner && typeof location != 'undefined' && location.search.includes('edit=true')

	const {
		items: feeds,
		loading,
		fetch_more,
		has_more,
		empty,
		filters,
		filter
	} = useCollectionData<Feed>(
		current_domain && `domains/${current_domain.id}/feeds`,
		!is_edit_mode && {
			where: { language: locale }
		}
	)

	useEffect(() => {
		filters.language?.value != locale && filter({ language: locale })
	}, [locale])

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
				<p className="text-center">{t('empty_data')}</p>
			)}
			{ selected_feed_index == -1 && <FeedModal onHide={() => set_selected_feed_index(-2)} />}
			{ selected_feed_index >= 0 && <FeedModal
				feed={feeds[selected_feed_index]}
				onHide={() => set_selected_feed_index(-2)}
			/>}

			<Row className="mt-1">
				{
					feeds.map((feed, i) => (
						<Col
							xs={12}
							md={12}
							xl={6}
							className="p-2"
							key={feed.id}
						>
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
