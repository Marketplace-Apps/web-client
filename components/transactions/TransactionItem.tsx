import { PaymentHistory } from "../../types"
import styles from './index.module.scss'
import { Image } from 'react-bootstrap'

export const ListTransactionsItem = (props: PaymentHistory) => {
	return (
		<div className={styles.pageHistory_serviceWrap}>
			<div className={styles.pageHistory_service}>
				<div className={styles.pageHistory_service__des}>
					<div className={styles.pageHistory_service__icon}>
						{/* <Image src={icon} width="50px" /> */}
					</div>
					<div className={styles.pageHistory_service__text}>
	<div className="mb-1">{}</div>
						<div style={{ color: '#666666' }}>
							{new Date(props.created_at).toLocaleTimeString('vi')}
						</div>
					</div>
				</div>
				<div className={styles.pageHistory_service__sta}>
					<div className={styles.pageHistory_service__price}>
						{props.total.toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	)
}