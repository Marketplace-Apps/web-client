import { PropsWithChildren, ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SanboxJS } from "../../../helpers/sandboxjs";

export const VisibleCheck = (props: PropsWithChildren<{condition:string}>) => {

    const data = useFormContext().watch()
    const visible = useMemo(() => {
        if(!props.condition) return true 
        return SanboxJS.eval(props.condition, data)
    }, [data])

    return (visible ? props.children : null) as JSX.Element
    
}