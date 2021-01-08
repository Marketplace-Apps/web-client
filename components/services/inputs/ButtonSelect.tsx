import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { ServiceProviderActionFormItem } from "../../../types";
import { FormItemRow } from "./FormItemRow";

export const ButtonSelect = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()

    return (
        <FormItemRow {...props}>
            <Controller
                key={props.id}
                name={props.id}
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
                                    disabled={option.disabled}
                                > {option.label.en}</Button>
                            ))
                        }
                    </Fragment>
                )}
            />
        </FormItemRow>

    )
}