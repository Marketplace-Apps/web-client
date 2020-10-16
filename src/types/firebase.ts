export type DomainServiceDocument = {
	id: string
	icon: string
	name: string
	visible: boolean
	tag: string
	min_price: number
}

export type ServiceConfigDocument = {
	id: string
	user_id: string
	auth: {
		method: string
		header_name: string
		header_value: string
	}
}

export type DomainParentServiceRefDocument = {}

export type ServiceOrderDocument = {
	id: string
	user_id: string
	status: string
	created_at: number
	updated_at: number
}

export type ServiceFileDocument = {
	id: string
	user_id: string
	resource_url: string
	created_at: number
	updated_at: number
}

export type DomainDocument = {
	id: string
	domain_name: string
	site_name: string
	background_color: string
	logo_url: string
	currency: string
	owner: string
	created_at: number
	updated_at: number
}

export type ServiceActionDocument = {
	id: string
	icon: string
	name: string
	form: any
	price_function: string
	advanced_options: any
	action_type: {
		type: string
		by?: string
	}
	is_order_action: boolean
	config?: object
}

export type ServiceActionConfigDocument = {
	endpoint: string
	method: string
}

export type PaymentMethodDocument = {
	id: string
	user_id: string
	type: string
	owner_name: string
	bank_number: string
	logo_url: string
	active: boolean
	note: string
}

export type UserDocument = {
	id: string
	avatar_url: string
	balance: number
	email: string
	name: string
	total_deposit: number
}

export type OrderDocument = {
	id: string
	amount: number
	remain_amount: number
	target: string
	type: string
	created_at: number
	end_time: number
	status: string
	fullname: string
	description: string
	user_id: string
}

export type PaymentHistoryDocument = {
	id: string
	icon: string
	amount: number
	service_name: string
	total: number
	created_at: number
	message: string
	from?: string
	from_user_id?: string
	to?: string
	to_user_id?: string
}
