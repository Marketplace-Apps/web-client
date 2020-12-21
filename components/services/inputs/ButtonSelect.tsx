import { FormEvent, Fragment, useEffect, useMemo, useState } from "react";
import { Badge, Button, Col, Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { FormItem, ServiceProviderFormItem } from "../../../types";
import { SanboxJS } from "../../../helpers/sandboxjs";
import { FormItemRow } from "./FormItemRow";

export const ButtonSelect = (props: FormItem<any>) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}> 
            <Controller
                key={props.name}
                name={props.name}
                control={form.control}
                render={({ value, onChange }) => (
                    <Fragment>
                        {
                            props.options.map(option => (
                                <Button
                                    key={option.value}
                                    className="mr-2 mb-2"
                                    variant={value == option.value ? 'primary' : 'outline-primary'}
                                    onClick={() => onChange(option.value)}
                                > {option.label.en}</Button>
                            ))
                        }
                    </Fragment>
                )}
            />
        </FormItemRow>

    )
}