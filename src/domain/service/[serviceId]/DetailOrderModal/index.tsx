import ModalHeader from 'components/ModalHeader'
import React from 'react'
import {Image, Modal} from 'react-bootstrap'
import styles from './index.module.scss'

type DetailOrderModalProps = {
	isShow: boolean
	onClose: () => void
}

const DetailOrderModal = ({
	isShow,
	onClose
}: DetailOrderModalProps) => {
	return (
		<>
			<Modal
				size="lg"
				show={isShow}
				onHide={onClose}
				keyboard={false}
			>
				<div className={styles.singleOrder}>
					<ModalHeader
						onClose={onClose}
						title="Đơn hàng #45643"
					/>
					<h1 className={styles.singleOrder__title + ' text-center mt-3'}>
						<Image
							className={styles.singleOrder__icontitle}
							src="/images/iconLike.png"
							fluid
						/>
						Dịch vụ tăng like facebook
					</h1>
					<div className={styles.singleOrder__des}>
						<div className={styles.singleOrder__users}>
							<div className={styles.singleOrder__user + '  text-center'}>
								<Image
									className={styles.singleOrder__userIcon}
									src="/images/singleorder1.png"
									fluid
								/>
								<div className={styles.singleOrder__userName}>
									Nguyễn Huyền Anh
								</div>
							</div>
							<div className={styles.singleOrder__user + '  text-center'}>
								<Image
									className={styles.singleOrder__userIcon}
									src="/images/singleorder2.png"
									fluid
								/>
								<div className={styles.singleOrder__userName}>
									ongmatmedia.com
								</div>
							</div>
						</div>
						<div className={styles.singleOrder__infor}>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor1.png"
									fluid
								/>

								<div
									style={{fontSize: '1.1rem ', fontWeight: 'bold'}}
									className={styles.singleOrder__text}
								>
									25/4/2020 (6 ngày trước)
								</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor2.png"
									fluid
								/>
								<div
									style={{
										fontSize: '1.1rem ',
										fontWeight: 'bold',
										color: '#EAA800',
									}}
									className={styles.singleOrder__text}
								>
									Tạm dừng
								</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor3.png"
									fluid
								/>
								<div
									style={{
										fontSize: '1.1rem ',
										fontWeight: 'bold',
									}}
									className={styles.singleOrder__text}
								>
									1000
								</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor4.png"
									fluid
								/>
								<div className={styles.singleOrder__text}>10đ x 1000 = 10k</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor5.png"
									fluid
								/>
								<div className={styles.singleOrder__text}>
									Đơn hàng lẻ / theo số lần sử dụng / theo thời gian
								</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor6.png"
									fluid
								/>
								<div className={styles.singleOrder__text}>
									Còn 7 lần sử dụng / 7 ngày sử dụng Giá trị thanh lý 20k
								</div>
							</div>
							<div className={styles.singleOrder__inforLine}>
								<Image
									className={styles.singleOrder__inforIcon}
									src="/images/iconInfor7.png"
									fluid
								/>
								<div className={styles.singleOrder__text}>
									Giá trị thanh lý 20k
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default DetailOrderModal
