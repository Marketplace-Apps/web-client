import firebase from 'firebase'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { UserInfo } from './UserInfo'
import { LinkCard } from './LinkCard'
import { AppRouteList, RouteItem, isActivePath, isVisible } from '../../AppRouteList'
import { useHover } from '../../hooks/useHover'

const PcSidebarMenuItem = (props: RouteItem) => {

    const router = useRouter()
    const visible = isVisible(props)
    const active = isActivePath(props)
    const color = active ? 'white' : (props.color || 'black')
   
    const {hovering, listeners} = useHover()

    if (!visible) return null


    return <Col
        xs={12}
        onClick={() => props.onClick ? props.onClick() : (props.href && router.push(props.href))}
        className="d-flex justify-content-start align-items-center"
        style={{
            padding: 10,
            backgroundColor: active ? '#17a2b8' : 'white',
            borderRadius: '20px 0 0 20px',
            marginTop: 10,
            boxShadow:hovering && 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
        }} 
        {... listeners}
    >
        <props.icon style={{ color, fontSize: '3rem', padding: '5px', height: 40 }} />

        <span
            style={{
                marginLeft: '.5rem',
                fontSize: '1.2rem',
                color,
                fontWeight: 'normal',
            }}
        >
            {props.name[router.locale]}
        </span>
    </Col>
}

export const PcSidebar = () => (
    <Row>
        <Col md={12} style={{ height: 60 }}><UserInfo /></Col>
        <Col md={12} style={{ marginTop: 20 }}>
            <Row style={{ cursor: 'pointer' }}>
                {
                    Object
                        .values(AppRouteList)
                        .filter(item => item.visible?.pc != false)
                        .map(p => <PcSidebarMenuItem key={p.name.en} {...p} />)
                }
            </Row>
        </Col>
    </Row>
)