export function CaptureTheFlag({ gameProperties }) {
	switch (gameProperties.gameStage) {
		case 'BRIEFING' || 'PREP':
			return (
				<main
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<p style={{ fontFamily: 'Poppins', fontSize: '64px' }}>Mission Brief In Progress</p>
				</main>
			)
		case 'ONGOING':
			return (
				<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<div style={redFlagBorder()}>
							<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" stroke="red" fill="red">
								<path d="M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z" />
							</svg>
						</div>
						<span style={{ fontSize: '3rem', marginTop: '1rem' }}>RED FLAG STATUS</span>
						<p style={{ fontSize: '4rem', marginTop: '0.5rem' }}>{gameProperties.redFlagStatus}</p>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<div style={blueFlagBorder()}>
								<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" stroke="blue" fill="blue">
									<path d="M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z" />
								</svg>
							</div>
							<span style={{ fontSize: '3rem', marginTop: '1rem' }}>BLUE FLAG STATUS</span>
							<p style={{ fontSize: '4rem', marginTop: '0.5rem' }}>{gameProperties.blueFlagStatus}</p>
						</div>
					</div>
				</div>
			)
		case 'DONE':
			return (
				<main
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						height: '100%',
					}}
				>
					Game has ended.
					{gameProperties.redFlagStatus === 'CAPTURED' ? <p>RED FLAG CAPTURED</p> : <></>}
					{gameProperties.blueFlagStatus === 'CAPTURED' ? <p>BLUE FLAG CAPTURED</p> : <></>}
				</main>
			)
	}

	function redFlagBorder() {
		const redFlagDefault = { borderRadius: '50%', padding: '4rem' }

		if (gameProperties.redFlagStatus === 'CAPTURED') {
			return { ...redFlagDefault, border: '10px solid rgba(0, 0, 0, 0)' }
		} else if (gameProperties.redFlagStatus === 'STOLEN') {
			return { ...redFlagDefault, border: '10px dotted red', opacity: '75%' }
		} else {
			return { ...redFlagDefault, border: '10px solid red' }
		}
	}

	function blueFlagBorder() {
		const blueFlagDefault = { borderRadius: '50%', padding: '4rem' }

		if (gameProperties.blueFlagStatus === 'CAPTURED') {
			return { ...blueFlagDefault, border: '10px solid rgba(0, 0, 0, 0)' }
		} else if (gameProperties.blueFlagStatus === 'STOLEN') {
			return { ...blueFlagDefault, border: '10px dotted blue', opacity: '75%' }
		} else {
			return { ...blueFlagDefault, border: '10px solid blue' }
		}
	}
}
