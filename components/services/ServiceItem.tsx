import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { Badge } from "react-bootstrap"
import { useHover } from "../../hooks/useHover"
import { ServiceProvider } from "../../types"


type ServiceItem = {
    service: ServiceProvider
    onClick?: Function
}

export const ServiceItem = ({ service, onClick }: ServiceItem) => {

    const router = useRouter()
    const { hovering, listeners } = useHover()
    const { t } = useTranslation('common')

    return (
        <div
            onClick={!service.maintain ? onClick as any : () => { }}
            className="d-flex flex-column justify-content-start align-items-center align-content-center"
            style={{
                height: 120,
                cursor: service.maintain ? 'not-allowed' : 'pointer',
                padding: '15px 0 5px 0',
                boxShadow: !service.maintain && hovering ? "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                borderRadius: 10
            }}
            {...listeners}
        >
            <div className="d-flex justify-content-center align-items-start" style={{ width: 80 }}>
                <img
                    src={service.icon}
                    width={40}
                    height={40}
                    style={{
                        ...service.maintain ? { filter: 'grayscale(1.0)' } : {},
                        borderRadius: '100%'
                    }}
                />
            </div>
            <div className="text-center" style={{ fontSize: 17, color: '#0a6cab' }}>
                {service.name[router.locale]}
                {service.maintain && <Badge style={{ fontSize: 10, marginLeft: 5 }} variant="dark" >{t('maintain')}</Badge>}
            </div>
        </div>
    )
}