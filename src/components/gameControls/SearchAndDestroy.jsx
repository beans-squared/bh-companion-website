export function SearchAndDestroy({ gameProperties, sendJsonMessage }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING':
			return <button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'PREP' } })}>SET UP GAME</button>
		case 'PREP':
			return (
				<form
					onSubmit={(event) => {
						event.preventDefault()
						sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'ONGOING', plantLocation: event.target.plantLocation.value } })
					}}
				>
					<label htmlFor="plantLocation">Set Plant Location</label>
					<div>
						<select name="plantLocation">
							<optgroup label="First Floor">
								<option value="FIRST FLOOR OF A1">A1-1F</option>
								<option value="FIRST FLOOR OF A2">A2-1F</option>
								<option value="FIRST FLOOR OF A3">A3-1F</option>
								<option value="FIRST FLOOR OF THE BANK">BANK-1F</option>
								<option value="FIRST FLOOR OF C1">C1-1F</option>
								<option value="FIRST FLOOR OF C2">C2-1F</option>
								<option value="FIRST FLOOR OF C3">C3-1F</option>
								<option value="FIRST FLOOR OF THE POLICE STATION">POLICE-1F</option>
							</optgroup>
							<optgroup label="Second Floor">
								<option value="SECOND FLOOR OF A1">A1-2F</option>
								<option value="SECOND FLOOR OF A2">A2-2F</option>
								<option value="SECOND FLOOR OF A3">A3-2F</option>
								<option value="SECOND FLOOR OF THE BANK">BANK-2F</option>
								<option value="SECOND FLOOR OF C1">C1-2F</option>
								<option value="SECOND FLOOR OF C2">C2-2F</option>
								<option value="SECOND FLOOR OF C3">C3-2F</option>
								<option value="SECOND FLOOR OF THE POLICE STATION">POLICE-2F</option>
							</optgroup>
						</select>
						<button type="submit">Set Location</button>
					</div>
				</form>
			)
		case 'ONGOING':
			return (
				<div>
					{gameProperties.bombStatus === 'HIDDEN' ? (
						<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { bombStatus: 'RETRIEVED' } })}>
							Attackers have retrieved the bomb
						</button>
					) : (
						<></>
					)}
					{gameProperties.bombStatus === 'RETRIEVED' ? (
						<div>
							<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { bombStatus: 'PLANTED' } })}>Bomb has been planted</button>
							<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { bombStatus: 'HIDDEN' } })}>
								Attackers have dropped the bomb
							</button>
						</div>
					) : (
						<></>
					)}
					{gameProperties.bombStatus === 'PLANTED' ? (
						<div>
							<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'DONE', bombStatus: 'DEFUSED' } })}>
								Bomb has been defused
							</button>
							<button onClick={() => sendJsonMessage({ command: 'update_current_game_data', data: { gameStage: 'DONE', bombStatus: 'DETONATED' } })}>
								Bomb successfully detonated
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			)
		case 'DONE':
			return (
				<p>
					Game has ended.
					{gameProperties.bombStatus === 'DETONATED' ? ' Attackers detonated the bomb.' : ' Defenders defused the bomb.'}
				</p>
			)
	}
}
