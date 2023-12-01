import './GameScreenStyles.scss'

export function CaptureTheFlag({ gameProperties }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING' || 'PREP':
			return (
				<main style={styles.main}>
					<p style={{ fontFamily: 'Poppins', fontSize: '64px' }}>Mission Brief In Progress</p>
				</main>
			)
		case 'ONGOING':
			return (
				<div id="capture-the-flag">
					<div className="red-flag-status">
						<div className={redFlagBorder()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" stroke="red" fill="red">
								<path d="M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z" />
							</svg>
						</div>
						<span>RED FLAG STATUS</span>
						<p>{gameProperties.redFlagStatus}</p>
					</div>
					<div className="blue-flag-status">
						<div className="blue-flag-status">
							<div className={blueFlagBorder()}>
								<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" stroke="blue" fill="blue">
									<path d="M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z" />
								</svg>
							</div>
							<span>BLUE FLAG STATUS</span>
							<p>{gameProperties.blueFlagStatus}</p>
						</div>
					</div>
				</div>
			)
		case 'DONE':
			return (
				<main style={styles.main}>
					Game has ended.
					{gameProperties.redFlagStatus === 'CAPTURED' ? <p>RED FLAG CAPTURED</p> : <></>}
					{gameProperties.blueFlagStatus === 'CAPTURED' ? <p>BLUE FLAG CAPTURED</p> : <></>}
				</main>
			)
	}

	function redFlagBorder() {
		if (gameProperties.redFlagStatus === 'CAPTURED') {
			return 'red-flag-icon-border'
		} else if (gameProperties.redFlagStatus === 'STOLEN') {
			return 'red-flag-icon-border red-dotted-border'
		} else {
			return 'red-flag-icon-border red-solid-border'
		}
	}

	function blueFlagBorder() {
		if (gameProperties.blueFlagStatus === 'CAPTURED') {
			return 'blue-flag-icon-border'
		} else if (gameProperties.blueFlagStatus === 'STOLEN') {
			return 'blue-flag-icon-border blue-dotted-border'
		} else {
			return 'blue-flag-icon-border blue-solid-border'
		}
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
