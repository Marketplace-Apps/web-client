import { useMemo, useState } from "react"
import { useAction } from "react-livequery-hooks"
import { User, Voucher } from "../types"

export function useVoucher(
    service_id: string,
    user: User,
    total_bill: number,
    server: number = 1
) {

    const { data, excute, clear } = useAction<{}, { data: { items: Voucher[] } }>(user && `domains/${user.domain_id}/vouchers`, 'GET')
    const voucher = data?.data?.items[0]

    function apply_voucher(code: string) {
        excute({}, { code })
    }

    const voucher_error = useMemo(() => {
        if (!voucher) return
        if (voucher.service_id != 'all' && voucher.service_id != service_id) return 'INVAILD_SERVICE'
        if (voucher.server != 0 && voucher?.server != server) return 'INVAILD_SERVER'
        if (voucher.start_time > Date.now()) return 'NOT_ACTIVE'
        if (voucher.end_time < Date.now()) return 'EXPIRED'
        if (voucher.min_require > total_bill) return 'ORDER_TOO_SMALL'
        if (voucher.used >= voucher.limit) return 'NOT_USABLE'
        if (!voucher.levels.includes(user.level)) return 'INVAILD_USER_TYPE'
    }, [])

    const discount = !voucher_error && voucher ? Math.min(voucher.max, ~~(total_bill * voucher.percent / 100)) : 0

    return {
        apply_voucher,
        clear_voucher: clear,
        discount,
        voucher_error,
        voucher
    }
}