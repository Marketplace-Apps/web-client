import { useAuth } from "firebase-easy-hooks"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Alert, Badge, Button, Card, Col, Form, ListGroup, ProgressBar, Row } from "react-bootstrap"
import { useCollectionData } from "react-livequery-hooks"
import { AppRouteList } from "../AppRouteList"
import { CenteredSpinner } from "../components/common/CenteredSpinner"
import { VoucherItem } from "../components/vouchers/VoucherItem"
import { VoucherModal } from "../components/vouchers/VoucherModal"
import { groupByKey } from "../helpers/group"
import { useDomain } from "../hooks/useDomain"
import { useServices } from "../hooks/useServices"
import { MainLayout } from "../layouts/MainLayout"
import { Voucher } from "../types"

export const VoucherGuide = () => {

    const { locale } = useRouter()

    return (
        <Row className="mt-4"><Col xs={12}>
            {locale == 'en' && <Alert variant="info">You can apply bellow vouchers to decrease order total money</Alert>}
            {locale == 'vi' && <Alert variant="info">Bạn có thể áp dụng các phiếu giảm giá dưới đây để giảm tổng tiền đơn hàng</Alert>}
        </Col></Row>
    )
}

const VoucherManagerPage = () => {

    const { current_domain, is_domain_owner } = useDomain()
    const { items: vouchers, loading, empty } = useCollectionData<Voucher>(current_domain && `domains/${current_domain.id}/vouchers`)
    const [show_create_modal, set_show_create_modal] = useState<boolean>(false)
    const [selected_voucher_index, set_selected_voucher_index] = useState<number>(-1)

    const is_edit_mode = is_domain_owner && typeof location != 'undefined' && location.search.includes('edit=true')
    const { t } = useTranslation('common')
    const services = groupByKey(useServices(), 'id')
    const { locale } = useRouter()


    return (
        <MainLayout title={AppRouteList.Me.children.VoucherList.name} showHeaderTitle>
            {show_create_modal && <VoucherModal onHide={() => set_show_create_modal(false)} />}
            {
                selected_voucher_index >= 0 && (
                    <VoucherModal
                        voucher={vouchers[selected_voucher_index]}
                        onHide={() => set_selected_voucher_index(-1)}
                    />
                )
            }

            {
                is_edit_mode && (
                    <Row>
                        <Col xs="12" className="text-right">
                            <Button onClick={() => set_show_create_modal(true)} size="sm">{t('create')}</Button>
                        </Col>

                    </Row>
                )
            }
            {empty && <div className="text-center">{t('empty_data')}</div>}
            {loading && <CenteredSpinner />}
            {!is_edit_mode && <VoucherGuide />}
            <Row className="mt-3">
                {
                    vouchers
                        .sort((a, b) => b.end_time - a.end_time)
                        .map((voucher, index) =>
                            <Col sm={12} md={12} xl={3} lg={4} className="p-3">
                                <VoucherItem
                                    service_name={services.get(voucher.service_id)?.name[locale] || t('vouchers.apply_for_all_services')}
                                    voucher={voucher}
                                    onClick={is_edit_mode ? () => set_selected_voucher_index(index) : null}
                                />
                            </Col>
                        )
                }
            </Row>
        </MainLayout>
    )
}

export default VoucherManagerPage