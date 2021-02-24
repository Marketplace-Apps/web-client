import { useAuth } from "firebase-easy-hooks"
import { useDocumentData } from "react-livequery-hooks"
import { Domain } from "../types"

export const useDomain = () => {

    const { user } = useAuth()

    // Current domain
    const { item: current_domain, loading: loading_current_domain } = useDocumentData<Domain>(`domains/current${user ? '?reload' : ''}`, {
        cache: { use: true, update: true }
    })

    // Root domain if is admin 
    const root_domain_ref = current_domain?.refs?.[0]
    const { item: root_domain, loading: loading_root_domain } = useDocumentData<Domain>(root_domain_ref && `domains/${root_domain_ref}`, {
        cache: { use: true, update: true }
    })

    const is_domain_owner = current_domain && user && current_domain.owner_id == user.uid


    return {
        current_domain: !loading_current_domain && !loading_root_domain && current_domain,
        root_domain: !loading_current_domain && !loading_root_domain && root_domain,
        is_domain_owner
    }
}
