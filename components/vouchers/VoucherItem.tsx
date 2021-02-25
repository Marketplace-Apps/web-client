import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FcBusinessman, FcClock, FcCollaboration, FcGenealogy, FcInfo, FcOrganization, FcPositiveDynamic, FcRightUp, FcTreeStructure } from "react-icons/fc";
import { Voucher } from "../../types";
import dayjs, { } from 'dayjs'
import { ProgressBar } from "react-bootstrap";
import useTranslation from "next-translate/useTranslation";
import { Credit } from "../common/Credit";
import { useCopy } from "../../hooks/useCopy";

export type VoucherItem = {
    onClick?: Function
    voucher: Voucher,
    service_name: string
}
export const VoucherItem = ({ voucher, onClick, service_name }: VoucherItem) => {

    const { t, lang } = useTranslation('common')
    const server = voucher.server == 0 ? t('vouchers.apply_for_all_servers') : t('vouchers.only_apply_for_server') + ' ' + voucher.server
    const percent = ~~(voucher.used / voucher.limit * 100)
    const { copied, copy } = useCopy()


    return (
        <Card onClick={onClick as any} style={{ cursor: onClick && 'pointer' }} >
            <Card.Header  >
                <Row>
                    <Col style={{ color: '#17a2b8', fontWeight: 'bold' }} className="d-flex justify-content-between align-items-center">
                        <div>
                            {voucher.code}
                            <Badge className="ml-1" variant="success">- {voucher.percent}%</Badge>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => copy(voucher.code)}
                            variant="outline-success"
                            className="ml-2"
                        >{copied ? t('copied') : t('copy')}</Button>
                    </Col>
                </Row>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <ProgressBar animated now={percent} label={`${percent}%`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcTreeStructure size={25} />
                    <span className="font-weight-bold ml-1"> {service_name} </span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcOrganization size={25} />
                    <span className="ml-1" >{server}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcClock size={25} className="mr-1" />
                    <span>{t('vouchers.expired_in')}</span>
                    <Badge className="ml-1" variant="warning">{dayjs(Date.now()).locale(lang).to(dayjs(voucher.end_time))}</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                    <FcGenealogy className="mr-1" size={25} />
                    <Badge variant="info" className="mr-1"> {voucher.used}</Badge>/
                    <Badge variant="primary" className="ml-1">{voucher.limit}</Badge>
                    <span className="ml-1">{t('vouchers.used')}</span>
                </ListGroup.Item>
                {voucher.min_require > 0 && <ListGroup.Item>
                    <FcRightUp className="mr-1" size={25} />
                    <span className="ml-1">{t('vouchers.min_order')}</span>
                    <Badge variant="primary" className="ml-1"><Credit value={voucher.min_require} /></Badge>
                </ListGroup.Item>}
                <ListGroup.Item>
                    <FcPositiveDynamic className="mr-1" size={25} />
                    <span className="ml-1">{t('vouchers.max_amount')}</span>
                    <Badge variant="primary" className="ml-1"><Credit value={voucher.max} /></Badge>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}