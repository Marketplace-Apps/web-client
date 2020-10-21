import { auth } from 'firebase/app'
import dayjs from 'libs/dayjs'
import React from 'react'
import { Col, Image, Modal, Row } from 'react-bootstrap'
import {
	FaChartLine,
	FaClock,
	FaDollarSign,
	FaHourglassHalf,
	FaRegHeart,
} from 'react-icons/fa'
import { RiBillFill } from 'react-icons/ri'
import {
	DomainDocument,
	DomainServiceDocument,
	IframeDocument,
	OrderDocument,
	ServiceActionDocument,
} from 'types/firebase'
import { compileJavascriptCode } from '../../../../helpers'
import styles from './index.module.scss'

type DetailOrderModalProps = {
	isShow: boolean
	onClose: () => void
	data: OrderDocument
	serviceData: DomainServiceDocument
	domainData: DomainDocument
	orderActions: ServiceActionDocument[]
	onSelectAction: (action: ServiceActionDocument) => void
	orderWidgetIframes: IframeDocument[]
}

const STATUS = {
	done: 'Đã hoàn thành',
	processing: 'Đang xử lý ',
	expired: 'Hết hạn',
	pause: 'Tạm dừng',
	error: 'Xảy ra lỗi',
}

const TYPE = {
	'time-limit': 'Theo số lần sử dụng',
	'one-time': 'Đơn hàng lẻ',
	'time-by-time': 'Theo số lần sử dụng',
}

const DetailOrderModal = ({
	isShow,
	onClose,
	data: order,
	data: {
		fullname,
		created_at,
		status,
		amount,
		type,
		id,
		remain_amount,
		end_time,
		total,
	},
	serviceData,
	domainData,
	orderActions,
	onSelectAction,
	orderWidgetIframes,
}: DetailOrderModalProps) => {
	return (
		<Modal size="lg" show={isShow} onHide={onClose} keyboard={false}>
			<div
				className={styles.singleOrder}
				style={{
					marginBottom: 0,
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>{`Đơn hàng #${id}`}</Modal.Title>
				</Modal.Header>
				<h1 className={styles.singleOrder__title + ' text-center mt-3'}>
					<Image
						className={styles.singleOrder__icontitle}
						src={serviceData.icon}
						width="50px"
					/>
					{serviceData.name}
				</h1>
				<div className={styles.singleOrder__des}>
					<div className={styles.singleOrder__users}>
						<div className={styles.singleOrder__user + '  text-center'}>
							<Image
								className={styles.singleOrder__userIcon}
								src={
									auth().currentUser.isAnonymous
										? '/images/singleorder1.png'
										: auth().currentUser.providerData[0].photoURL
								}
								fluid
							/>
							<div className={styles.singleOrder__userName}>{fullname}</div>
						</div>
						<div className={styles.singleOrder__user + '  text-center'}>
							<Image
								className={styles.singleOrder__userIcon}
								src={domainData?.logo_url}
								width="70px"
							/>
							<div className={styles.singleOrder__userName}>
								{domainData?.domain_name}
							</div>
						</div>
					</div>
					<div className={styles.singleOrder__infor}>
						<div className={styles.singleOrder__inforLine}>
							<FaClock className={styles.singleOrder__inforIcon} />

							<div
								style={{ fontSize: '1.1rem ', fontWeight: 'bold' }}
								className={styles.singleOrder__text}
							>
								{`${new Date(created_at).toLocaleDateString('vi')} (${dayjs(
									new Date(created_at),
								)
									.locale('vi')
									.fromNow()})`}
							</div>
						</div>
						<div className={styles.singleOrder__inforLine}>
							<FaRegHeart
								className={styles.singleOrder__inforIcon}
								color="red"
							/>
							<div
								style={{
									fontSize: '1.1rem ',
									fontWeight: 'bold',
									color: '#EAA800',
								}}
								className={styles.singleOrder__text}
							>
								{STATUS[status]}
							</div>
						</div>
						<div className={styles.singleOrder__inforLine}>
							<FaChartLine className={styles.singleOrder__inforIcon} />
							<div
								style={{
									fontSize: '1.1rem ',
									fontWeight: 'bold',
								}}
								className={styles.singleOrder__text}
							>
								{amount.toLocaleString('vi')}
							</div>
						</div>
						<div className={styles.singleOrder__inforLine}>
							<FaDollarSign className={styles.singleOrder__inforIcon} />
							<div className={styles.singleOrder__text}>
								{total.toLocaleString()}
							</div>
						</div>
						<div className={styles.singleOrder__inforLine}>
							<RiBillFill className={styles.singleOrder__inforIcon} />
							<div className={styles.singleOrder__text}>{TYPE[type]}</div>
						</div>
						<div className={styles.singleOrder__inforLine}>
							<FaHourglassHalf className={styles.singleOrder__inforIcon} />
							<div className={styles.singleOrder__text}>
								Còn {remain_amount} lần sử dụng /{' '}
								{Math.ceil((end_time - created_at) / 1000 / 86400)} ngày sử dụng
							</div>
						</div>
					</div>
					<Row>
						{orderActions?.map(orderAction => (
							<Col xs={6} sm={4} md={3}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										cursor: 'pointer',
									}}
									onClick={() => onSelectAction(orderAction)}
								>
									<Image src={orderAction?.icon} width="50px" />
									<p className="font-weight-bold">{orderAction.name}</p>
								</div>
							</Col>
						))}
					</Row>
					{orderWidgetIframes?.map(orderWidgetIframe => (
						<div>
							<iframe
								src={compileJavascriptCode(orderWidgetIframe?.url, order)}
								width="100%"
								height="100%"
								seamless
								style={{
									border: 'none',
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</Modal>
	)
}

export default DetailOrderModal
