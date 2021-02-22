import { useMemo } from "react"
import { useCollectionData } from "react-livequery-hooks"
import { groupBy2Key, groupByKey } from "../helpers/group"
import { Domain, ServiceProvider } from "../types"
import { useDomain } from "./useDomain"

export const useServices = () => {
    const { items } = useCollectionData<ServiceProvider>(`services`, { cache: { use: true, update: true } })
    return items
}

export const useGroupedServices = () => {
    const { items } = useCollectionData<ServiceProvider>(`services`, { cache: { use: true, update: true } })
    const grouped_services = useMemo(() => groupBy2Key(items, 'category', 'id'), [items])
    return grouped_services
}

export const useFullServices = () => {
    return [
        {
            id: 'SEND_MONEY',
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaz_Rc8biOUNvof9yETcoKfH9jzLDCmRVzw&usqp=CAU',
            name: { en: 'Send money', vi: 'Gửi tiền' }
        },
        {
            id: 'RECEIVE_MONEY',
            icon: 'https://img.icons8.com/cotton/2x/money-transfer.png',
            name: { en: 'Receive money', vi: 'Nhận tiền' }
        },
        ...useServices(),
    ]
}

export const useFullGroupedServices = () => {
    return groupByKey(useFullServices(), 'id')
}