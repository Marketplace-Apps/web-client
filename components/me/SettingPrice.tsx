import { useRouter } from "next/router"
import React, { Fragment, useState } from "react"
import { Alert, Badge, Button, ButtonGroup, Col, Form, Row } from "react-bootstrap"
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai"
import { useCollectionData, useDocumentData, useUpdateAction } from "react-livequery-hooks"
import { Domain, DomainService, ServiceProvider, User } from "../../types"
import { IconButton } from "../common/IconButton"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
import { useDomain } from "../../hooks/useDomain"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { groupByKey } from "../../helpers/group"
import { NumberFormatInput } from "../common/NumberFormatInput"
import { useToggle } from "../../hooks/useToggle"
import { FcCancel } from "react-icons/fc"
import useTranslation from "next-translate/useTranslation"
import { Credit } from '../common/Credit'

export type Prices = {
    [service_id: string]: DomainService['prices']
}

export type SettingPrice = {
    user_id?: string
    import_prices_only?: boolean
}


export const SettingPrice = (props: SettingPrice) => {
    const domain = useDomain()
    const user = useCurrentUser()
    const { items: mother_domain_services } = useCollectionData<DomainService>(user && `domains/${user.domain_id}/services`)
    const { items: domain_services } = useCollectionData<DomainService>(domain && `domains/${domain.id}/services`)

    const { locale } = useRouter()

    const form = useForm()
    const domain_prices = groupByKey(domain_services, 'id')
    const mother_domain_prices = groupByKey(mother_domain_services, 'id')
    const { t } = useTranslation('common')

    const price_types = ['basic', 'guarantee']

    const { item: member } = useDocumentData<User>(props.user_id && domain && `domains/${domain.id}/users/${props.user_id}`)

    const prices = domain_services.map(domain_service => {
        return {
            domain_service,
            servers: Object.keys(domain_service.prices || {}).map(server => {

                return {
                    server,
                    price_types: price_types.map(type => {
                        const import_price = user?.prices?.[domain_service.id]?.[server]?.[type] ?? mother_domain_prices.get(domain_service.id)?.prices?.[server]?.[type]
                        const default_price = domain_prices.get(domain_service.id)?.prices?.[server][type]
                        const last_price = member?.prices?.[domain_service.id]?.[server]?.[type] || default_price

                        return { type, import_price, default_price, last_price }
                    })
                }
            })
        }
    })

    const [show_input_price, toggle_show_input_price] = useToggle(true)
    const [show_default_price, toggle_show_default_price] = useToggle(!props.import_prices_only)
    const [show_user_price, toggle_show_user_price] = useToggle(!props.import_prices_only)
    const [show_percent, toggle_show_percent] = useToggle(!props.import_prices_only)
    const [show_edit, toggle_show_edit] = useToggle()

    function getComparePercent(a: number, b: number) {
        if (!a || !b) return ''

        const percent = ~~((a - b) / b * 100)
        if (a > b) return `[+${percent}%]`
        if (a == b) return ''
        if (a < b) return `[${percent}%]`
    }


    const { update, update_error, data, updating } = useUpdateAction(`domains/${domain?.id}/${props.user_id ? `users/${props.user_id}` : ''}`, true, (data, error) => {
        if (error) return
        toggle_show_edit()
    })

    return (
        <Fragment>
            {
                !props.import_prices_only && (
                    <Row><Col className="d-flex justify-content-between mb-3">
                        <ButtonGroup aria-label="Basic example">
                            <Button onClick={toggle_show_input_price as any} variant={show_input_price ? 'warning' : 'outline-warning'}>{t('pricing.import')}</Button>
                            <Button onClick={toggle_show_default_price as any} variant={show_default_price ? 'success' : 'outline-success'}>{t('pricing.common')}</Button>
                            {props.user_id && <Button onClick={toggle_show_user_price as any} variant={show_user_price ? 'danger' : 'outline-danger'}>{t('pricing.private')}</Button>}
                            <Button onClick={toggle_show_percent as any} variant={show_percent ? 'dark' : 'outline-dark'}>{t('show')} %</Button>
                        </ButtonGroup>
                        {user && (user.id != props.user_id) && <Button className="ml-2" onClick={toggle_show_edit as any} variant={show_edit ? 'danger' : 'outline-danger'}>{t('edit')}</Button>}
                    </Col></Row>
                )
            }
            <FormProvider {...form}>
                <Form onSubmit={form.handleSubmit(prices => update({ prices }))}>
                    {
                        prices.map(({ servers, domain_service }) => (
                            <Row className="mt-2" key={domain_service.id}>

                                <Col xs={12}>
                                    <img src={domain_service.icon} width={30} />
                                    <span className="font-weight-bold ml-2">{domain_service.name[locale]}</span>
                                </Col>
                                <Col xs={2}></Col>
                                <Col xs={5} className="text-center">{t('pricing.basic')}</Col>
                                <Col xs={5} className="text-center">{t('pricing.guarantee')}</Col>

                                {
                                    servers.map(({ price_types, server }) => (
                                        <Col xs={12} key={server}>
                                            <Row className="mb-1">
                                                <Col xs={2} className="d-flex justify-content-center align-items-center"> {server}</Col>
                                                {
                                                    price_types.map(({ default_price, import_price, last_price, type }) => (
                                                        <Col
                                                            xs={5}
                                                            className="d-flex justify-content-center align-items-center"
                                                            key={type}
                                                        >
                                                            {show_input_price && <Badge variant="warning"><Credit value={import_price} /></Badge>}
                                                            { show_default_price && <Badge variant="success" className="ml-1"><Credit value={default_price} /> {show_percent && getComparePercent(default_price, import_price)}</Badge>}
                                                            { props.user_id && last_price && !show_edit && show_user_price && <Badge variant="danger" className="ml-1"><Credit value={last_price} />  {show_percent && getComparePercent(last_price, import_price)}</Badge>}
                                                            {show_edit && <NumberFormatInput
                                                                name={`${domain_service.id}["${server}"]["${type}"]`}
                                                                decimalScale={1}
                                                                defaultValue={last_price || default_price || import_price}
                                                                style={{ width: 60, marginLeft: 10, height: 30 }}
                                                            />}
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Col>
                                    ))
                                }



                            </Row>

                        ))
                    }
                    {
                        show_edit && (
                            <Row className="mt-3">
                                <Col
                                    xs={12}
                                    className="text-right"
                                >
                                    <IconButton
                                        size="sm"
                                        icon={AiOutlineCheck}
                                        type="submit"
                                        loading={updating}
                                        disabled={updating}
                                    >{t('submit')}</IconButton>
                                    <IconButton
                                        className="ml-1"
                                        size="sm"
                                        icon={FcCancel}
                                        onClick={toggle_show_edit as any}
                                        variant="dark"
                                    >{t('close')}</IconButton>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </FormProvider>
        </Fragment >
    )
}