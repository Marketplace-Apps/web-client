import { useAuth } from "firebase-easy-hooks"
import { useDocumentData } from "react-livequery-hooks"
import { Domain, User } from "../types"

export const useDomainUser = (domain: Domain) => { 
    const { user } = useAuth()
    const { item } = useDocumentData<User>(domain && user && `domains/${domain.id}/users/${user.uid}`, {
        cache: { use: true, update: true }
    })
    return item
}
