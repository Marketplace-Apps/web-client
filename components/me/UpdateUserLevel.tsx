import useTranslation from "next-translate/useTranslation"
import { Button, Col, Form, Row } from "react-bootstrap"

export const UpdateUserLevel = () => {

    const { t } = useTranslation('common')

    return (
        <Row>
            <Col xs={12}>
                <Form.Control as="select">
                    <option>Khách hàng</option>
                    <option>Cộng tác viên</option>
                    <option>Đại lý</option>
                    <option>Nhà phân phối</option>
                </Form.Control>
            </Col>
            <Col xs={12} className="text-right pt-2">
                <Button size="sm">{t('submit')}</Button>
            </Col>
        </Row>
    )
}