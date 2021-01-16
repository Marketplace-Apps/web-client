import { Alert, Button, Card, Col, Row } from "react-bootstrap"
import { FcStumbleupon } from "react-icons/fc"
import { AppRouteList } from "../../AppRouteList"
import { MainLayout } from "../../layouts/MainLayout"
import { TiGroup } from 'react-icons/ti'
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { AiFillClockCircle } from "react-icons/ai"
import { Line } from 'react-chartjs-2'


const xxx = new Array(100).fill(0).map((_, index) => index)

const ReportPage = () => {

    const reports = [
        { Icon: FaRegMoneyBillAlt, name: 'Số dư', value: 123456, background: 'linear-gradient(to right, #11998e, #38ef7d)' },
        { Icon: AiFillClockCircle, name: 'Tổng đã nạp', value: 123456, background: 'linear-gradient(to right, #4e54c8, #8f94fb)' },
        { Icon: TiGroup, name: 'Tổng tiền CTV & đại lý ', value: 123456, background: 'linear-gradient(to right, #f46b45, #eea849)' },

    ]


    return (
        <MainLayout title={AppRouteList.Me.children.Report.name}>
            <Row>
                {
                    reports.map(({ Icon, name, value, background }) => (
                        <Col xs={12} md={6} xl={3} lg={4} style={{ padding: '15px 30px 0px 30px' }}>
                            <Row style={{ background, color: 'white', borderRadius: 10 }}    >
                                <Col xs={3} className="d-flex justify-content-center align-items-center">
                                    <Icon size={60} />
                                </Col>
                                <Col xs={9} className="p-1">
                                    <div style={{ fontSize: 16 }}>{name}</div>
                                    <div style={{ fontSize: 30, fontWeight: 'bold' }}>{value.toLocaleString()} đ</div>
                                </Col>

                            </Row>
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col xs={12}>
                    <Line data={{
                        labels: xxx,
                        datasets: [
                            {
                                label: 'Viewers',
                                fill: 'start',
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(75,192,192,1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: xxx.map(x => x + ~~(Math.random() * 5))
                            }
                        ]
                    }} />
                </Col>
            </Row>

        </MainLayout>
    )
}

export default ReportPage