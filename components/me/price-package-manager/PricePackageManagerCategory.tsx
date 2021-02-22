import useTranslation from "next-translate/useTranslation"
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Card, Col, Modal, Row, Collapse, Form, FormControl, Badge, Button } from "react-bootstrap"
import { Controller, useForm, useFormContext } from "react-hook-form"
import { AiFillCloseCircle, AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai"
import { FaAngleDoubleRight, FaAngleDoubleUp } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { IoMdClose } from "react-icons/io"
import { MdEdit } from "react-icons/md"
import { useDocumentData } from "react-livequery-hooks"
import { ServiceList } from "../../../const"
import { groupBy2Key } from "../../../helpers/group"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { useDomain } from "../../../hooks/useDomain"
import { useServices } from "../../../hooks/useServices"
import { PricePackage, ServicePriceList, ServiceProvider } from "../../../types"
import { PricePackageManagerContext } from "./PricePackageManagerContext"
import { PricePackageManagerService } from "./PricePackageManagerService"

export type PricePackageManagerCategory = {
    category: typeof ServiceList[0]
    services: ServiceProvider[]
}
export const PricePackageManagerCategory = (props: PricePackageManagerCategory) => {

    const { color, icon: Icon, id, name } = props.category
    const [open, set_open] = useState(true)

    return (
        <Card>
            <Card.Header style={{ cursor: 'pointer', margin: 0, marginTop: 10 }} onClick={() => set_open(!open)}>
                <Row>
                    <Col xs={10} className="d-flex justify-content-start align-items-center">
                        <Icon color={color} />
                        <span className="ml-1 font-weight-bold" style={{ color }}>{name}</span>
                        {props.services.length > 0 && <Badge variant="light" style={{ border: '1px solid gray' }} className="ml-1">{props.services.length}</Badge>}
                    </Col>
                    <Col xs={2} className="text-right">
                        {open ? <FaAngleDoubleUp color={color} /> : <FaAngleDoubleRight color={color} />}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Collapse in={open}>
                    <Row >
                        {
                            props.services.map(service => (
                                <Col xs={12}>
                                    <PricePackageManagerService
                                        service={service}
                                        key={service.id}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </Collapse>
            </Card.Body>

        </Card>
    )
}