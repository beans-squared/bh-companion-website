import './App';

export default function GameList({ list }) {
	const listItems = list.map((game) => (
		<div key={game.name}>
			<h1>{game.name}</h1>
		</div>
	));

	return <div>{listItems}</div>;
}
