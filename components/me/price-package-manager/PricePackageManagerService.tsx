import useTranslation from "next-translate/useTranslation"
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Card, Col, Modal, Row, Collapse, Form, FormControl, Badge, Button } from "react-bootstrap"
import { PricePackage, ServicePriceList, ServiceProvider } from "../../../types"
import { PricePackageManagerContext } from "./PricePackageManagerContext"
import { PricePackageManagerServiceOption } from "./PricePackageManagerServiceOption"

export type PricePackageManagerService = {
    service: ServiceProvider
}

export const PricePackageManagerService = ({ service }: PricePackageManagerService) => {

    const { search, import_price } = useContext(PricePackageManagerContext)
    const { t, lang } = useTranslation('common')

    return (
        <Row
            noGutters
            style={{
                display: search && !JSON.stringify(service.name).includes(search) && 'none',
                boxShadow: ' rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                padding: 10,
                margin: 0,
                marginTop: 15,
                borderRadius: 10
            }}
        >
            <Col xs={12}>
                <img src={service.icon} width={30} />
                <span className="ml-1">{service.name[lang]}</span>
            </Col>

            <Col xs={12}>
                <Row>
                    <Col xs={4}> </Col>
                    <Col xs={4} className="text-center">{t('pricing.basic')}</Col>
                    <Col xs={4} className="text-center">{t('pricing.guarantee')}</Col>
                </Row>
                {
                    Object
                        .entries(import_price?.prices?.[service.id] || {})
                        .map(([option_id, option]) => (
                            <PricePackageManagerServiceOption
                                option={{ ...option, id: option_id }}
                                service_id={service.id}
                                key={option_id}
                            />
                        ))
                }
            </Col>
        </Row>
    )
}