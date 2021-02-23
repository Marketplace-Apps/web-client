import { FormEvent, useCallback, useMemo, useState } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { ServiceProviderFormItemAlert } from "../../../types";
import { SanboxJS } from "../../../helpers/sandboxjs";
import { VisibleCheck } from "./VisibleCheck";
import { useRouter } from "next/router";

const BackgroundMapper: { [key in ServiceProviderFormItemAlert<any>["level"]]: string } = {
    error: 'linear-gradient(to right, #ed213a, #93291e)',
    info: 'linear-gradient(to right, #457fca, #5691c8)',
    success: 'linear-gradient(to right, #11998e, #38ef7d)',
    warning: 'linear-gradient(to right, #f46b45, #eea849)'
}

export const FormAlert = (props: ServiceProviderFormItemAlert<any>) => {

    const form = useFormContext()
    const data = form.watch()
    const { locale } = useRouter()

    return (

        <VisibleCheck condition={props.visible_condition.toString()}>
            <Form.Row
                className="mb-3 p-2 pl-3"
                style={{
                    background: BackgroundMapper[props.level],
                    color: 'white',
                    borderRadius: 5
                }}

            >
                <Col style={{ wordBreak: 'break-all' }}>
                    {props.content[locale] && SanboxJS.eval(props.content[locale], data)} 
                    {props.url && (
                        <Badge
                            pill
                            variant="light"
                            style={{ marginLeft: 5, cursor: 'pointer' }}
                            onClick={() => window.open(props.url[locale])}
                        >{props.urlText[locale] || 'See more'}</Badge>
                    )}
                </Col>
            </Form.Row>
        </VisibleCheck>
    )
}