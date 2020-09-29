export type DomainServiceDocument = {
	id: string
	icon: string
	name: string
	visible: boolean
	tag: string
	min_price: number
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
	icon: string
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
}

export type ServiceActionConfigDocument = {
	endpoint: string
	method: string
}