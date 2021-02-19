import { User, Voucher } from "../types"

export function caculate_voucher(
    voucher: Voucher,
    service_id: string,
    user: User,
    total_bill: number,
    server: number = 1
) {
    if (voucher.service_id != 'all' && voucher.service_id != service_id) return 0
    if (voucher?.server != 0 && voucher?.server != server) return 0
    if (voucher.start_time > Date.now() || voucher.end_time < Date.now()) return 0
    if (voucher.min_require > total_bill) return 0
    if (voucher.used >= voucher.limit) return 0
    if (!voucher.levels.includes(user.level)) return 0
    const amount = Math.min(voucher.max, ~~(total_bill * voucher.percent / 100))
    return amount
}