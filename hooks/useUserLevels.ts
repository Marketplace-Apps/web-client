import { useCollectionData } from "react-livequery-hooks";
import { PricePackage } from "../types";
import { useDomain } from "./useDomain";

export function useUserLevels() {
    const domain = useDomain()
    const { items: packages } = useCollectionData<PricePackage>(domain && `domains/${domain.id}/packages`)
    return packages
}