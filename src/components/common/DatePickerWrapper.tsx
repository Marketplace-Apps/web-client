import 'react-nice-dates/build/style.css'
import { vi } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import { PropsWithChildren, useRef, useState } from 'react'


export const DatePickerWrapper = (props: PropsWithChildren<{ onChange?: (date: Date) => any }>) => {

    const ua = navigator.userAgent.toLowerCase()
    const isMobile = ua.includes('ios') || ua.includes('android')
    const ref = useRef<HTMLInputElement>()

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
            <span onClick={() => ref.current.click()}>{props.children}</span>
        </>
    )


    return (
        <DatePicker date={date} locale={vi} onDateChange={d => d && onChange(d)}>
            {p => <span onClick={() => p.inputProps.onFocus()}>{props.children}</span>}
        </DatePicker>
    )
}
