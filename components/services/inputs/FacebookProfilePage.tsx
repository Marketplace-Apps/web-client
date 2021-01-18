
import { Fragment } from "react";
import { Alert, Col, Form, } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FcBusinessman, FcPackage, FcRadarPlot } from "react-icons/fc";
import { useAction } from "react-livequery-hooks";
import { ServiceProviderActionFormItem } from "../../../types";
import { CenteredSpinner } from "../../../components/common/CenteredSpinner";
import { FormItemRow } from "./FormItemRow";
import useTranslation from "next-translate/useTranslation";

export const FacebookProfilePage = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()
    const { t } = useTranslation('common')

    const { data, excute, loading, error } = useAction(`utils/facebook-profile-page`, 'GET', (data, error) => {
        console.error(error)
        if (error) return
        form.setValue(props.id, data.id)
    })

    async function onBlur(e) {
        const url = e.target.value as string
        if (url.length > 8) excute({}, { url })
    }

    const Info = (
        <Fragment>
            {error && (
                <Form.Row><Col xs={12} className="d-flex justify-content-start align-items-top">
                    <Alert variant="danger" style={{ width: '100%' }}>
                       {t('server_errors.' + error.message)}
                    </Alert>
                </Col></Form.Row>
            )}


            {
                data && (
                    <Form.Row style={{ cursor: 'pointer' }} onClick={() => window.open(`https://fb.com/${data.id}`, '_blank')}>
                        <Col xs={12} md={3}></Col>
                        <Col xs={6} md={3} lg={2} className="d-flex justify-content-center align-items-center">
                            <img src={data.thumbnail} style={{ width: '100%', maxWidth: 300 }} />
                        </Col>
                        <Col xs={6} md={3} lg={2} className="d-flex justify-content-center align-items-center">
                            <div className="d-flex-column">
                                <div style={{ fontWeight: 'bold' }} className="mb-2">
                                    {data.title}
                                </div>
                                <div style={{ fontSize: 14 }}>
                                    {data.type == 'User' && <FcBusinessman size={25} />}
                                    {data.type == 'Page' && <FcPackage size={25} />}
                                    <span className="ml-1">{data.type}</span>
                                </div>
                                <div style={{ fontSize: 14 }}>
                                    {data.description && <FcRadarPlot size={25} />}
                        &nbsp;{data.description}
                                </div>
                            </div>
                        </Col>

                    </Form.Row>
                )
            }

            {loading && <CenteredSpinner />}
        </Fragment>
    )

    return (
        <FormItemRow
            {...props}
            append={Info}
        >
            <Form.Control
                name={props.id}
                ref={form.register({ required: props.require })}
                onBlur={onBlur}
            />
        </FormItemRow>
    )
}