export function SearchAndDestroy({ gameProperties }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING' || 'PREP':
			return (
				<main style={styles.main}>
					<p style={{ fontFamily: 'Poppins', fontSize: '64px' }}>Mission Brief In Progress</p>
				</main>
			)
		case 'ONGOING':
			return (
				<main style={styles.main}>
					<div>
						<h1>TARGET LOCATION</h1>
						<p>{gameProperties.plantLocation}</p>
					</div>
					<div>
						<h1>BOMB STATUS</h1>
						<p>
							{gameProperties.bombStatus === 'HIDDEN' ? 'ATTACKERS ARE SEARCHING FOR THE BOMB' : <></>}
							{gameProperties.bombStatus === 'RETRIEVED' ? 'ATTACKERS HAVE RETRIEVED THE BOMB' : <></>}
							{gameProperties.bombStatus === 'PLANTED' ? 'ATTACKERS HAVE ARMED THE BOMB AT THE TARGET LOCATION' : <></>}
						</p>
					</div>
				</main>
			)
		case 'DONE':
			return (
				<main style={styles.main}>
					Game has ended.
					{gameProperties.bombStatus === 'DETONATED' ? ' Attackers detonated the bomb.' : ' Defenders defused the bomb.'}
				</main>
			)
	}
}

const styles = {
	main: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',
	},
}
