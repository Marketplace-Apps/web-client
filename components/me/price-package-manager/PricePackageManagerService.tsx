import useTranslation from "next-translate/useTranslation"
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Card, Col, Modal, Row, Collapse, Form, FormControl, Badge, Button, Table } from "react-bootstrap"
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
                margin: 0,
                marginTop: 15,
                borderRadius: 10
            }}
        >
            <Col xs={12}>
                <img src={service.icon} width={30} style={{ borderRadius: '100%' }} />
                <span className="ml-2 font-weight-bold">{service.name[lang]}</span>
            </Col>

            <Col xs={12} className="mt-1">
                <Table striped bordered size="sm" className="mt-2">
                    <thead>
                        <tr>
                            <th> </th>
                            <th>{t('pricing.basic')}</th>
                            <th>{t('pricing.guarantee')}</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>

                </Table>



            </Col>
        </Row>
    )
}