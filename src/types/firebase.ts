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
		method: string,
		header_name: string
		header_value: string
	}
}

export type DomainParentServiceRefDocument = {

}

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
	credential?: string
}

export type UserDocument = {
	id: string
	avatar_url: string
	balance: number
	email: string
	name: string
	total_deposit: number
}