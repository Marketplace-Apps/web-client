export const DEFAULT_AVATAR = 'https://api.time.com/wp-content/uploads/2019/04/mark-zuckerberg-time-100-2019.jpg?quality=85&zoom=2'

export const OrderStatusList = {
    default: { color: 'linear-gradient(to right, #bbd2c5, #536976)' },
    deleted: { color: 'linear-gradient(to right, #232526, #414345)' },
    error: { color: 'linear-gradient(to right, #ff416c, #ff4b2b)' },
    done: { color: 'linear-gradient(to right, #00b4db, #0083b0)' },
    refunded: { color: 'linear-gradient(to right, #00b4db, #0083b0)' },
    active: { color: 'orange' },
    running: { color: 'linear-gradient(to right, #1d976c, #93f9b9)' }
}

export const OrderStatusClear = Object
    .keys(OrderStatusList)
    .reduce((p, c) => ({ ...p, [c]: undefined }), {})