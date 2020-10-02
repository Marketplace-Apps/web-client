import React from 'react'
import {Button, ButtonProps, Spinner} from 'react-bootstrap'
import {omit} from '../../helpers'

type ICustomButtonProps = ButtonProps & {isLoading: boolean, loadingText: string}

const CustomButton = (props: ICustomButtonProps) => {
	const buttonProps = omit<ICustomButtonProps>(props, ['isLoading']) as any
	const {
		isLoading,
		loadingText,
		children
	} = props

	return (
		<>
			{
				isLoading && (
					<Button
						disabled
						{...buttonProps}
					>
						{
							loadingText
						}
						<Spinner variant="light" size="sm" animation="border" className="ml-2" />
					</Button>
				)
			}
			{
				!isLoading && (
					<Button
						{...buttonProps}
					>
						{
							children
						}
					</Button>
				)
			}
		</>
	)
}

export default CustomButton