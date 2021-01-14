import { useRouter } from "next/router"
import React, { CSSProperties, Fragment } from "react"
import { Badge, Button, Col, Form, Modal, Row } from "react-bootstrap"
import { Controller, FormProvider, RegisterOptions, useForm, useFormContext } from "react-hook-form"
import { FaCheck } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useAction, useCollectionData, useDeleteAction, useDocumentData } from "react-livequery-hooks"
import NumberFormat from "react-number-format"
import { groupByKey } from "../../helpers/group"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useDomain } from "../../hooks/useDomain"
import { useServices } from "../../hooks/useServices"
import { ServiceProvider, Voucher } from "../../types"
import { DatePickerWrapper } from "../common/DatePickerWrapper"
import { IconButton } from "../common/IconButton"

export type VoucherModal = {
    voucher?: Voucher
    onSubmit?: (data: Voucher) => any,
    onHide?: Function
}

type NumberFormatInput = {
    name: string,
    disabled?: boolean,
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>,
    style?: CSSProperties
}
const NumberFormatInput = (props: NumberFormatInput) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={props.name}
            render={({ onChange, value }) => (
                <NumberFormat
                    style={props.style}
                    disabled={props.disabled}
                    thousandSeparator
                    allowNegative={false}
                    isNumericString
                    className="form-control"
                    decimalScale={0}
                    value={value}
                    onValueChange={e => onChange(e.floatValue)}
                    onFocus={e => e.target.select()}
                />
            )}
        />
    )
}


const DateHourPicker = (props: { name: string, rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'> }) => {

    const form = useFormContext()

    return (
        <Controller
            control={form.control}
            name={props.name}
            rules={props.rules}
            render={({ onChange, value }) => (
                <Fragment>
                    <Form.Control
                        as="select"
                        custom
                        style={{ width: 80 }}
                        onChange={e => {
                            const hour = Number(e.target.value)
                            const date = new Date(value)
                            date.setHours(hour)
                            date.setMinutes(0)
                            date.setSeconds(0)
                            date.setMilliseconds(0)
                            onChange(date.getTime())
                        }}
                    >
                        {new Array(24).fill(0).map((_, hour) => (
                            <option
                                selected={hour == new Date(value).getHours()}
                                value={hour}
                            >{hour}h</option>
                        ))}
                    </Form.Control>
                    <DatePickerWrapper onChange={d => {
                        const old_date = new Date(value)
                        d.setHours(old_date.getHours())
                        d.setMinutes(0)
                        d.setSeconds(0)
                        d.setMilliseconds(0)
                        onChange(d.getTime())
                    }}>
                        <Form.Control className="ml-2" value={new Date(value).toLocaleDateString('vi')} />
                    </DatePickerWrapper>
                </Fragment >
            )}
        />
    )
}

export const VoucherModal = (props: VoucherModal) => {

    const domain = useDomain()
    const services = useServices()
    const { locale } = useRouter()

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
            limit_per_user: 0,
            service: 'all',
            server: 0
        },

    })

    const { excute, loading } = useAction(
        `domains/${domain?.id}/vouchers${props.voucher ? `/${props.voucher.id}` : ''}`,
        props.voucher ? 'PATCH' : 'POST',
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const { del, deleting } = useDeleteAction(
        props.voucher && `domains/${domain?.id}/vouchers/${props.voucher.id}`,
        (data, error) => {
            if (error) return
            props.onHide()
        }
    )

    const selected_service_id = form.watch().service as string
    const selected_service = services.filter(s => s.id == selected_service_id)[0] 

    return (
        <Modal show={true} onHide={props.onHide}>
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(data => excute(data))}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.voucher ? 'Edit voucher' : 'Create new voucher'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col xs={12}> <Form.Label>Voucher code</Form.Label></Col>
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
                            <Col xs={6}><Form.Label>Total amount</Form.Label></Col>
                            <Col xs={6}><Form.Label>Used</Form.Label></Col>
                            <Col xs={6}>
                                <NumberFormatInput name="limit" rules={{ required: true }} />
                            </Col>
                            <Col xs={6}>
                                <NumberFormatInput name="used" disabled rules={{ required: true }} />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Start time</Form.Label></Col>
                            <Col xs={12} className="d-flex"><DateHourPicker name="start_time" /></Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>End time</Form.Label></Col>
                            <Col xs={12} className="d-flex">
                                <DateHourPicker name="end_time" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><Form.Label>Percent</Form.Label></Col>
                            <Col xs={6}><Form.Label>User limit</Form.Label></Col>
                            <Col xs={6}>
                                <NumberFormatInput name="percent" style={{ width: 60 }} />
                            </Col>
                            <Col xs={6}>
                                <NumberFormatInput name="limit_per_user" />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}><Form.Label>Min order</Form.Label></Col>
                            <Col xs={6}><Form.Label>Max amount</Form.Label></Col>
                            <Col xs={6}>
                                <NumberFormatInput name="min_require" />
                            </Col>
                            <Col xs={6}>
                                <NumberFormatInput name="max" /> </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12}><Form.Label>Service</Form.Label></Col>
                            <Col xs={12}>
                                <Controller
                                    control={form.control}
                                    name="service"
                                    render={({ onChange, value }) => (
                                        <Form.Control
                                            as="select"
                                            custom
                                            value={value}
                                            onChange={e => onChange(e.target.value)}
                                        >
                                            <option value="all">Tất cả dịch vụ</option>
                                            <option value="deposit">Nạp tiền</option>
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
                                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <option value={i}>Server {i}</option>)
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            ) : null}
                        />

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