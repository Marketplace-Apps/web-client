import { Fragment } from "react";
import { IconType } from "react-icons";


export type OrderStatusBadge = {
    visible?: boolean
    icon: IconType | JSX.Element
    text: string
    has_previous?: boolean
    color?: string
}

export const OrderStatusBadge = (props: OrderStatusBadge) => {

    const color = props.color || '#17a2b8'

    if (props.visible == false) return null

    return (
        <Fragment>
            {
                props.has_previous != false && (
                    <div className="text-center" style={{ color }}>
                        .............
                    </div>
                )
            }
            <div className="text-center" style={{ color }}>
                {typeof props.icon == 'function' ? <props.icon size={40} /> : props.icon}
                <div>{props.text}</div>
            </div>

        </Fragment>
    )
}