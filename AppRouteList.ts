import { AiFillHome } from "react-icons/ai"
import { CgMenuGridO } from "react-icons/cg"
import { FaDollarSign, FaHistory, FaShoppingCart } from "react-icons/fa"
import firebase from 'firebase'
import { RiContactsFill, RiLogoutCircleRLine } from "react-icons/ri"
import { I18N } from "./types"
import { IconType } from "react-icons/lib"
import { useRouter } from "next/router"
import { useAuth } from "firebase-easy-hooks"
import { FcAdvertising, FcAutomatic, FcBusiness, FcBusinessContact, FcBusinessman, FcComboChart, FcConferenceCall, FcCurrencyExchange, FcElectricalSensor, FcElectricity, FcGenealogy, FcLineChart, FcNfcSign } from "react-icons/fc"
import { MdCall } from 'react-icons/md'


export type RouteItem = {
    admin?: boolean
    name: I18N,
    href?: string,
    icon: IconType | string | any,
    color?: string,
    onClick?: Function,
    visible?: { guest?: boolean, logged?: boolean, mobile?: boolean, pc?: boolean },
    children?: {
        [key: string]: RouteItem
    }
}

export type AppRouteList = {
    [key: string]: RouteItem
}

export function isActivePath({ href }: RouteItem) {
    const { asPath } = useRouter()
    return (href == '/' && asPath == '/') || (href != '/' && asPath?.includes(href))
}

export function isVisible(link: RouteItem) {
    const { user } = useAuth()
    const { visible = {} } = link
    if ((visible.guest ?? true) && !user) return true
    if ((visible.logged ?? true) && user) return true
}

export const AppRouteList: AppRouteList = {
    Home: {
        icon: AiFillHome,
        name: { en: 'Home', vi: 'Trang chủ' },
        href: '/'
    },
    Deposit: {
        icon: FaDollarSign,
        name: { en: 'Deposit', vi: 'Nạp tiền' },
        href: '/deposit',
        visible: { guest: false }
    },
    Services: {
        icon: FcElectricalSensor,
        name: { en: 'Service', vi: 'Dịch vụ' },
        href: '/services',
        color: 'orange'
    },
    Tools: {
        icon: FcNfcSign,
        name: { en: 'Tools', vi: 'Tiện ích' },
        href: '/tools',
        visible: { guest: false }
    },
    Transactions: {
        icon: FaHistory,
        name: { en: 'Transactions', vi: 'Lịch sử' },
        href: '/transactions',
        visible: { guest: false, mobile: false }
    },
    Me: {
        icon: CgMenuGridO,
        name: { en: 'Me', vi: 'Cá nhân' },
        href: '/me',
        visible: { guest: false },
        children: {
            Report: {
                icon: FcComboChart,
                name: { en: 'Reports', vi: 'Báo cáo' },
                href: '/me/reports',
                admin: true
            },
            Transactions: {
                icon: FcElectricity,
                name: { en: 'Transactions', vi: 'Lịch sử' },
                href: '/transactions'
            },
            NotificationManager: {
                icon: FcAdvertising,
                name: { en: 'Manage notifications', vi: 'Quản lý thông báo' },
                href: '/me/notifications',
                admin: true
            },

            UserManager: {
                icon: FcBusinessman,
                name: { en: 'Manage users', vi: 'Quản lý tài khoản' },
                href: '/me/users',
                admin: true
            },

            AgencyManager: {
                icon: FcConferenceCall,
                name: { en: 'Manage agencies', vi: 'Quản lý đại lý' },
                href: '/me/agencies',
                admin: true
            },

            SermiveManager: {
                icon: FcGenealogy,
                name: { en: 'Manage services', vi: 'Cài đặt dịch vụ' },
                href: '/me/services',
                admin: true
            },
            PayementMethodManager: {
                icon: FcCurrencyExchange,
                name: {
                    en: 'Manage payment methods',
                    vi: 'Quản lý phương thức thanh toán'
                },
                href: '/me/payment-methods',
                admin: true
            },
            SiteConfig: {
                icon: FcAutomatic,
                name: { en: 'Config site', vi: 'Quản lý site' },
                href: '/me/site-config',
                admin: true
            },

            Contact: {
                icon: FcBusinessContact,
                name: { en: 'Admin contact', vi: 'Liên hệ admin' },
                href: '/admin-contact'
            },
            Logout: {
                icon: RiLogoutCircleRLine,
                name: { en: 'Logout', vi: 'Đăng xuất' },
                onClick: () => {
                    firebase.auth().signOut()
                }
            },

        }
    },
    Contact1: {
        icon: MdCall,
        name: { en: 'Admin contact', vi: 'Liên hệ admin' },
        href: '/admin-contact',
        visible: { mobile: true, logged: false }
    },
    Login: {
        icon: RiLogoutCircleRLine,
        name: { en: 'Login', vi: 'Đăng nhập' },
        href: 'auth/sign-in',
        visible: { guest: true, logged: false }
    },
    Logout: {
        icon: RiLogoutCircleRLine,
        name: { en: 'Logout', vi: 'Đăng xuất' },
        onClick: () => firebase.auth().signOut(),
        visible: { guest: false, logged: true, mobile: false }
    },
}