import { Col, Form } from "react-bootstrap";


export type Bill = { text: string, total: number, background?: string }
export const Bill = (props: Bill) => (
    <Form.Row className="mb-3" style={{
        background: props.background || 'linear-gradient(to right, #457fca, #5691c8)',
        padding: 5,
        borderRadius: 10,
        color: 'white'
    }}>
        <Col
            xs={6}
            className="d-flex justify-content-start align-items-center"
        >
            {props.text}
        </Col>
        <Col
            xs={6}
            className="d-flex justify-content-end align-items-center"
            style={{ fontSize: 25, fontWeight: 'bold' }}
        >
            {props.total?.toLocaleString()} đ
        </Col>
    </Form.Row>
)