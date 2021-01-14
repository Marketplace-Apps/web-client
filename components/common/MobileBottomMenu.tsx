import { useAuth } from "firebase-easy-hooks"
import Link from "next/link"
import { useRouter } from "next/router"
import { AppRouteList, isActivePath, isVisible } from "../../AppRouteList"
import { LinkCard } from "./LinkCard"

const MobileBottomMenuItem = (props: LinkCard) => {

    const router = useRouter()
    const visible = isVisible(props)
    const active = isActivePath(props)
    const color = active ? '#5287e8' : (props.color || '#666666')
    if (!visible) return null

    return <Link href={props.href} key={props.href}>
        <div className="text-center" style={{ cursor: 'pointer' }}>
            <props.icon style={{ color }} size={25} />
            <div style={{ color, fontSize: 16  }}>
                {props.name[router.locale]}
            </div>
        </div>
    </Link>
}

export const MobileBottomMenu = () => (
    <div
        className="d-flex justify-content-around align-items-center"
        style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px 0px rgba(50, 50, 50, 1)',
            padding: 10
        }}
    >
        {
            Object
                .values(AppRouteList)
                .filter(item => item.visible?.mobile != false)
                .map(p => <MobileBottomMenuItem key={p.href} {...p} />)
        }
    </div>
)