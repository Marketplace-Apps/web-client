import { AppRouteList } from "../../AppRouteList"
import { MainLayout } from "../../layouts/MainLayout"



const NotificationManagerPage = () => (
    <MainLayout title={AppRouteList.Me.children.NotificationManager.name}>
        <span>NotificationManager</span>
    </MainLayout>
)

export default NotificationManagerPage