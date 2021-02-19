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
            style={{ display: search && !JSON.stringify(service.name).includes(search) && 'none' }}
        >
            <Col xs={12}>
                <img src={service.icon} width={30} />
                <span>{service.name.en}</span>
            </Col>

            <Col xs={4}> </Col>
            <Col xs={4} className="text-center">{t('pricing.basic')}</Col>
            <Col xs={4} className="text-center">{t('pricing.guarantee')}</Col>
            {
                Object
                    .entries(import_price.prices[service.id] || {})
                    .map(([option_id, option]) => (
                        <PricePackageManagerServiceOption
                            option={{ ...option, id: option_id }}
                            service_id={service.id}
                            key={option_id}
                        />
                    ))
            }
        </Row>
    )
}