import { useRouter } from "next/router"

export type Credit = {
    value?: number
}
export const Credit = ({ value }: Credit) => {

 

    const { locale } = useRouter()

    if (value == undefined || value == null) return null
    
    if (locale == 'en') return <span>{Number((value * 0.00005).toFixed(6))} $</span>
    return <span>{value.toLocaleString()} đ</span>
}