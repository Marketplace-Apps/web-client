import { AiFillWarning, AiTwotoneAlert } from "react-icons/ai"
import { FaCheckCircle, FaTimes } from "react-icons/fa"
import { FcExpired } from "react-icons/fc"

export const SERVICE_TAGS = [
	{
		name: 'Facebook',
		value: 'facebook',
	},
	{
		name: 'Instagram',
		value: 'instagram',
	},
	{
		name: 'Tiktok',
		value: 'tiktok',
	},
]

export const AUTH_METHODS = [
	{
		name: 'API Key',
		value: 'api_key',
	},
]

export const SINGLE_VALUE_INPUTS = ['text', 'number', 'video input', 'textarea']
export const MULTIPLE_VALUES_INPUTS = [
	'select',
	'radio',
	'checkbox',
	'icon_select',
	'button_select',
]
export const ALERT = 'alert'

export enum ALERT_TYPES {
	ERROR = 'error',
	WARNING = 'warning',
	SUCCESS = 'success',
	INFO = 'info',
}

export const BASE_URL =
	'https://unhgl5ql7g.execute-api.ap-southeast-1.amazonaws.com'

export const OrderStatus = {
	done: {
		color: 'linear-gradient(to right, #00b4db, #0083b0)',
		vi: 'Đã hoàn thành',
		icon: FaCheckCircle
	},
	error: {
		color: 'linear-gradient(to right, #f85032, #e73827)',
		vi: 'Lỗi',
		icon: AiFillWarning
	},
	created: {
		color: 'linear-gradient(to right, #fdc830, #f37335)',
		vi: 'Đã tạo',
		icon: FaTimes
	},
	running: {
		color: 'linear-gradient(to right, #11998e, #38ef7d)',
		vi: 'Đang chạy',

	},
	expired: {
		color: 'linear-gradient(to right, #536976, #292e49)',
		vi: 'Hết hạn',
		icon: FcExpired
	},
	reported: {
		color: ' linear-gradient(to right, #ff416c, #ff4b2b)',
		vi: 'Đã báo lỗi',
		icon: AiTwotoneAlert
	}
}