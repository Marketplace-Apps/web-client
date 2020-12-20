export declare class BaseEntity {
    id: string;
    created_at: number;
}

export declare class Domain extends BaseEntity {
    owner_id: string;
    domains: string[];
    name: string;
    refs: String[];
    icon?:string
}


export declare class DomainServiceTag {
    title: string;
    color?: string;
    background_color: string;
    border?: string;
}
export declare class DomainService extends BaseEntity {
    domain_id: string;
    price: number;
    guarantee_price: number;
    category: 'facebook' | 'instagram' | 'shopee';
    name: I18N;
    icon: string;
    allow_lost_profit?: boolean;
    maintain:boolean
}
export declare class I18N {
    en: string;
    vi?: string;
    tl?: string;
    cn?: string;
}
export declare const LanguageList: readonly ["vi", "en", "tl", "cn"];


export declare class Notification extends BaseEntity {
    user_id: string;
    domain_id: string;
    title: string;
    description?: string;
    icon?: string;
    language: typeof LanguageList[number];
    images: string[];
}


export declare class Order extends BaseEntity implements OrderInput {
    user_id: string;
    service_id: string;
    domain_id: string;
    target: string;
    title: string;
    description?: string;
    thumbnail: string;
    service_icon: string;
    status: string;
    total: number;
    note: string;
    amount: number;
    end_time?: number;
    remain_amount?: number;
    server: string;
    voucher?: string;
    metadata: any;
}
export declare class OrderInput {
    target: string;
    amount: number;
    days?: number;
    voucher?: string;
    server?: string;
    note: string;
}
export declare class OrderRenew {
    n: number;
    voucher?: string;
}


export declare class PaymentHistory extends BaseEntity {
    user_id: string;
    icon: string;
    domain_id: string;
    description?: I18N;
    service_id: string;
    service: I18N;
    amount: number;
    total: number;
    balance_after: number;
}

export declare class PaymentMethod extends BaseEntity {
    type: string;
    domain_id: string;
    name: string;
    icon: string;
    account_name: string;
    account_number: string;
    secret_key?: string;
}


export declare type ServiceActionList = 'ADD' | 'RENEW' | 'DELETE' | 'EDIT';
export declare const ServiceActionMap: {
    ADD: string;
    RENEW: string;
    EDIT: string;
    DELETE: string;
};
export declare class ServiceProviderItemOption {
    label?: I18N;
    value: any;
    icon?: string;
}
export declare class ServiceProviderFormItemAlert<T> {
    content: {
        [key in keyof I18N]: (data: T) => string;
    };
    icon?: string;
    visible_condition: (data: T) => boolean;
    type: 'alert';
    level: 'info' | 'success' | 'warning' | 'error';
    url?: I18N;
    urlText?: I18N;
}
export declare class ServiceProviderFormItem<T> {
    placeholder: I18N;
    label: I18N;
    default_value?: (data: T) => any;
    required?: boolean;
    optional?: boolean;
    editable?: boolean;
    is_number?: boolean;
    input_mask: 'text' | 'textarea' | 'select' | 'icon-select' | 'button-select' | 'facebook-video' | 'facebook-profile-page';
    options: ServiceProviderItemOption[];
}
export declare type ServiceProviderCreatePriceAgruments<T> = {
    data: T;
    price: number;
    guarantee_price: number;
};
export declare type ServiceProviderEditPriceAgruments<T> = {
    payload: Partial<T>;
    order: T;
    price: number;
    guarantee_price: number;
};
export declare type ServiceProviderRenewPriceAgruments<T> = {
    n: number;
    order: T;
    price: number;
    guarantee_price: number;
};
export declare type ServiceProviderDelPriceAgruments<T> = {
    order: T;
    price: number;
    guarantee_price: number;
};
export declare type FormItem<T> = ServiceProviderFormItem<T> & {
    name: string;
    alerts?: Array<ServiceProviderFormItemAlert<T>>;
    require: boolean;
};
export declare type Form<T> = FormItem<T>[];
export declare type Prices<T> = {
    ADD: (data: ServiceProviderCreatePriceAgruments<T>) => number;
    EDIT?: (data: ServiceProviderEditPriceAgruments<T>) => number;
    RENEW?: (data: ServiceProviderRenewPriceAgruments<T>) => number;
    DELETE?: (data: ServiceProviderDelPriceAgruments<T>) => number;
};
export declare class ServiceProvider<T> extends BaseEntity {
    user_id?: string;
    maintain?: boolean;
    name: I18N;
    type: 'one-time' | 'days' | 'times';
    icon: string;
    form: Form<T>;
    prices: Prices<T>;
    bypass_api_error?: boolean;
    webhook?: boolean;
}

export declare class User extends BaseEntity {
    balance: number;
    name: string;
    domain_id: string;
    email: string;
    prices?: {
        [service: string]: {
            price?: number;
            guarantee_price?: number;
        };
    };
    total_deposit: number;
    total_used: number;
}



export declare class Voucher extends BaseEntity {
    domain_id: string;
    code: string;
    title: I18N;
    start_time: number;
    end_time: number;
    percent: number;
    max: number;
    min_require?: number;
    limit: number;
    used: number;
    min_balance: number;
    when: ServiceActionList;
    services: string[];
}
