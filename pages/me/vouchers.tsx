import React, { useState } from "react"
import { Badge, Button, Card, Col, Form, ListGroup, ProgressBar, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AiFillCopy } from "react-icons/ai"
import { BiEdit } from "react-icons/bi"
import { FcAlarmClock, FcCancel, FcClock, FcCopyleft, FcGenealogy } from "react-icons/fc"
import { useCollectionData } from "react-livequery-hooks"
import { AppRouteList } from "../../AppRouteList"
import { IconButton } from "../../components/common/IconButton"
import { VoucherItem } from "../../components/me/VoucherItem"
import { VoucherModal } from "../../components/me/VoucherModal"
import { useDomain } from "../../hooks/useDomain"
import { MainLayout } from "../../layouts/MainLayout"
import { Voucher } from "../../types"



const VoucherManagerPage = () => {

    const domain = useDomain()

    const form = useForm()

    const { items: vouchers } = useCollectionData<Voucher>(domain && `domains/${domain.id}/vouchers`)

    const [show_create_modal, set_show_create_modal] = useState<boolean>(false)
    const [selected_voucher_index, set_selected_voucher_index] = useState<number>(-1)

    return (
        <MainLayout title={AppRouteList.Me.children.SiteConfig.name}>
            {show_create_modal && <VoucherModal onHide={() => set_show_create_modal(false)} />}
            {
                selected_voucher_index >= 0 && (
                    <VoucherModal
                        voucher={vouchers[selected_voucher_index]}
                        onHide={() => set_selected_voucher_index(-1)}
                    />
                )
            }

            <Row>
                <Col xs="12" className="text-right">
                    <Button onClick={() => set_show_create_modal(true)}>Create</Button>
                </Col>

            </Row>
            <Row className="mt-3">
                {
                    vouchers
                        .sort((a, b) => b.end_time - a.end_time)
                        .map((voucher, index) =>
                            <Col sm={12} md={12} xl={3} lg={4} className="p-3">
                                <VoucherItem
                                    voucher={voucher}
                                    onClick={() => set_selected_voucher_index(index)}
                                />
                            </Col>
                        )
                }
            </Row>
        </MainLayout>
    )
}

export default VoucherManagerPage