import { AppRouteList } from "../../AppRouteList"
import { MainLayout } from "../../layouts/MainLayout"



const ReportPage = () => (
    <MainLayout title={AppRouteList.Me.children.Report.name}>
    <span>Report</span>
    </MainLayout>
)

export default ReportPage