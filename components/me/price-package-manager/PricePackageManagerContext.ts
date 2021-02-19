import { createContext } from "react";
import { UseFormMethods } from "react-hook-form";
import { PricePackage } from "../../../types";


export type PricePackageManagerContext = {
    search?: string
    import_price: PricePackage
    price_package?: PricePackage
    form: UseFormMethods<PricePackage>
    edit_mode: boolean
}

export const PricePackageManagerContext = createContext<PricePackageManagerContext>({} as any)