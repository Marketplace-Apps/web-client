import React, { Fragment } from 'react'
import { useDomain } from '../hooks/useDomain'
import { useInfinityScroll } from '../hooks/useInfinityScroll'
import { groupBy2Key, groupByCreatedTime, groupByKey } from '../helpers/group'
import { lt, useCollectionData } from 'react-livequery-hooks'
import { PaymentHistory } from '../types'
import { useAuth } from 'firebase-easy-hooks'
import { MainLayout } from '../layouts/MainLayout'
import { useServices } from '../hooks/useServices'
import { Alert, Badge, Button, Col, Dropdown, Row } from 'react-bootstrap'
import { DatePickerWrapper } from '../components/common/DatePickerWrapper'
import { ImCalendar } from 'react-icons/im'
import { AppRouteList } from '../AppRouteList'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { get_ms_end_day } from '../helpers/time'
import useTranslation from 'next-translate/useTranslation'
import { ListTransactionsItem } from '../components/transactions/TransactionItem'
import { CenteredSpinner } from '../components/common/CenteredSpinner'
import { TransactionList } from '../components/transactions/TransactionList'

const TransactionPage = () => {
    const { user } = useAuth()

    return (
        <MainLayout title={AppRouteList.Transactions.name} showHeaderTitle>
            {user && <TransactionList user_id={user.uid} />}
        </MainLayout >
    )
}

export default TransactionPage




