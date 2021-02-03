import { useRef, useState } from "react"


export const useCopy = () => {

    const [copied, set_copied] = useState<boolean>(false)

    const timer = useRef<ReturnType<typeof setTimeout>>()

    const copy = (content: string) => {
        if (timer.current) clearTimeout(timer.current)
        set_copied(true)
        timer.current = setTimeout(() => set_copied(false), 500)

        const textarea = document.createElement('textarea')
        document.body.appendChild(textarea)
        textarea.value = content
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
    }

    return { copied, copy }
}