export default function Playlist({ playlist, regeneratePlaylist }) {
	let index = 0
	const listedGames = playlist.map((game) => (
		<div
			key={game.name}
			className={`animate-${index++}`}
			style={{
				border: '2px solid var(--color-brand)',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '400px',
				maxWidth: '90vw',
			}}
		>
			<p style={{ fontSize: '1.5rem', fontFamily: 'Poppins', padding: '0.25rem' }}>{game.name}</p>
		</div>
	))

	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>{listedGames}</div>
}
