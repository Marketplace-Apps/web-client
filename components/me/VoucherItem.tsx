import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FcClock, FcGenealogy } from "react-icons/fc";
import { Voucher } from "../../types";
import dayjs, { } from 'dayjs'

export type VoucherItem = {
    onClick?: Function
    voucher: Voucher
}
export const VoucherItem = ({ voucher, onClick }: VoucherItem) => {

    const server = voucher.server > 0 ? ' - server ' + voucher.server : ''
    return (
        <Card onClick={onClick as any} style={{ cursor: 'pointer' }} >
            <Card.Header  >
                <Row>
                    <Col style={{ color: '#17a2b8', fontWeight: 'bold' }}>{voucher.code} </Col>
                    <Col className="text-right"><Badge variant="info"> {voucher.service} {server}</Badge></Col>
                </Row>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <FcClock size={25} className="mr-1" />Expired in
                        <Badge variant="warning">{dayjs(Date.now()).to(dayjs(voucher.end_time))}</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcGenealogy className="mr-1" size={25} />
                    <Badge variant="info"> {voucher.used}</Badge>/
                    <Badge variant="primary">{voucher.limit}</Badge><span>used</span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}