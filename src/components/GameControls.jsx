import { CaptureTheFlag } from './gameControls/CaptureTheFlag'
import { Domination } from './gameControls/Domination'
import { SearchAndDestroy } from './gameControls/SearchAndDestroy'

export function GameControls({ game, sendJsonMessage }) {
	return (
		<div style={{ display: 'flex'}}>
			{game.name === 'Capture the Flag' ? <CaptureTheFlag gameProperties={game.properties} sendJsonMessage={sendJsonMessage} /> : <></>}
			{game.name === 'Domination' ? <Domination gameProperties={game.properties} sendJsonMessage={sendJsonMessage} /> : <></>}
			{game.name === 'Search and Destroy' ? <SearchAndDestroy gameProperties={game.properties} sendJsonMessage={sendJsonMessage} /> : <></>}
		</div>
	)
}
