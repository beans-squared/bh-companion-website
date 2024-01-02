import { useEffect, useState } from 'react'

export default function DeepCleanList() {
	const [tasks, setTasks] = useState([])

	function toggleMarkComplete(id) {
		const rawTasks = tasks

		const rawTask = rawTasks.find((task) => {
			return task.id === id
		})

		setTasks(rawTasks)
	}

	useEffect(() => {
		let ignore = false

		fetch('http://localhost:3000').then(async (data) => {
			if (!ignore) {
				setTasks(await data.json())
			}
		})

		return () => {
			ignore = true
		}
	}, [])

	const listedTasks = tasks.map((task) => (
		<div
			key={task.id}
			style={{
				border: '2px solid var(--color-brand)',
				padding: '1rem',
				margin: '1rem',
				maxWidth: '90vw',
				boxSizing: 'border-box',
				display: task.overdue ? 'default' : 'none',
			}}
		>
			<div onClick={toggleMarkComplete} style={{ cursor: 'pointer' }}>
				<h1 style={{ fontSize: '1.5rem' }}>{task.name}</h1>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h2 style={{ fontFamily: 'Poppins', fontSize: '1rem' }}>
						{task.timeSinceLastCompletionString} overdue - last completed {new Date(task.dateCompleted).toLocaleDateString()}
					</h2>
					<h2>Every {task.frequency} days</h2>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', margin: '1rem 0' }}>
					<input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '50%' }} />
					<input type="text" placeholder="Your initials" id="initials-input" style={{ width: '50%' }} />
				</div>
				<button onClick={() => (task.overdue = false)}>MARK COMPLETED</button>
			</div>
		</div>
	))

	return <div>{listedTasks}</div>
}
