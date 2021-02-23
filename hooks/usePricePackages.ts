import { useCollectionData, useDocumentData } from "react-livequery-hooks"
import { groupByKey } from "../helpers/group"
import { User, Domain, PricePackage } from "../types"

export const useUserDefaultPricesPackage = (user: User) => {
    const ref = user && `domains/${user.domain_id}/packages/${user.level || 'default'}`
    const { item } = useDocumentData<PricePackage>(ref)
    return item
}


export function useDomainPricesPackages(domain: Domain) {
    const { items: packages } = useCollectionData<PricePackage>(domain && `domains/${domain.id}/packages`)
    return packages.filter(p => p.id != 'root')
}


export function useGroupedDomainPricesPackages(domain: Domain) {
    const packages = useDomainPricesPackages(domain)
    return groupByKey(packages, 'id')
}