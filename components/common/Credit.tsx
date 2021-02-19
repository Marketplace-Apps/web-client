import { useRouter } from "next/router"

export type Credit = {
    value?: number
}
export const Credit = ({value = 0}: Credit) => {

    const { locale } = useRouter()
    if (locale == 'en') return <span>{Number((value * 0.00005).toFixed(6))} $</span>
    return <span>{value.toLocaleString()} đ</span>
}