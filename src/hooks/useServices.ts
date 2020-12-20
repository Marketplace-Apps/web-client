import { useCollectionData } from "react-livequery-hooks"
import { Domain, ServiceProvider } from "../types"
import { useDomain } from "./useDomain"

export const useServices = () => {
    const domain = useDomain()
    const { items } = useCollectionData<ServiceProvider<any>>(domain && `domains/${domain.id}/services`, { cache: { use: true, update: true } })
    return items
}
