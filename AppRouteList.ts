import { AiFillHome, AiOutlineApi } from "react-icons/ai"
import { CgMenuGridO } from "react-icons/cg"
import { FaDollarSign, FaHistory, FaShoppingCart, FaToolbox } from "react-icons/fa"
import firebase from 'firebase'
import { RiContactsFill, RiLogoutCircleRLine, RiServiceFill } from "react-icons/ri"
import { I18N } from "./types"
import { IconType } from "react-icons/lib"
import { useRouter } from "next/router"
import { useAuth } from "firebase-easy-hooks"
import { FcAdvertising, FcApproval, FcAutomatic, FcBusiness, FcBusinessContact, FcBusinessman, FcComboChart, FcConferenceCall, FcCurrencyExchange, FcElectricalSensor, FcElectricity, FcGenealogy, FcLineChart, FcNfcSign, FcServices, FcStumbleupon } from "react-icons/fc"
import { MdCall } from 'react-icons/md'
import { FiAward } from 'react-icons/fi'


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
    return (href == '/' && asPath == '/') || (href != '/' && asPath?.indexOf(href) == 0)
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
        icon: RiServiceFill,
        name: { en: 'Service', vi: 'Dịch vụ' },
        href: '/services',
        color: '#00bcc5'
    },
    Transactions: {
        icon: FaHistory,
        name: { en: 'History', vi: 'Lịch sử' },
        href: '/transactions',
        visible: { guest: false }
    },
    VoucherList: {
        icon: FiAward,
        name: { en: 'Vouchers', vi: 'Khuyến mại' },
        href: '/vouchers',
        visible: { mobile: false }
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
                href: '/me/reports'
            },
            FeedManager: {
                icon: FcAdvertising,
                name: { en: 'Manage feeds', vi: 'Quản lý tin tức' },
                href: '/?edit=true',
                admin: true
            },
            VoucherManager: {
                icon: FcApproval,
                name: { en: 'Manage vouchers', vi: 'Quản lý voucher' },
                href: '/vouchers?edit=true',
                admin: true
            },
            VoucherList: {
                icon: FcStumbleupon,
                name: { en: 'Vouchers', vi: 'Khuyến mại' },
                href: '/vouchers',
                visible: { pc: false } 
            },
            UserManager: {
                icon: FcBusinessman,
                name: { en: 'Manage users', vi: 'Quản lý tài khoản' },
                href: '/me/users',
                admin: true
            },

            ServiceManager: {
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
                href: '/deposit?edit=true',
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
                name: { en: 'Admin', vi: 'Liên hệ' },
                href: '/admin-contact'
            },
            ApikeyManager: {
                icon: FcServices,
                name: { en: 'API', vi: 'API' },
                href: '/me/api' 
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
    Contact: {
        icon: MdCall,
        name: { en: 'Contact', vi: 'Liên hệ' },
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