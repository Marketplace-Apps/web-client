import React from 'react'
import { ChartData, Line } from "react-chartjs-2"
import chartjs from 'chart.js'
import { ServiceRunningReport } from '../../types'

type ViewersReportChartProps = {
    reports: ServiceRunningReport['reports']
}


export const ReportChart = ({ reports }: ViewersReportChartProps) => {



    const data: ChartData<chartjs.ChartData> = {
        labels: reports.map(i => new Date(i.created_at).toLocaleTimeString()),
        datasets: [
            {
                label: '*',
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
                data: reports.map(item => item.amount)
            }
        ]
    };

    return (
        <Line
            data={data}
            options={{
                scales: {
                    ticks: {
                        maxTicksLimit: 5
                    }
                }

            }}

        />
    )
}
