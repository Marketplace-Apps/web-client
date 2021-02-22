import useTranslation from "next-translate/useTranslation"
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Card, Col, Modal, Row, Collapse, Form, FormControl, Badge, Button } from "react-bootstrap"
import { Controller, useForm, useFormContext } from "react-hook-form"
import { FiEdit2 } from "react-icons/fi"
import { Prices } from "../../../types"
import { Credit } from "../../common/Credit"
import { PricePackageManagerContext } from "./PricePackageManagerContext"

export type PricePackageManagerServiceOption = {
    service_id: string
    option: Prices[string] & { id: string }
}


export const PricePackageManagerServiceOption = ({ option, service_id }: PricePackageManagerServiceOption) => {

    const { import_price, price_package, edit_mode, form } = useContext(PricePackageManagerContext)

    return (
        <Fragment>
            <Col xs={4}>
                {option.id}
            </Col>
            {
                ['basic', 'guarantee']
                    .map(type => ({
                        type,
                        old_value: import_price?.prices[service_id][option.id][type],
                        is_root: price_package?.id == 'root'
                    }))
                    .map(({ old_value, is_root, type }) => (
                        <Col xs={4} className="text-center" key={type} >
                            <Badge variant="dark"><Credit value={old_value} /></Badge>
                            <Controller
                                name={`prices.${service_id}.${option.id}.${type}`}
                                control={form.control}
                                render={({ value, onChange }) => (
                                    <Fragment>
                                        { value != old_value && <Badge variant={value > old_value ? 'success' : 'danger'} className="ml-1"><Credit value={value} /></Badge>}
                                        { !is_root && value > old_value && <Badge variant="success" className="ml-1">+ {~~((value - old_value) / old_value * 100)}% </Badge>}
                                        { value < old_value && <Badge variant="danger" className="ml-1">{~~((value - old_value) / old_value * 100)}% </Badge>}
                                        { edit_mode && <FiEdit2 color="black"
                                            size={15}
                                            style={{
                                                cursor: 'pointer',
                                                marginLeft: 5
                                            }}
                                            onClick={() => {
                                                const new_price = Number(prompt(
                                                    `Price for [${service_id}.${option.id}.${type}]`,
                                                    value
                                                ))
                                                new_price != NaN && onChange(new_price)
                                            }}
                                        />}
                                    </Fragment>
                                )}
                            />
                        </Col>
                    ))
            }
        </Fragment>
    )
}