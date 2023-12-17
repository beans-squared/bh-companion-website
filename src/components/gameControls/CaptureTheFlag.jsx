export function CaptureTheFlag({ gameProperties, sendJsonMessage }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING' || 'PREP':
			return (
				<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'ONGOING' } })} style={{ margin: '0 auto' }}>
					START GAME
				</button>
			)
		case 'ONGOING':
			return (
				<form
					onSubmit={(event) => {
						event.preventDefault()
						sendJsonMessage({
							command: 'update_current_game_data',
							data: {
								redFlagStatus: event.target.redFlagStatus.value,
								blueFlagStatus: event.target.blueFlagStatus.value,
							},
						})
					}}
				>
					<label htmlFor="redFlagStatus">Red Flag Status</label>
					<select name="redFlagStatus">
						<option value="RETURNED">RETURNED</option>
						<option value="STOLEN">STOLEN</option>
						<option value="CAPTURED">CAPTURED</option>
					</select>
					<label htmlFor="blueFlagStatus">Blue Flag Status</label>
					<select name="blueFlagStatus">
						<option value="RETURNED">RETURNED</option>
						<option value="STOLEN">STOLEN</option>
						<option value="CAPTURED">CAPTURED</option>
					</select>
					<button type="submit">Update Status</button>
					{gameProperties.blueFlagStatus === 'CAPTURED' || gameProperties.redFlagStatus === 'CAPTURED' ? (
						<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'DONE' } })}>End Game</button>
					) : (
						<></>
					)}
				</form>
			)
		case 'DONE':
			return (
				<div>
					{gameProperties.redFlagStatus === 'CAPTURED' ? <p>RED FLAG CAPTURED</p> : <></>}
					{gameProperties.blueFlagStatus === 'CAPTURED' ? <p>BLUE FLAG CAPTURED</p> : <></>}
				</div>
			)
	}
}
