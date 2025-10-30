import { useState } from 'react'

export function CreateNewAgendaItemModal() {
	const [title, setTitle] = useState('New item')
	const [description, setDescription] = useState(null)
	const [type, setType] = useState(0)
	// 0 = Task, 1 = Event
	const [date, setDate] = useState(null)
	// Behavior of 'date' changes depending on the item type.
	// Task (0) types treat 'date' as a due date
	// Event (1) types treat 'date' as the date the event occurs
	const [associatedUsersPublic, setAssociatedUsersPublic] = useState(null)
	const [associatedUsersPrivate, setAssociatedUsersPrivate] = useState(null)

	return (
		<div
			style={{
				width: '90vw',
				position: 'absolute',
				border: '2px solid red',
				top: '1rem',
				display: 'flex',
				flexDirection: 'column',
				width: '640px',
				boxShadow: '5px 5px 5px 5px black',
				gap: '0.5rem',
				padding: '1rem',
				background: '#000000',
			}}
		>
			<h1>Create a new agenda item</h1>
			<input type="text" placeholder="title" />
			<input type="text" placeholder="description" />
			<select name="" id="">
				<option value="0" selected>
					Task
				</option>
				<option value="1">Event</option>
			</select>
			<input type="date" />
		</div>
	)
}
