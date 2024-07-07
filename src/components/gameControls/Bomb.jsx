export function Bomb({ gameProperties, sendJsonMessage }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING' || 'PREP':
			return (
				<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'ONGOING' } })} style={{ margin: '0 auto' }}>
					START GAME
				</button>
			)
		case 'ONGOING':
			return ()
		case 'DONE':
			return ()
	}
}
