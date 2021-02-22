import useTranslation from "next-translate/useTranslation"
import React, { Fragment, useEffect, useMemo, useState } from "react"
import { Card, Col, Modal, Row, Collapse, Form, FormControl, Badge, Button, InputGroup } from "react-bootstrap"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useCreateAction, useDeleteAction, useDocumentData, useUpdateAction } from "react-livequery-hooks"
import { ServiceList } from "../../../const"
import { groupBy2Key } from "../../../helpers/group"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { useDomain } from "../../../hooks/useDomain"
import { useServices } from "../../../hooks/useServices"
import { PricePackage, ServicePriceList } from "../../../types"
import { IconButton } from "../../common/IconButton"
import { PricePackageManagerCategory } from "./PricePackageManagerCategory"
import { PricePackageManagerContext } from "./PricePackageManagerContext"

export type PricePackageManagerModal = {
    import_price: PricePackage
    price_package?: PricePackage
    onHide?: Function
}

export const PricePackageManagerModal = ({ price_package, import_price, onHide }: PricePackageManagerModal) => {
    const { t, lang } = useTranslation('common')
    const services = useServices()
    const grouped_services = useMemo(() => groupBy2Key(services, 'category', 'id'), [services])
    const [edit_mode, set_edit_mode] = useState<boolean>(!price_package)
    const domain = useDomain()
    const form = useForm<PricePackage>({
        defaultValues: {
            ...price_package || {},
            prices: price_package?.prices || import_price.prices
        }
    })
    const [search, set_search] = useState()

    const ctx: PricePackageManagerContext = { form, import_price, search, price_package, edit_mode }

    const { update, updating } = useUpdateAction(domain && price_package && `domains/${domain.id}/packages/${price_package.id}`, false, (data, error) => {
        !error && onHide && onHide()
    })

    const { create, creating } = useCreateAction(domain && `domains/${domain.id}/packages`, (data, error) => {
        !error && onHide && onHide()
    })

    const { del, deleting } = useDeleteAction(domain && price_package && `domains/${domain.id}/packages/${price_package.id}`, (data, error) => {
        !error && onHide && onHide()
    })
    function batch_update(percent?: number) {
        if (!percent) {
            do {
                percent = Number(prompt('Enter %'))
                if (!percent) return
            } while (!percent || isNaN(percent))
        }
        const prices = form.getValues().prices
        for (const service_id in prices) {
            for (const option_id in prices[service_id]) {
                for (const type of ['basic', 'guarantee']) {
                    const new_value = Number(
                        (
                            import_price.prices[service_id][option_id][type]
                            * (percent + 100) * 0.01
                        ).toFixed(6)
                    )
                    form.setValue(`prices.${service_id}.${option_id}.${type}`, new_value)
                }
            }
        }
    }

    return <Modal
        onHide={onHide}
        show={true}
    >
        <Modal.Header closeButton> <Modal.Title>Package price manager</Modal.Title></Modal.Header>
        <Form onSubmit={form.handleSubmit(async data => price_package ? update(data) : create(data))}>
            <PricePackageManagerContext.Provider value={ctx}>
                <Row>
                    {
                        edit_mode && (
                            <Fragment>
                                <Col xs={12}>
                                    <Row className="m-0 mt-2">
                                        <Col xs={3} className="d-flex justify-content-start align-items-center"><h6>{t('name')}</h6></Col>
                                        <Col xs={9} >
                                            <FormControl
                                                placeholder="KH1, DL1, ..."
                                                name="name"
                                                ref={form.register({ required: true })}
                                                isInvalid={!!form.errors.name}
                                                onClick={e => e.target.select()}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="m-0 mt-2 ">
                                        <Col xs={3} className="d-flex justify-content-start align-items-center"><h6>{t('description')}</h6></Col>
                                        <Col xs={9}>
                                            <FormControl
                                                as="textarea"
                                                rows={4}
                                                placeholder="..."
                                                name="description"
                                                ref={form.register({ required: true })}
                                                onClick={e => e.target.select()}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <Row className="m-0 mt-2">
                                        <Col xs={3} className="d-flex justify-content-start align-items-center"><h6>{t('price')}</h6></Col>
                                    </Row>
                                </Col>
                                <Col xs={12} className="text-right pr-4 mt-2">
                                    {[50, 80, 100].map(percent => (
                                        <Button
                                            size="sm"
                                            variant="outline-primary"
                                            className="mr-2"
                                            onClick={() => batch_update(percent)}
                                        >+{percent}%</Button>
                                    ))}
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        onClick={() => batch_update()}
                                    >{t('custom')}</Button>
                                </Col>

                            </Fragment>
                        )
                    }

                    <Col xs={12} className="d-flex justify-content-end pt-2 pr-4 pl-4">
                        <FormControl
                            placeholder={t('search')}
                            value={search}
                            onChange={e => set_search(e.target.value as any)}
                        />
                    </Col>
                    {
                        ServiceList.map(category => (
                            <Col key={category.id} xs={12} className="pt-2 pl-4 pr-4 pb-2">
                                <PricePackageManagerCategory
                                    category={category}
                                    services={[
                                        ...grouped_services.get(category.id)?.values() || []
                                    ]}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </PricePackageManagerContext.Provider>
            <Modal.Footer>
                {!price_package && <IconButton
                    type="submit"
                    variant="primary"
                    size="sm"
                    loading={creating}
                    disabled={creating}
                >{t('create')}</IconButton>}

                {edit_mode && price_package?.id != 'default' && price_package?.id != 'root' && price_package && <IconButton
                    variant="danger"
                    size="sm"
                    loading={deleting}
                    onClick={() => del()}
                >{t('delete')}</IconButton>}

                {edit_mode && price_package && <Button type="submit" variant="primary" size="sm">{t('submit')}</Button>}

                {!edit_mode && price_package && <IconButton
                    variant="success"
                    size="sm"
                    loading={updating}
                    disabled={updating}
                    onClick={() => set_edit_mode(true)}
                >{t('edit')}</IconButton>}

                {edit_mode && price_package && <Button
                    type="submit"
                    variant="dark"
                    size="sm"
                    onClick={() => set_edit_mode(false)}
                >{t('cancel')}</Button>}

                {!edit_mode && <Button variant="dark" size="sm" onClick={onHide as any}>{t('close')}</Button>}
            </Modal.Footer>
        </Form>
    </Modal>
}

export const usePricePackageManagerModal = () => {

    const domain = useDomain()
    const me = useCurrentUser()
    const [visible, set_visible] = useState<boolean>()
    const [price_package, set_price_package] = useState<PricePackage>()

    const import_price_ref = useMemo(() => {
        if (!domain || !me) return

        // Normal user
        if (me.id != domain.owner_id) return `domains/${domain.id}/packages/${me.level || 'default'}`

        // Super admin
        if (me.id == 'qWaArilaFUZqsq2vQ7lg5OkUnt32') return `domains/qWaArilaFUZqsq2vQ7lg5OkUnt32/packages/root`

        // Domain owner
        return `domains/${domain.refs[0]}/packages/${me.level || 'default'}`

    }, [domain, me])
 

    const { item: import_price, loading } = useDocumentData<PricePackage>(import_price_ref)
    return {
        showPricePackageManagerModal: (price_package?: PricePackage) => {
            set_visible(true)
            set_price_package(price_package)
        },
        PricePackageManagerModal: visible && import_price && <PricePackageManagerModal
            price_package={price_package}
            onHide={() => set_visible(false)}
            import_price={import_price}
        />,
        loading
    }


}