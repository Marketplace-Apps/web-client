import { useDocumentData } from "react-livequery-hooks"
import { Domain } from "../types"

let i=1
export const useDomain = (ref?: string) => {
    const { item } = useDocumentData<Domain>('domains/current', {
        cache: { use: true, update: true }
    })
    return item
}
