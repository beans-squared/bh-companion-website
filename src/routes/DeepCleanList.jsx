import tasks from '../../cleaning-tasks.json';
import './DeepCleanList.css';

export default function DeepCleanList() {
	function toggleMarkComplete() {
		const sect = document.querySelector('.markCompleteSection');
		if (sect.classList.contains('hidden')) {
			sect.classList.remove('hidden');
		} else {
			sect.classList.add('hidden');
		}
	}

	const listedTasks = tasks.map((task) => (
		<div key={task.name} className="deep-clean-item">
			<div onClick={toggleMarkComplete} id="clickable-area">
				<h1>{task.name}</h1>
				<div className="frequency-bar">
					<h2>X days overdue</h2>
					<h2>Every {task.daily_frequency} days</h2>
				</div>
			</div>
			<div className="markCompleteSection">
				<div id="inputs">
					<input
						type="date"
						defaultValue={new Date().toISOString().split('T')[0]}
					/>
					<input type="text" placeholder="Your initials" id="initials-input" />
				</div>
				<button onClick={toggleMarkComplete}>DONE</button>
			</div>
		</div>
	));

	return <div>{listedTasks}</div>;
}
