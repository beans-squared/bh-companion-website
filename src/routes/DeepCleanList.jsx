import tasks from '../../cleaning-tasks.json';

export default function DeepCleanList() {
	const listedTasks = tasks.map((task) => (
		<div key={task.name}>
			<div>
				<h1>{task.name}</h1>
				<h2>{task.daily_frequency}</h2>
			</div>
			<h3>X days overdue</h3>
			<div>
				<input
					type="date"
					defaultValue={new Date().toISOString().split('T')[0]}
				/>
				<input type="text" placeholder="Your initials" />
				<button>MARK COMPLETE</button>
			</div>
		</div>
	));

	return <div>{listedTasks}</div>;
}
