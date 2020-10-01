import CustomButton from 'components/CustomButton'
import ServiceDetailContainer from 'domain/service/[serviceId]/components/ServiceDetailContainer'
import MainLayout from 'layouts/MainLayout'
import React from 'react'
import {Form} from 'react-bootstrap'

const PricePage = () => {

	return (
		<MainLayout
			title="Cài đặt giá "
		>
			<ServiceDetailContainer>
				<Form
					style={{
						padding: 30
					}}
				>
					<Form.Group>
						<Form.Label>Giá nhập vào</Form.Label>
						<Form.Control
							type="number"
							placeholder="Giá nhập vào"
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Giá bán tối thiểu </Form.Label>
						<Form.Control
							type="number"
							placeholder="Giá bán tối thiểu "
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Check
						type="checkbox"
						label="Giá nhập tăng theo tỉ lệ % khi người dùng để giá cao hơn giá tối thiểu"
						className="mb-3"
						name="is_auto"
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "center"
						}}
					>
						<CustomButton
							type="submit"
							isLoading={false}
							loadingText="Đang lưu"
						>
							Lưu
					</CustomButton>
					</div>
				</Form>
			</ServiceDetailContainer>
		</MainLayout>
	)
}

export default PricePage