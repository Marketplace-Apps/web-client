import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FcBusinessman, FcClock, FcCollaboration, FcGenealogy, FcInfo, FcOrganization, FcTreeStructure } from "react-icons/fc";
import { Voucher } from "../../types";
import dayjs, { } from 'dayjs'
import { ProgressBar } from "react-bootstrap";

export type VoucherItem = {
    onClick?: Function
    voucher: Voucher
}
export const VoucherItem = ({ voucher, onClick }: VoucherItem) => {

    const server = voucher.server > 0 ? 'Server ' + voucher.server : 'All server'
    const percent = ~~(voucher.used / voucher.limit * 100)

    return (
        <Card onClick={onClick as any} style={{ cursor: onClick && 'pointer' }} >
            <Card.Header  >
                <Row>
                    <Col style={{ color: '#17a2b8', fontWeight: 'bold' }}>
                        {voucher.code}
                        <Badge className="ml-1" variant="success">{voucher.percent}%</Badge>
                    </Col>
                </Row>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <ProgressBar animated now={percent} label={`${percent}%`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcTreeStructure size={25} />
                    <span className="font-weight-bold ml-1"> {voucher.service} </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcOrganization size={25} />
                    <span className="ml-1" >{server}</span>
                </ListGroup.Item>

                <ListGroup.Item>
                    {voucher.allow_private_price ? <FcCollaboration size={25} /> : <FcBusinessman size={25} />}
                    <Badge className="ml-1" variant={voucher.allow_private_price ? "danger" : "info"}>
                        {voucher.allow_private_price ? 'All user' : 'Common user only'}
                    </Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcClock size={25} className="mr-1" />
                    <span>Expired in</span>
                    <Badge className="ml-1" variant="warning">{dayjs(Date.now()).to(dayjs(voucher.end_time))}</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcGenealogy className="mr-1" size={25} />
                    <Badge variant="info" className="mr-1"> {voucher.used}</Badge>/
                    <Badge variant="primary" className="ml-1">{voucher.limit}</Badge>
                    <span className="ml-1">used vouchers</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcInfo className="mr-1" size={25} />
                    <span>Each user can use</span>
                    <Badge variant="primary" className="ml-1">{voucher.limit_per_user}</Badge>
                    <span> times</span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}