import './Playlist.css';

export default function Playlist({ playlist, regeneratePlaylist }) {
	let index = 0;
	const listedGames = playlist.map((game) => (
		<div key={game.name} className={'gamelist-item ' + `animate-${index++}`}>
			<p className="playlist-item-text">{game.name}</p>
		</div>
	));

	return <div id="game-list">{listedGames}</div>;
}
