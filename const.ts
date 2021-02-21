import { FaInstagram, FaTelegram, FaToolbox, FaYoutube } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook2 } from "react-icons/im"
import { RiShoppingBag3Fill } from "react-icons/ri"
import { SiTiktok } from "react-icons/si"

export const DEFAULT_AVATAR = 'https://api.time.com/wp-content/uploads/2019/04/mark-zuckerberg-time-100-2019.jpg?quality=85&zoom=2'



export const BASE_URL = (() => {
    if (process.env.NODE_ENV == 'development') {
        return 'http://192.168.1.232/livequery/'

    }
    if (typeof location == 'undefined') return 'https://api.ongmatmedia.com/livequery/'
    if (location.hostname.includes('localhost') || location.hostname.includes('192.168')) return 'http://192.168.1.232/livequery/'
    return `https://api.${location.hostname.split('.').slice(1).join('.')}/livequery/`
})()

export const WS_URL = BASE_URL.replace('http', 'ws') + 'realtime-updates'

export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyATf0V5INt6D29LAE_nMmUJhlXhC8wzw40',
    authDomain: 'ssm-marketplace.firebaseapp.com',
    databaseURL: 'https://ssm-marketplace.firebaseio.com',
    projectId: 'ssm-marketplace',
    storageBucket: 'ssm-marketplace.appspot.com',
    messagingSenderId: '900124795238',
    appId: '1:900124795238:web:c4297a52569babba0928a7',
    measurementId: 'G-B6JX8YET24',
}

export const NO_PROTECTED_ROUTES = [
    '/auth/sign-in',
    '/deposit',
    '/services',
    '/admin-contact',
    '/vouchers',
    '/'
]


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

export const ServiceList = [
    {
        id: 'facebook',
        icon: ImFacebook2,
        color: '#027bcd',
        name: 'Facebook'
    },
    {
        id: 'tiktok',
        icon: SiTiktok,
        color: '#b70053',
        name: 'Tiktok'
    },
    {
        id: 'instagram',
        icon: FaInstagram,
        color: '#f114ea',
        name: 'Instagram'
    },
    {
        id: 'youtube',
        icon: FaYoutube,
        color: 'red',
        name: 'Youtube'
    },
    {
        id: 'google',
        icon: FcGoogle,
        name: 'Google'
    },
    {
        id: 'shopee',
        icon: RiShoppingBag3Fill,
        color: 'orange',
        name: 'Shopee'
    },
    {
        id: 'telegram',
        icon: FaTelegram,
        color: '#0665d0',
        name: 'Telegram'
    },
    {
        id: 'other',
        icon: FaToolbox,
        color: 'gray',
        name: '... '
    }

]
