import { Fragment, useMemo } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Order, User } from "../../types"
import { Bill } from "./Bill"
import useTranslation from 'next-translate/useTranslation'
import { Alert, Button, FormControl, InputGroup } from "react-bootstrap"
import { usePriceCaculatorContext } from "../../hooks/usePriceCaculator"



export const ActionBill = () => {

    const {
        final_total,
        apply_voucher,
        clear_voucher,
        voucher_error,
        discount,
        total,
        price,
        action,
        user
    } = usePriceCaculatorContext()
    const form = useFormContext()
    const { t } = useTranslation('common')

    return final_total && (
        <Fragment>
            {action.can_use_voucher && (
                <Controller
                    name="voucher"
                    control={form.control}
                    render={({ onChange, value }) => (
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Voucher"
                                id="voucher-input"
                                value={value}
                                onChange={e => onChange(e.target.value.toUpperCase())}
                                onBlur={e => apply_voucher(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        clear_voucher()
                                        form.setValue('voucher', '')
                                    }}
                                >{t('cancel')}</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    )}

                />
            )}

            {voucher_error && <Alert variant="danger">{voucher_error}</Alert>}

            {
                discount > 0 && <Bill
                    total={-discount}
                    text={t('orders.discount')}
                />
            }

            <Bill
                total={price}
                text={t('price')}
                background="linear-gradient(to right, #ff512f, #f09819)"
            />

            <Bill
                total={final_total}
                text={t('order_total')}
                old_value={discount > 0 && total}
            />

            <Bill
                total={user?.balance}
                text={t('my_balance')}
                background="linear-gradient(to right, #76b852, #8dc26f)"
            />
        </Fragment>
    )

} 