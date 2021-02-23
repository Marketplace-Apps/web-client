import { Badge } from "react-bootstrap" 
import { User } from "../../types"
import { Credit } from "../common/Credit"

export type UserItem = {
    user: User
    onClick?: Function
    level_name?: string
}

export const UserItem = (props: UserItem) => {
    return (
        <div
            className="d-flex justify-content-start m-2"
            style={{
                border: '1px solid #1ebdea',
                borderRadius: 10,
                cursor: 'pointer'
            }}
            onClick={props.onClick as any}
        >
            <div style={{
                backgroundImage: `url("${props.user.avatar}")`,
                backgroundPosition: 'center',
                width: 80,
                height: 80,
                borderRadius: '10px 0 0 10px',
                minWidth: 70,
                border: '1px solid #1ebdea '
            }} />
            <div className="ml-2 mt-1">
                <div className="font-weight-bold" style={{ color: '#1ebdea' }}>{props.user.name} <Badge variant="primary">
                    {props.level_name}</Badge>
                </div>
                <div style={{ color: '#1ebdea' }}>{props.user.email}</div>
                <div  >
                    <span className="font-weight-bold" style={{ color: 'orange' }}>
                        <Credit value={props.user?.balance} />
                    </span>
                </div>
            </div>
        </div>
    )
}