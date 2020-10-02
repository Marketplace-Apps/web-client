import React from 'react'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import CustomInput from '../CustomInput'
import styles from './index.module.scss'

const AdvancedOption = (props: {
	id: string
	label: string
	form: any
}) => {

	const {
		id, label, form
	} = props

	const {register, watch} = useForm<{
		status: boolean
	}>()

	const statusOption = watch('status', false)

	return (
		<div
			className={styles.action_selectAdvanced}
		>
			<div className={styles.action_selectAdvanced__header}>
				<Form.Group style={{margin: 0}}>
					<Form.Check
						type="checkbox"
						label={label}
						defaultChecked={false}
						name="status"
						ref={register}
					/>
				</Form.Group>
			</div>
			{
				statusOption && (
					<div className={styles.action_selectAdvanced__des}>
						{
							form && form.map((config: any) => (
								<CustomInput
									config={config}
									prefixName={id}
								/>
							))
						}
					</div>
				)
			}
		</div>
	)
}

export default AdvancedOption
