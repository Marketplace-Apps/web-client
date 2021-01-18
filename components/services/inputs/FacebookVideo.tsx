import dayjs from "dayjs";
import { Fragment, useEffect } from "react";
import { Alert, Badge, Col, Form, Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { BiTimeFive } from "react-icons/bi";
import { useAction } from "react-livequery-hooks";
import { ServiceProviderActionFormItem } from "../../../types";
import { CenteredSpinner } from "../../../components/common/CenteredSpinner";
import { FormItemRow } from "./FormItemRow";
import useTranslation from "next-translate/useTranslation";

export const FacebookVideo = (props: ServiceProviderActionFormItem) => {

    const form = useFormContext()
    const { t } = useTranslation('common')

    const { data, excute, loading, error, clear } = useAction(`utils/facebook-video`, 'GET', (data, error) => {
        console.error(error)
        if (error) return
        form.setValue(props.id, data.id)
    })

    async function onBlur(e) {
        const url = e.target.value as string
        if (url.length > 8) excute({}, { url })
    }

    const Info = <Fragment>
        {error && (
            <Form.Row><Col xs={12} className="d-flex justify-content-start align-items-top">
                <Alert variant="danger" style={{ width: '100%' }}>
                    {t('server_errors.' + error.message)}
                </Alert>
            </Col></Form.Row>
        )}


        {
            data && (
                <Form.Row className="p-3" style={{ cursor: 'pointer' }} onClick={() => window.open(`https://fb.com/${data.id}`, '_blank')}>
                    <Col xs={12} md={3}></Col>
                    <Col xs={6} md={3} lg={2} className="d-flex justify-content-center align-items-center">
                        <img src={data.thumbnail} style={{ width: '100%' }} />
                    </Col>
                    <Col xs={6} md={3} lg={2} className="d-flex-column justify-content-around align-items-stretch">
                        <div style={{ fontWeight: 'bold' }}>
                            <Badge variant={data.status == 'LIVE' ? 'danger' : 'dark'} className="mr-2">{data.status}</Badge>
                            {data.title}
                        </div>
                        <div className="mb-3">
                            <BiTimeFive /> {dayjs(new Date(data.created_at * 1000)).locale('vi').format('DD/MM/YYYY H:m')}
                        </div>
                        <div style={{ fontSize: 14 }}>{data.description}</div>
                    </Col>

                </Form.Row>
            )
        }

        {loading && <CenteredSpinner />}
    </Fragment>

    return (
        <FormItemRow {...props} append={Info}>
            <Form.Control
                name={props.id}
                ref={form.register({ required: props.require })}
                onBlur={onBlur}
                placeholder={props.placeholder?.en}
            />
        </FormItemRow>
    )
}