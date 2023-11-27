import { useState } from 'react'

export function Domination({ gameProperties, sendJsonMessage }) {
	const [totalCubes, setTotalCubes] = useState(gameProperties.totalCubes)
	const [blueCubes, setBlueCubes] = useState(gameProperties.blueCubes)
	const [redCubes, setRedCubes] = useState(gameProperties.redCubes)

	function update(event) {
		event.preventDefault()

		sendJsonMessage({
			command: 'update_current_game_data',
			data: {
				totalCubes: event.target.totalCubes.value,
				blueCubes: event.target.blueCubes.value,
				redCubes: event.target.redCubes.value,
			},
		})
	}

	return (
		<form onSubmit={update} style={{ fontFamily: 'Poppins', padding: '16px' }}>
			<div
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '60px',
					width: '100%',
				}}
			>
				<label htmlFor="totalCubes">Total Cubes</label>
				<input type="number" name="totalCubes" value={totalCubes} style={{ width: '100%' }} />
				<div
					style={{
						display: 'flex',
						gap: '8px',
					}}
				>
					<button onClick={() => setTotalCubes(totalCubes + 1)} style={{ height: '50px', width: '50px' }}>
						+
					</button>
					<button onClick={() => setTotalCubes(totalCubes - 1)} style={{ height: '50px', width: '50px' }}>
						-
					</button>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '60px',
					width: '100%',
				}}
			>
				<label htmlFor="blueCubes">Blue Cubes</label>
				<input type="number" name="blueCubes" value={blueCubes} style={{ width: '100%' }} />
				<div
					style={{
						display: 'flex',
						gap: '8px',
					}}
				>
					<button onClick={() => setBlueCubes(blueCubes + 1)} style={{ height: '50px', width: '50px' }}>
						+
					</button>
					<button onClick={() => setBlueCubes(blueCubes - 1)} style={{ height: '50px', width: '50px' }}>
						-
					</button>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '60px',
					width: '100%',
				}}
			>
				<label htmlFor="redCubes">Red Cubes</label>
				<input type="number" name="redCubes" value={redCubes} style={{ width: '100%' }} />
				<div
					style={{
						display: 'flex',
						gap: '8px',
					}}
				>
					<button onClick={() => setRedCubes(redCubes + 1)} style={{ height: '50px', width: '50px' }}>
						+
					</button>
					<button onClick={() => setRedCubes(redCubes - 1)} style={{ height: '50px', width: '50px' }}>
						-
					</button>
				</div>
			</div>
		</form>
	)
}
