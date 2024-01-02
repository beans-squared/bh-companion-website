import { CaptureTheFlag } from './gameScreens/CaptureTheFlag'
import { Domination } from './gameScreens/Domination'
import { SearchAndDestroy } from './gameScreens/SearchAndDestroy'

export function GameScreen({ game }) {
	return (
		<div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<section style={{ padding: '1rem' }}>
				<h2 style={{ fontSize: '2rem' }}>MISSION SCENARIO</h2>
				<h1 style={{ fontSize: '4rem' }}>{game.name ? game.name : <>No game name found</>}</h1>
				<p style={{ fontSize: '1.5rem', fontFamily: 'Poppins' }}>{game.description ? game.description : <>No game description found</>}</p>
			</section>

			<section style={{ flexBasis: '100%' }}>{renderDataDisplay()}</section>
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
				return (
					<h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontFamily: 'Poppins', color: '#9d2d2d' }}>
						This game does not have a supported data display
					</h2>
				)
		}
	}
}
