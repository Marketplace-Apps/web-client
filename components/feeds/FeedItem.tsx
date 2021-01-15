import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Card, Col, Row } from "react-bootstrap";
import { Feed, Voucher } from "../../types";

export type FeedItem = {
    onClick?: Function
    feed: Feed
}
export const FeedItem = ({ feed, onClick }: FeedItem) => {
    const { locale } = useRouter()
    return (
        <Row className="mt-3" onClick={onClick as any}>
            <Col xs={12} >
                <Card style={{ width: '100%', borderRadius: '20px 20px 0 0' }}>
                    <Card.Header
                        className="p-2 d-flex justify-content-between align-items-center"
                        style={{ borderRadius: '20px 20px 0 0' }}
                    >
                        <div>
                            <img
                                src="https://nguoicocongquangngai.com.vn/skin/images/all-images/1/avatar-367-456319.png"
                                width={40}
                            />
                            <span className="font-weight-bold"> Admin</span>
                        </div>
                        <div>{dayjs(feed.created_at).format('DD/MM/YYYY H:m')} ({dayjs(Date.now()).locale(locale).to(dayjs(feed.created_at))})</div>
                    </Card.Header>
                    <Card.Body
                        className="p-2 sun-editor-editable"
                        style={{ width: '100%', cursor: onClick && 'pointer' }}
                        dangerouslySetInnerHTML={{ __html: feed.content }}
                    />
                </Card>

            </Col>
        </Row >
    )
}