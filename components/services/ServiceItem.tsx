import { useRouter } from "next/router"
import { Badge } from "react-bootstrap"
import { useHover } from "../../hooks/useHover"
import { DomainService } from "../../types"


type ServiceItem = {
    service: DomainService
    onClick?: Function
}

export const ServiceItem = ({ service, onClick }: ServiceItem) => {

    const router = useRouter()
    const { hovering, listeners } = useHover()

    return (
        <div
            onClick={onClick as any}
            className="d-flex flex-column justify-content-start align-items-center align-content-center"
            style={{
                height: 120,
                cursor: 'pointer',
                padding: '15px 0 5px 0',
                boxShadow: hovering ? 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' : ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                borderRadius: 10
            }}
            {...listeners}
        >
            <div className="d-flex justify-content-center align-items-start" style={{ width: 80 }}>
                <img
                    src={service.icon}
                    width={40}
                    height={40}
                />
                <Badge
                    pill
                    variant="danger"
                    style={{ position: 'absolute', top: 15, marginLeft: 40 }}
                >{service.promote_price} đ </Badge>
            </div>
            <div className="text-center" style={{ fontSize: 17, color: '#0a6cab' }}>
                {service.name[router.locale]}
            </div>
        </div>
    )
}