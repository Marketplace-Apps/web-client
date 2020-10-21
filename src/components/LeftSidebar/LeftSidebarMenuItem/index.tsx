import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { IconType } from 'react-icons/lib'

type LeftSidebarMenuItemProps = {
	onClick: () => void
	name: string
	Icon: IconType
	color: string
}

const LeftSidebarMenuItem = ({
	onClick,
	name,
	Icon,
	color,
}: LeftSidebarMenuItemProps) => (
	<ListGroup.Item
		className="list_group_item"
		style={{
			padding: '.5rem',
			border: '1px solid #fff',
			margin: '0rem 2rem 0.5rem 2rem',
			cursor: 'pointer',
		}}
	>
		<div onClick={onClick}>
			<Icon
				style={{
					color: color,
					fontSize: '3rem',
					padding: '5px',
				}}
				className="list_group_item__icon"
			/>

			<span
				style={{
					marginLeft: '.5rem',
					fontSize: '1.1rem',
					color: '#666666',
					fontWeight: 'bold',
				}}
				className="list_group_item__text"
			>
				{name}
			</span>
		</div>
	</ListGroup.Item>
)

export default LeftSidebarMenuItem
