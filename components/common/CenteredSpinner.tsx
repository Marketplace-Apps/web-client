import { Col, Row, Spinner, SpinnerProps } from "react-bootstrap";

export const CenteredSpinner = (props: Partial<SpinnerProps> = {}) => (
	<Row>
		<Col xs={12} className="text-center mt-2">
			<Spinner
				animation="border"
				variant="primary"
				{...props} />
		</Col>
	</Row>
)