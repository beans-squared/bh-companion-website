import { useEffect, useState } from 'react'
import EventRoom from '../components/EventRoom'

export default function RoomManager() {
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		if (rooms.length === 0) {
			fetch('http://localhost:3000', {
				method: 'GET',
				headers: {
					'x-api-key': 'apples',
				},
			})
				.then((res) => res.json())
				.then((res) => console.log(res))
				.then((res) => setRooms(res))
		} else {
			fetch('http://localhost:3000', {
				method: 'POST',
				headers: {
					'x-api-key': 'apples',
				},
				body: rooms,
			})
				.then((res) => res.json())
				.then((res) => setRooms(res))
		}
	}, [rooms])

	// `currentParty` is the index of the currently assigned party from the `parties` array
	// -1 means no party is currently assigned

	return (
		<div style={{ position: 'absolute', top: '0', width: '100vw', height: '100vh' }}>
			<h1 style={{ margin: '0 auto', maxWidth: '95vw' }}>Event Room Manager</h1>
			<div style={{ margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', maxWidth: '95vw' }}>
				{rooms.map((room) => (
					<EventRoom room={room} />
				))}
			</div>
		</div>
	)
}
