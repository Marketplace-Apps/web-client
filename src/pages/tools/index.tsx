
import { Alert, Badge, Col, Row } from 'react-bootstrap'
import { useDomain } from '../../hooks/useDomain'
import { groupBy2Key } from '../../helpers/group'
import { ImFacebook2 } from 'react-icons/im'
import { useCollectionData } from 'react-livequery-hooks'
import { DomainService } from '../../types'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'
import { AppRouteList } from '../../AppRouteList'

const Tools = () => { 

	return (
		<MainLayout title={AppRouteList.Tools.name}>
            <Alert variant="primary">Tính năng đang trong giai đoạn phát triển</Alert>
		</MainLayout>
	)
}

export default Tools
