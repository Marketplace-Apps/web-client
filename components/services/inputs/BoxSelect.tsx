import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { SanboxJS } from "../../../helpers/sandboxjs";
import { useHover } from "../../../hooks/useHover";
import { usePriceCaculatorContext } from "../../../hooks/usePriceCaculator";
import { ServiceProviderActionFormItem, ServiceProviderItemOption } from "../../../types";
import { FormItemRow } from "./FormItemRow";
import { VisibleCheck } from "./VisibleCheck";

export type BoxSelectItem = {
    option: ServiceProviderItemOption<any>
    selected?: boolean
    onClick?: Function
}
export const BoxSelectItem = (props: BoxSelectItem) => {

    const { locale } = useRouter()
    const { hovering, listeners } = useHover()
    const prices = usePriceCaculatorContext()
    const form = useFormContext() 

    const description = useMemo(() => {
        const render_fn = props.option.description[locale]
        if (!render_fn) return ''
        return SanboxJS.eval(render_fn, form.getValues(), prices)
    }, [prices, form])

    return (
        <Card
            onClick={props.onClick as any}
            style={{
                border: '0px',
                cursor: !props.selected && 'pointer',
                margin: 0,
                borderRadius: 20,
                boxShadow: props.selected ? '#6faae4 0px 0px 0px 3px' : (hovering ? "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px" : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px')
            }}
            {...listeners}
            className="mt-2"
        >
            <Card.Body >
                <Card.Title>
                    <span> {props.option.label[locale] ?? props.option.label.en}</span>
                </Card.Title>
                <Card.Text>{description} </Card.Text>
            </Card.Body>
        </Card>
    )
}

export const BoxSelect = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()



    return (
        <FormItemRow {...props} >
            <Controller
                key={props.id}
                name={props.id}
                control={form.control}
                rules={{ required: props.require }}
                render={({ value, onChange }) => (
                    <Row>
                        {
                            props.options.map((option, i) => (
                                <VisibleCheck key={`${option.value}|${i}`} condition={option.visible_condition?.toString()}>
                                    <Col xs={12} md={6} xl={3} lg={4}>
                                        <BoxSelectItem
                                            option={option}
                                            selected={value == option.value}
                                            onClick={() => onChange(option.value)}
                                        />
                                    </Col>


                                </VisibleCheck>
                            ))
                        }
                    </Row>
                )}
            />
        </FormItemRow>

    )
}