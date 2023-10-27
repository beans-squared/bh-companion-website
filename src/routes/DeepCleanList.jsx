import { useEffect, useState } from 'react'
import './DeepCleanList.css'

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
		<div key={task.id} className="deep-clean-item" hidden={!task.overdue}>
			<div onClick={toggleMarkComplete} id="clickable-area">
				<h1>{task.name}</h1>
				<div className="frequency-bar">
					<h2>
						{task.timeSinceLastCompletionString} overdue - last completed {new Date(task.dateCompleted).toLocaleDateString()}
					</h2>
					<h2>Every {task.frequency} days</h2>
				</div>
			</div>
			<div className="markCompleteSection">
				<div id="inputs">
					<input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
					<input type="text" placeholder="Your initials" id="initials-input" />
				</div>
				<button onClick={() => (task.overdue = false)}>MARK COMPLETED</button>
			</div>
		</div>
	))

	return <div>{listedTasks}</div>
}
