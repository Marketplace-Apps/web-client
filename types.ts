export declare class BaseEntity {
    id: string;
    created_at: number;
    ref: string;
}

export declare class Domain extends BaseEntity {
    owner_id: string;
    domains: string[];
    name: string;
    refs: String[];
    icon: string;
    phone_number: string;
    zalo: string;
    facebook: string;
    telegram: string;
}



export declare class DomainServiceTag {
    title: string;
    color?: string;
    background_color: string;
    border?: string;
}
export declare type DomainServicePrice = {
    basic: number;
    guarantee: number;
};
export declare class DomainService extends BaseEntity {
    domain_id: string;
    maintain?: boolean;
    prices: {
        [server: string]: DomainServicePrice;
    };
    name: I18N;
    icon: string;
    category: ServiceCategory;
}

export declare class Feed extends BaseEntity {
    domain_id: string;
    language: string;
    content: string;
    payment_tab: boolean;
    home_tab: boolean;
}
export declare class I18N {
    en: string
    vi?: string
}
export declare const LanguageList: readonly ["vi-VN", "en-US"];


export declare type OrderStatus = 'created' | 'running' | 'error' | 'error-refunded' | 'done' | 'deleted';
export declare class Order<T = any> extends BaseEntity {
    user_id: string;
    service_id: string;
    domain_id: string;
    target: string;
    title: string;
    description?: string;
    thumbnail: string;
    running?: boolean;
    active?: boolean;
    error?: boolean;
    refunded?: boolean;
    done?: boolean;
    deleted?: boolean;
    total: number;
    server?: number;
    note: string;
    amount: number;
    end_time?: number;
    remain_amount?: number;
    voucher?: string;
    metadata: T;
    logs: Array<{
        created_at: number;
        message: I18N;
        admin: boolean;
    }>;
    start_count?: number;
    last_count?: number;
}
export declare class OrderInput {
    active?: boolean;
    error?: boolean;
    refunded?: boolean;
    done?: boolean;
    deleted?: boolean;
    metadata: any;
    voucher?: string;
}


export declare class PaymentHistory extends BaseEntity {
    user_id: string;
    domain_id: string;
    description?: I18N;
    service_id: string;
    total: number;
    balance_after: number;
    voucher?: {
        code: string;
        percent?: number;
        amount?: number;
    };
}

export declare class PaymentMethod extends BaseEntity {
    domain_id: string;
    name: string;
    icon: string;
    account_name: string;
    account_number: string;
    secret_key?: string;
}
export declare class SendMoneyPayload {
    to: string;
    amount: number;
    voucher_apply?: boolean;
    note: string;
}
export declare type ServiceCategory = 'facebook' | 'instagram' | 'shopee' | 'tiktok';



export declare class ServiceProviderItemOption {
    label?: I18N;
    value: any;
    icon?: string;
    color?: string;
    disabled?: boolean;
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
declare type InputMask = 'text' | 'number' | 'switch' | 'textarea' | 'select' | 'icon-select' | 'button-select' | 'facebook-video' | 'facebook-profile-page' | 'image' | 'price';
export declare class ServiceProviderActionFormItem extends BaseEntity {
    alerts?: Array<ServiceProviderFormItemAlert<any>>;
    placeholder: I18N;
    label: I18N;
    default_value?: string;
    require?: boolean;
    optional?: boolean;
    type: string;
    input_mask: InputMask;
    options: ServiceProviderItemOption[];
}
export declare type ServiceProviderActionForm = {
    [name: string]: ServiceProviderActionFormItem;
};


export declare class ServiceProviderAction extends BaseEntity {
    service_id: string;
    active: boolean;
    hidden: boolean;
    price: string;
    process: string;
    form: ServiceProviderActionForm;
    validator?: string;
    color?: string;
    can_use_voucher?: boolean;
    payment_note: string;
    name: I18N;
}
export { };



export declare class ServiceProvider<T> extends BaseEntity {
    user_id?: string;
    maintain?: boolean;
    name: I18N;
    type: 'one-time' | 'duration' | 'times';
    category: ServiceCategory;
    icon: string;
    config?: T;
    number_of_servers: number;
}


export declare class ServiceStatic extends BaseEntity {
    label: I18N;
    service_id: string;
    value: string;
}


export declare class User extends BaseEntity {
    balance: number;
    name: string;
    domain_id: string;
    email: string;
    prices?: {
        [service: string]: DomainService['prices'];
    };
    total_deposit: number;
    total_used: number;
    ref: string;
    avatar: string;
    api_key: string;
}

export declare class Voucher extends BaseEntity {
    domain_id: string;
    code: string;
    start_time: number;
    end_time: number;
    percent: number;
    max: number;
    min_require?: number;
    limit: number;
    used: number;
    service: string;
    server: number;
    ref: string;
    allow_private_price: boolean;
}
