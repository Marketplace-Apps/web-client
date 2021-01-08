import { useAuth } from "firebase-easy-hooks"
import { useDocumentData } from "react-livequery-hooks"
import { User } from "../types"
import { useDomain } from "./useDomain"

export const useCurrentUser = () => {
    const domain = useDomain()
    const { user } = useAuth()
    const { item } = useDocumentData<User>(domain && user && `domains/${domain.id}/users/${user.uid}`, {
        cache: { use: true, update: true }
    })
    return item
}
