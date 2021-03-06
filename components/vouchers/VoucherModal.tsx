import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useAction, useDeleteAction } from "react-livequery-hooks"
import { useDomain } from "../../hooks/useDomain"
import { useDomainPricesPackages } from "../../hooks/usePricePackages"
import { useServices } from "../../hooks/useServices"
import { Voucher } from "../../types"
import { DateHourPicker } from "../common/DateHourPicker"
import { IconButton } from "../common/IconButton"
import { NumberFormatInput } from '../common/NumberFormatInput'


export type VoucherModal = {
    voucher?: Voucher
    onSubmit?: (data: Voucher) => any,
    onHide?: Function
}

export const VoucherModal = (props: VoucherModal) => {

    const { current_domain } = useDomain()
    const services = useServices()
    const { locale } = useRouter()
    const levels = useDomainPricesPackages(current_domain)


    const form = useForm<Voucher>({
        defaultValues: props.voucher || {
            code: '',
            end_time: Date.now(),
            start_time: Date.now(),
            limit: 0,
            min_require: 0,
            percent: 0,
            max: 0,
            used: 0,
            service_id: 'all',
            server: 0,
            levels: []
        },

    })

    const { excute, loading } = useAction(
        `domains/${current_domain?.id}/vouchers${props.voucher ? `/${props.voucher.id}` : ''}`,
        props.voucher ? 'PATCH' : 'POST',
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const { del, deleting } = useDeleteAction(
        props.voucher && `domains/${current_domain?.id}/vouchers/${props.voucher.id}`,
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const selected_service = useMemo(() => services.filter(s => s.id == form.watch().service_id)[0], [form.watch().service_id])
    const { t, lang } = useTranslation('common')

    return (
        <Modal show={true} onHide={props.onHide}>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(data => excute(data))}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.voucher ? 'Edit voucher' : 'Create new voucher'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col xs={12}> <Form.Label>{t('vouchers.code')}</Form.Label></Col>
                            <Col xs={12}>
                                <Controller
                                    name="code"
                                    control={form.control}
                                    rules={{ required: true }}
                                    render={({ onChange, value }) => (
                                        <Form.Control
                                            isInvalid={!!form.errors.code}
                                            onFocus={e => e.target.select()}
                                            placeholder="Example FREE50 ..."
                                            value={value}
                                            onChange={e => {
                                                const value = e.target.value.toUpperCase()
                                                if (value == '' || value.match(/^[A-Z0-9_]+$/)) onChange(value)
                                            }}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><Form.Label>{t('vouchers.total')}</Form.Label></Col>
                            <Col xs={6}><Form.Label>{t('vouchers.used')}</Form.Label></Col>
                            <Col xs={6}>
                                <NumberFormatInput name="limit" rules={{ required: true }} />
                            </Col>
                            <Col xs={6}>
                                <NumberFormatInput name="used" disabled rules={{ required: true }} />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>{t('vouchers.start_time')}</Form.Label></Col>
                            <Col xs={12} className="d-flex"><DateHourPicker name="start_time" /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>{t('vouchers.end_time')}</Form.Label></Col>
                            <Col xs={12} className="d-flex">
                                <DateHourPicker name="end_time" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>{t('vouchers.percent')}</Form.Label></Col>
                            <Col xs={12}>
                                <NumberFormatInput name="percent" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><Form.Label>{t('vouchers.min_order')}</Form.Label></Col>
                            <Col xs={6}><Form.Label>{t('vouchers.max_amount')}</Form.Label></Col>
                            <Col xs={6}>
                                <NumberFormatInput name="min_require" />
                            </Col>
                            <Col xs={6}>
                                <NumberFormatInput name="max" /> </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>{t('vouchers.service')}</Form.Label></Col>
                            <Col xs={12}>
                                <Controller
                                    control={form.control}
                                    name="service_id"
                                    render={({ onChange, value }) => (
                                        <Form.Control
                                            as="select"
                                            custom
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                        >
                                            <option value="all">{t('all')}</option>
                                            <option value="deposit">{t('add_funds')}</option>
                                            {
                                                services.map(s => <option value={s.id}>{s.name[locale]}</option>)
                                            }
                                        </Form.Control>
                                    )}
                                />
                            </Col>
                        </Row>



                        <Controller
                            control={form.control}
                            name="server"
                            render={({ onChange, value }) => selected_service ? (
                                <Row className="mb-3">
                                    <Col xs={12}><Form.Label>Server</Form.Label></Col>
                                    <Col xs={12}>
                                        <Form.Control
                                            as="select"
                                            custom
                                            value={value}
                                            onChange={e => onChange(Number(e.target.value))}
                                        >
                                            <option value={0}>All</option>
                                            {
                                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <option key={i} value={i}>Server {i}</option>)
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            ) : null}
                        />


                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Levels</Form.Label></Col>

                            <Controller
                                control={form.control}
                                name="levels"
                                render={({ onChange, value }) => {
                                    const selected = new Set<string>(value)

                                    return (
                                        <Col xs={12}>
                                            {levels.map(level => <Button
                                                size="sm"
                                                key={level.id}
                                                onClick={() => {
                                                    selected.has(level.id) ? selected.delete(level.id) : selected.add(level.id)
                                                    onChange([...selected])
                                                }}
                                                className="ml-1"
                                                variant={selected.has(level.id) ? 'primary' : 'outline-primary'}
                                            >{level.name}</Button>)}
                                        </Col>
                                    )
                                }}
                            />

                        </Row>


                    </Modal.Body>
                    <Modal.Footer>
                        {
                            props.voucher && (
                                <IconButton
                                    size="sm"
                                    variant="danger"
                                    type="submit"
                                    onClick={() => del()}
                                    disabled={deleting}
                                    icon={MdDelete}
                                    loading={deleting}
                                >Delete</IconButton>
                            )
                        }
                        <IconButton
                            variant="primary"
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            size="sm"
                            icon={FaCheck}
                        >Submit</IconButton>
                        <Button
                            variant="dark"
                            type="submit"
                            size="sm"
                            onClick={props.onHide as any}
                        >Close</Button>
                    </Modal.Footer>
                </Form>
            </FormProvider>
        </Modal>
    )
}