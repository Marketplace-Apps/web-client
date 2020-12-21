import { useDomain } from '../../hooks/useDomain'
import Link from 'next/link'
import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { ChangeLanguage } from './ChangeLanguage'

export const PcHeader = () => {

    const domain = useDomain()

    return (
        <Row style={{ width: '100%', margin: 0 }}>
            <Col xs={2}></Col>
            <Col xs={8} className="d-flex justify-content-center align-items-center">
                <Image
                    style={{ maxWidth: '80px', borderRadius: '50%' }}
                    fluid
                    className="banner-top__logo"
                    src={domain?.icon}
                />
                <span style={{ marginLeft: 20, fontSize: 35, fontWeight: 'bold', color: 'white' }}>{domain?.name}</span>
            </Col>
            <Col
                className="d-flex justify-content-end align-items-center"
                xs={2} >
                <ChangeLanguage />
            </Col>
        </Row>
    )
} 