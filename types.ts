type FirebaseUser = { uid: string, admin: true }


export declare class BaseEntity {
    id: string;
    created_at: number;
    ref: string;
}
export declare class Config<T> {
    id: string;
    value: T;
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

export declare class Feed extends BaseEntity {
    domain_id: string;
    language: string;
    content: string;
    payment_tab: boolean;
    home_tab: boolean;
}
export declare class I18N {
    en: string;
    vi?: string;
    tl?: string;
    cn?: string;
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


export declare type Prices = {
    [option_id: string]: {
        basic: number;
        guarantee: number;
        label: I18N;
    };
};
export declare type ServicePriceList = {
    [service_id: string]: Prices;
};
export declare class PricePackage extends BaseEntity {
    prices: ServicePriceList;
    description?: string
    name: string;
    domain_id: string;
}
export declare class SendMoneyPayload {
    to: string;
    amount: number;
    voucher_apply?: boolean;
    note: string;
}


export declare class ServiceCategory extends BaseEntity {
    name: I18N;
    icon: string;
}


export declare class ServiceProvider extends BaseEntity {
    user_id?: string;
    maintain?: boolean;
    name: I18N;
    type: 'one-time' | 'duration' | 'times';
    icon: string;
    category: string;
}







export declare class ServiceProviderItemOption<T> {
    label?: I18N;
    value: any;
    icon?: string;
    color?: string;
    visible_condition?: (data: T) => boolean;
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
declare type InputMask = 'text' | 'number' | 'switch' | 'textarea' | 'select' | 'icon-select' | 'button-select' | 'facebook-video' | 'facebook-profile-page' | 'image';
export declare type ServiceProviderActionForm<T> = {
    [name: string]: ServiceProviderActionFormItem<T>;
};
export interface ServiceProviderActionFormItem<T = any> {
    id
    alerts?: Array<ServiceProviderFormItemAlert<T>>;
    placeholder: I18N;
    label: I18N;
    default_value?: string;
    require?: boolean;
    optional?: boolean;
    type: string;
    input_mask: InputMask;
    visible_condition: (data: T) => boolean;
    options: ServiceProviderItemOption<any>[];
}
export declare type ActionMetadata<T = any> = {
    requester: FirebaseUser;
    user: User;
    service: ServiceProvider;
    action_id: string;
    order?: Order;
    payload: T;
    total: number;
    price: number;
    min_price: number;
    remote_prices: Prices;
};
export declare type PriceFunctionParams<T = any> = {
    user: User;
    order?: Order;
    payload?: T;
    package_prices: Prices;
};
export declare class ServiceProviderAction<T = any, Utils = any> extends BaseEntity {
    service_id: string;
    price: (params: PriceFunctionParams<T>) => {
        total: number;
        price: number;
        min_price: number;
    };
    process: (utils: Utils & ActionMetadata<T>) => Promise<void>;
    form: ServiceProviderActionForm<T>;
    visible_condition?: (order: Order) => boolean;
    can_use_voucher?: boolean;
    name: I18N;
}
export { };


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
    level?: string;
    total_deposit: number;
    total_used: number;
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
    service_id: string;
    server: number;
    levels: String[];
}
