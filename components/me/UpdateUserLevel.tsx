import { useCollectionData, useUpdateAction } from "react-livequery-hooks"
import useTranslation from "next-translate/useTranslation"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDomain } from "../../hooks/useDomain"
import { PricePackage, User } from "../../types"
import { useForm } from "react-hook-form"
import { IconButton } from "../common/IconButton" 
import { useDomainPricesPackages } from "../../hooks/usePricePackages"

export type UpdateUserLevel = { user: User }
export const UpdateUserLevel = ({ user }: UpdateUserLevel) => {

    const { current_domain } = useDomain()
    const { t } = useTranslation('common')
    const packages = useDomainPricesPackages(current_domain)

    const { update, updating } = useUpdateAction(current_domain && `domains/${current_domain.id}/users/${user.id}`)

    const level = user.level || 'default'
    const form = useForm({
        defaultValues: { level }
    }) 

    return (
        <Form onSubmit={form.handleSubmit(d => update(d))}>

            <Row>
                <Col xs={12}>
                    <h6>Cài đặt hạng thành viên</h6>
                    <select
                        name="level"
                        ref={form.register()}
                        className="form-control"
                    >
                        <option value={level}>{packages.filter(p => p.id == level)[0]?.name || ''} (hiện tại)</option>
                        {
                            packages
                                .filter(p => ['root', level].every(l => l != p.id))
                                .map(p => <option
                                    value={p.id}
                                    key={p.id}
                                >{p.name}</option
                                >)
                        }

                    </select>
                </Col>
                <Col xs={12} className="text-right pt-2">
                    <IconButton
                        type="submit"
                        loading={updating}
                        disabled={updating}
                        size="sm"
                    >{t('submit')}</IconButton>
                </Col>
            </Row>
        </Form>
    )
}