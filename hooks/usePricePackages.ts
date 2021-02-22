import { useDocumentData } from "react-livequery-hooks"
import { User, Domain, PricePackage } from "../types"
import { useCurrentUser } from "./useCurrentUser"
import { useDomain } from "./useDomain"

function get_ref(domain: Domain, me: User) {

    if (!domain || !me) return 

    // Normal user
    if (me.id != domain.owner_id) return `domains/${domain.id}/packages/${me.level || 'default'}`

    // Super admin
    if (me.id == 'qWaArilaFUZqsq2vQ7lg5OkUnt32') return `domains/qWaArilaFUZqsq2vQ7lg5OkUnt32/packages/root`

    // Domain owner
    return `domains/${domain.refs[0]}/packages/${me.root_level || 'default'}`
}

export const useMyDefaultPricesPackage = () => {

    const domain = useDomain()
    const me = useCurrentUser()
    const prices_package_ref = get_ref(domain, me)
    const { item } = useDocumentData<PricePackage>(prices_package_ref)
    return item
}