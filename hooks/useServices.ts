import { useMemo } from "react"
import { useCollectionData } from "react-livequery-hooks"
import { groupBy2Key } from "../helpers/group"
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