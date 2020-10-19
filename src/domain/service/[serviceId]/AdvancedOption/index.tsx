import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import AlertBox from '../AlertBox'
import GenericInput from '../GenericInput'
import styles from './index.module.scss'

const AdvancedOption = (props: {
	data: { id: string; label: string; form: any }
	serviceConfig: object
}) => {
	const {
		data: { id, label, form },
		serviceConfig,
	} = props

	const { register, watch } = useForm<{
		status: boolean
	}>()

	const statusOption = watch('status', false)

	return (
		<div className={styles.action_selectAdvanced}>
			<div className={styles.action_selectAdvanced__header}>
				<Form.Group style={{ margin: 0 }}>
					<Form.Check
						type="checkbox"
						label={label}
						defaultChecked={false}
						name="status"
						ref={register}
					/>
				</Form.Group>
			</div>
			{statusOption && (
				<div className={styles.action_selectAdvanced__des}>
					{form &&
						form.map((item: any) => (
							<>
								{item.type === 'alert' && (
									<AlertBox
										content={item.content}
										level={item.level}
										visible={item.visible}
										config={item.config}
									/>
								)}
								{item.type !== 'alert' && (
									<GenericInput
										inputConfig={item}
										serviceConfig={serviceConfig}
									/>
								)}
							</>
						))}
				</div>
			)}
		</div>
	)
}

export default AdvancedOption
