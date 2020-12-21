import { Alert } from "react-bootstrap"
import { AppRouteList } from "../AppRouteList"
import { MainLayout } from "../layouts/MainLayout"

const AdminContact = () => {

    return (
		<MainLayout title={AppRouteList.Contact.name}>
            <Alert variant="primary">Tính năng đang trong giai đoạn phát triển</Alert>
		</MainLayout>
	)
}

export default AdminContact