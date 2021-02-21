import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";
import { VisibleCheck } from "./VisibleCheck";

export const IconSelect = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <Controller
                key={props.id}
                name={props.id}
                control={form.control}
                rules={{ required: props.require }}
                render={({ value, onChange }) => (
                    <Fragment>
                        {
                            props.options.map((option, i) => (
                                <VisibleCheck key={`${option.value}|${i}`} condition={option.visible_condition?.toString()}>
                                    <img
                                        src={option.icon}
                                        height={value == option.value ? 60 : 40}
                                        style={{
                                            cursor: 'pointer',
                                            marginLeft: 10,
                                            border: value == option.value && '4px solid #007bff', borderRadius: '100%'
                                        }}
                                        onClick={() => onChange(option.value)}
                                    />
                                    {/* <Button
                                        key={option.value}
                                        className="mr-2 mb-2"
                                        variant={value == option.value ? 'primary' : 'outline-primary'}
                                        onClick={() => onChange(option.value)}
                                    > {option.label.en}</Button> */}
                                </VisibleCheck>
                            ))
                        }
                    </Fragment>
                )}
            />
        </FormItemRow>

    )
}