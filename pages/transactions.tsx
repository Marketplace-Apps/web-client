import React, { Fragment } from 'react'
import { useDomain } from '../hooks/useDomain'
import { MainLayout } from '../layouts/MainLayout'
import { AppRouteList } from '../AppRouteList'
import { TransactionList } from '../components/transactions/TransactionList'
import { useDomainUser } from '../hooks/useCurrentUser'

const TransactionPage = () => {

    const { current_domain, root_domain } = useDomain()
    const domain = root_domain || current_domain
    const user = useDomainUser(domain)

    return (
        <MainLayout title={AppRouteList.Transactions.name} showHeaderTitle>
            {user && <TransactionList user={user} domain={domain} />}
        </MainLayout >
    )
}

export default TransactionPage




