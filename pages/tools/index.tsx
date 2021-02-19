
import { Alert, Badge, Col, Row } from 'react-bootstrap' 
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
