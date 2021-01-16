import 'react-nice-dates/build/style.css'
import * as locales from 'date-fns/locale'
import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import { PropsWithChildren, useRef, useState } from 'react'
import { useRouter } from 'next/router'


export const DatePickerWrapper = (props: PropsWithChildren<{ onChange?: (date: Date) => any }>) => {

    const ua = navigator.userAgent.toLowerCase()
    const isMobile = ua.includes('iphone') || ua.includes('android')
    const ref = useRef<HTMLInputElement>()
    const { locale } = useRouter()
    const [date, setDate] = useState(new Date())

    function onChange(d: Date) {
        props.onChange && props.onChange(d)
        setDate(d)
    }

    if (isMobile) return (
        <>
            <div style={{ position: 'fixed', top: -1000 }}>
                <input type="date" onChange={e => onChange(new Date(e.target.value))} ref={ref} />
            </div>
            <span onClick={() => {
                ref.current.focus()
                ref.current.click()
            }}>{props.children}</span>
        </>
    )


    return (
        <DatePicker date={date} locale={locales[locale] || enUS} onDateChange={d => d && onChange(d)}>
            {p => <span onClick={() => p.inputProps.onFocus()}>{props.children}</span>}
        </DatePicker>
    )
}

