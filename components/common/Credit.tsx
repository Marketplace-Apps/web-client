import { useRouter } from "next/router"

export type Credit = {
    value?: number
}
export const Credit = ({value = 0}: Credit) => {

    const { locale } = useRouter()
    if (locale == 'en') return <span>{(value * 0.00005).toFixed(5)} $</span>
    return <span>{value.toLocaleString()} đ</span>
}