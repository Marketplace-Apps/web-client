import CustomButton from 'components/CustomButton'
import ModalHeader from 'components/ModalHeader'
import React from 'react'
import {Form, Modal} from 'react-bootstrap'
import {FormProvider, useForm} from 'react-hook-form'
import {ServiceActionDocument} from 'types/firebase'
import AdvancedOptions from '../AdvancedOptions'
import CustomInput from '../CustomInput'
import styles from './index.module.scss'

interface IActionDetailModalProps {
	show: boolean
	onHide: () => void
	data: ServiceActionDocument
}

const ActionDetailModal = ({
	onHide,
	show,
	data
}: IActionDetailModalProps) => {

	const methods = useForm()
	const form = data.form
	const advancedOptions = data.advanced_options

	const onSubmit = methods.handleSubmit(async data => {
		console.log({data})
	})

	return (
		<Modal show={show} onHide={onHide}>
			<div className={styles.action}>
				<ModalHeader
					onClose={onHide}
					title={data.name}
				/>
				<FormProvider {...methods}>
					<Form
						onSubmit={onSubmit}
					>
						<div className={styles.action__des}>
							<Form.Group>
								{
									form && form.map((config: any) => <CustomInput config={config} />)
								}
								{
									advancedOptions && <AdvancedOptions data={advancedOptions} />
								}
							</Form.Group>
							<div className="text-center">
								<CustomButton
									style={{backgroundColor: '#66C8FF', color: '#fff'}}
									variant="outline-info"
									isLoading={false}
									loadingText="Đang thực hiện"
									type="submit"
								>
									Thực hiện
							</CustomButton>
							</div>
						</div>
					</Form>
				</FormProvider>
			</div>
		</Modal>
	)
}

export default ActionDetailModal