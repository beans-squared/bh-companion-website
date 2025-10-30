import { supabase } from '../supabaseClient'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function GunReserver() {
	const [guns, setGuns] = useState([])
	const [sessions, setSessions] = useState([])
	const [display, setDisplay] = useState('list')
	const [selectedGun, setSelectedGun] = useState(null)

	const [formSession, setFormSession] = useState('')
	const [formTeam, setFormTeam] = useState('red')
	const [formHour, setFormHour] = useState(1)

	useEffect(() => {
		fetchGuns().then((guns) => setGuns(guns))
		fetchSessions().then((sessions) => setSessions(sessions))
	}, [])

	async function fetchGuns() {
		try {
			const { data, error } = await supabase.from('guns').select()
			if (error) {
				throw error
			}
			return data
		} catch (error) {
			console.log('Error fetching guns: ', error.message)
		}
	}

	async function fetchSessions() {
		try {
			const { data, error } = await supabase.from('sessions').select().eq('day', new Date().getDay())
			if (error) {
				throw error
			}
			return data
		} catch (error) {
			console.log('Error fetching sessions: ', error.message)
		}
	}

	async function submitReservation() {
		try {
			const { error } = await supabase.from('gun_reservations').insert({ gun_id: selectedGun.id, session_id: formSession, date: new Date() })
		} catch (error) {
			console.log('Error reserving gun: ', error.message)
		}
	}

	if (display === 'list') {
		return (
			<div>
				{guns.map((gun) => (
					<button
						key={gun.id}
						onClick={(event) => {
							setDisplay('gun')
							setSelectedGun(gun)
						}}
					>
						{gun.name}
					</button>
				))}
			</div>
		)
	} else {
		return (
			<div>
				<h1>{selectedGun.name}</h1>
				<select value={formSession} onChange={(event) => setFormSession(event.target.value)}>
					{sessions.map((session) => (
						<option key={session.id} value={session.id}>
							{dayjs()
								.set('hour', session.time.substring(0, 2))
								.set('minute', session.time.substring(3, 5))
								.set('second', session.time.substring(6, 8))
								.format('h:mm')}
						</option>
					))}
				</select>

				<div>
					<button
						style={formTeam === 'red' ? { backgroundColor: 'red', border: '2px solid yellow' } : { backgroundColor: 'red', opacity: '25%' }}
						onClick={(event) => setFormTeam('red')}
					>
						RED
					</button>
					<button
						style={formTeam === 'blue' ? { backgroundColor: 'blue', border: '2px solid yellow' } : { backgroundColor: 'blue', opacity: '25%' }}
						onClick={(event) => setFormTeam('blue')}
					>
						BLUE
					</button>
				</div>

				<div>
					<button
						style={formHour === 1 ? { backgroundColor: 'green', border: '2px solid yellow' } : { backgroundColor: 'green', opacity: '25%' }}
						onClick={(event) => setFormHour(1)}
					>
						1 HR
					</button>
					<button
						style={formHour === 2 ? { backgroundColor: 'gold', border: '2px solid yellow' } : { backgroundColor: 'gold', opacity: '25%' }}
						onClick={(event) => setFormHour(2)}
					>
						2 HR
					</button>
					<button
						style={formHour === 3 ? { backgroundColor: 'silver', border: '2px solid yellow' } : { backgroundColor: 'silver', opacity: '25%' }}
						onClick={(event) => setFormHour(3)}
					>
						3 HR
					</button>
					<button
						style={formHour === 4 ? { backgroundColor: 'yellow', border: '2px solid yellow' } : { backgroundColor: 'yellow', opacity: '25%' }}
						onClick={(event) => setFormHour(4)}
					>
						4 HR
					</button>
				</div>

				<button onClick={(event) => submitReservation()}>SUBMIT</button>
			</div>
		)
	}
}
