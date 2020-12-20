import { useDocumentData } from "react-livequery-hooks"
import { Domain } from "../types"

export const useDomain = (ref?: string) => {
    const { item, error, loading } = useDocumentData<Domain>('domains/~~', {
        cache: { use: true, update: true },
        reatime: false
    })
    return item
}