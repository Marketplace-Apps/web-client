import { DomainService, User, Voucher } from "../types"

export function caculate_voucher(
    voucher: Voucher,
    domain_service: DomainService,
    user: User,
    total_bill: number,
    server: number = 1
) {
    if (!voucher) return 0
    const user_price = user.prices[domain_service.id] && user.prices[domain_service.id][server]
    const domain_price = domain_service.prices[server]
    const has_private_price = (
        (user_price?.basic && user_price.basic != domain_price.basic)
        || (user_price?.guarantee && user_price.guarantee != domain_price.guarantee)
    ) 
    if (voucher.service != 'all' && voucher.service != domain_service.id) return 0
    if (voucher?.server != 0 && voucher?.server != server) return 0
    if (voucher.start_time > Date.now() || voucher.end_time < Date.now()) return 0
    if (voucher.min_require > total_bill) return 0
    if (voucher.used == voucher.limit) return 0
    if (!voucher.allow_private_price && has_private_price) return 0
    return Math.min(voucher.max, ~~(total_bill * voucher.percent / 100))
}