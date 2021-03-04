import { PropsWithChildren, ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SanboxJS } from "../../../helpers/sandboxjs";

export const VisibleCheck = (props: PropsWithChildren<{condition:string, data?:any}>) => {

    const data = useFormContext()?.watch() || props.data 
    const visible = useMemo(() => {
        if(!props.condition) return true 
        return SanboxJS.eval(props.condition, data)
    }, [data])

    return (visible ? props.children : null) as JSX.Element
    
}