import { useState } from "react"



export function useToggle(default_value: boolean = false) {
    const [s, ss] = useState<boolean>(default_value)
    return [s, () => ss(!s), { on: () => ss(true), off: () => ss(false) }] as [boolean, Function, { on: Function, off: Function }]
}