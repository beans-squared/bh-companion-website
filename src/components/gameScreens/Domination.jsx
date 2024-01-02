import ProgressBar from '../ProgressBar'

export function Domination({ gameProperties }) {
	return (
		<section
			style={{
				padding: '16px',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h2>Total Control Points</h2>
				<h1 style={{ fontSize: '64px' }}>{gameProperties.totalCubes}</h1>
			</div>

			<div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						fontFamily: 'Poppins',
						fontSize: '32px'
					}}
				>
					<p>
						<span style={{ color: 'blue' }}>Blue Team</span>
						<br />
						has captured {gameProperties.blueCubes}
					</p>
					<p>
						{gameProperties.totalCubes - gameProperties.blueCubes - gameProperties.redCubes} control point{gameProperties.totalCubes - gameProperties.blueCubes - gameProperties.redCubes === 1 ? '' : 's'}
						<br />
						{gameProperties.totalCubes - gameProperties.blueCubes - gameProperties.redCubes === 1 ? 'is' : 'are'} contested
					</p>
					<p>
						<span style={{ color: 'red' }}>Red Team</span>
						<br />
						has captured {gameProperties.redCubes}
					</p>
				</div>
				<div className="meters">
					<ProgressBar key="blue-team-bar" bgcolor="blue" completed={Math.min(((gameProperties.blueCubes / gameProperties.totalCubes) * 100).toFixed(1), 100)} />
					<ProgressBar key="red-team-bar" bgcolor="red" completed={Math.min(((gameProperties.redCubes / gameProperties.totalCubes) * 100).toFixed(1), 100)} />
				</div>
			</div>
		</section>
	)
}
