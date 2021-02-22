import Link from "next/link";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import { IconType } from "react-icons/lib";
import { useHover } from "../../hooks/useHover";
import { I18N } from "../../types";

export type LinkCard = {
    name: I18N,
    href?: string,
    icon: IconType | string | any,
    color?: string,
    onClick?: Function,

}



export const LinkCard = ({
    icon: Icon,
    name,
    href,
    color,
    onClick,
}: LinkCard) => {

    const router = useRouter()
    const { hovering, listeners } = useHover()

    const Card = (
        <Row noGutters
            style={{
                boxShadow: hovering ? "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                margin: "10px 0 0 0",
                padding: "15px 10px 15px 10px",
                cursor: "pointer",
                textAlign: "center",
                width: '100%',
                borderRadius:10
            }}
            onClick={onClick as any}
            {...listeners}
        >
            <Col
                md={12}
                xs={2}
                className="d-flex justify-content-center align-items-center"
            >
                {typeof Icon == "string" && (<img src={Icon} width={40} />)}
                {typeof Icon == "function" && <Icon color={color} size={40} />}
            </Col>
            <Col
                xs="auto"
                md={12}
                className="d-flex justify-content-center align-items-center"
            >
                {name[router.locale]}
            </Col>
        </Row>
    );

    return href ? <Link href={href}>{Card}</Link> : Card
}