import './GameScreen.scss'
import { CaptureTheFlag } from './gameScreens/CaptureTheFlag'
import { Domination } from './gameScreens/Domination'
import { SearchAndDestroy } from './gameScreens/SearchAndDestroy'

export function GameScreen({ game }) {
	return (
		<div className="game-screen">
			<section className="title-text">
				<h2>MISSION SCENARIO</h2>
				<h1>{game.name ? game.name : <>No game name found</>}</h1>
				<p>{game.description ? game.description : <>No game description found</>}</p>
			</section>

			<section className="data-display">{renderDataDisplay()}</section>
		</div>
	)

	function renderDataDisplay() {
		switch (game.name) {
			case 'Capture the Flag':
				return <CaptureTheFlag gameProperties={game.properties} />
			case 'Domination':
				return <Domination gameProperties={game.properties} />
			case 'Search and Destroy':
				return <SearchAndDestroy gameProperties={game.properties} />
			default:
				return <h2 className="not-supported">This game does not have a supported data display</h2>
		}
	}
}
