import { Button, ButtonProps, Spinner } from "react-bootstrap";
import { IconBaseProps, IconType } from "react-icons";

export type IconButton = ButtonProps & {
    icon?: IconType,
    iconProps?: IconBaseProps,
    loading?: boolean
    loadingtext?: string
}
export const IconButton = (props: IconButton) => {
    const { children, iconProps = {}, loading, loadingtext, icon: Icon, ...buttonProps } = props
    return (
        <Button {...buttonProps}>
            {!loading && props.icon && <Icon {...iconProps} className="mb-1 mr-1" />}
            {loading && <Spinner animation="border" size="sm" className="mr-2" />}
            {loading ? props.loadingtext : children}
        </Button>
    )
}