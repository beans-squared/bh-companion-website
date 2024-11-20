import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import WrenchIcon from './icons/Wrench'
import PartyIcon from './icons/Party'
import NumberListIcon from './icons/NumberList'
import TvIcon from './icons/Tv'
import PlayIcon from './icons/Play'
import PriceTagIcon from './icons/PriceTag'
import SprayIcon from './icons/Spray'
import PriceIcon from './icons/Price'
import MapIcon from './icons/Map'
import CalendarIcon from './icons/Calendar'
import KeyIcon from './icons/Key'

export default function App() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}

	return (
		<div style={styles.homepage}>
			<img src="logo.png" alt="the battle house logo" style={styles.homepage.logo} className="animate-1" />

			{/* <Link to={'agenda'}>
				<button style={styles.homepageButton} className="animate-2" disabled>
					<CalendarIcon />
					MY AGENDA
				</button>
			</Link> */}
			<Link to={'generator'}>
				<button style={styles.homepageButton} className="animate-3">
					<NumberListIcon />
					GENERATE GAME PLAYLIST
				</button>
			</Link>
			{/* <Link to={'reporter'}>
				<button style={styles.homepageButton} className="animate-4" disabled>
					<WrenchIcon />
					REPORT BROKEN EQUIPMENT
				</button>
			</Link> */}
			<Link to={'current-deals'}>
				<button style={styles.homepageButton} className="animate-5">
					<PriceTagIcon />
					VIEW CURRENT DEALS
				</button>
			</Link>
			<Link to={'pricing-reference'}>
				<button style={styles.homepageButton} className="animate-6">
					<PriceIcon />
					PRICING REFERENCE
				</button>
			</Link>
			{/* <Link to={'cleaning-list'}>
				<button style={styles.homepageButton} className="animate-7" disabled>
					<SprayIcon />
					CLEANING LIST
				</button>
			</Link> */}
			{/* <Link to={'room-manager'}>
				<button style={styles.homepageButton} className="animate-8" disabled>
					<PartyIcon />
					MANAGE PARTY ROOMS
				</button>
			</Link> */}
			{/* <Link to={'session-manager'}>
				<button style={styles.homepageButton} className="animate-9" disabled>
					<PlayIcon />
					RUN A SESSION
				</button>
			</Link> */}
			{/* <Link to={'spectator-view'}>
				<button style={styles.homepageButton} className="animate-10" disabled>
					<TvIcon />
					OPEN SPECTATOR VIEW
				</button>
			</Link> */}
			{/* <Link to={'arena-editor'}>
				<button style={styles.homepageButton} className="animate-11" disabled>
					<MapIcon />
					VIRTUAL ARENA MAP
				</button>
			</Link> */}
			<hr style={{ width: '100%' }} />
			{!session ? (
				<Link to={'login'}>
					<button style={styles.homepageButton} className="animate-1">
						<KeyIcon />
						SIGN IN
					</button>
				</Link>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
					<h2
						className="animate-1"
						style={{
							fontFamily: 'Poppins',
							border: '2px solid #fedd04',
							width: '400px',
							boxSizing: 'border-box',
							display: 'flex',
							justifyContent: 'center',
							padding: '0.25rem',
						}}
					>
						{session.user.email}
					</h2>
					<button onClick={signOut} style={styles.homepageButton} className="animate-1">
						<KeyIcon />
						SIGN OUT
					</button>
				</div>
			)}
		</div>
	)
}

const styles = {
	homepage: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1rem',
		marginTop: '2rem',
		logo: {
			height: '180px',
		},
	},
	homepageButton: {
		width: '400px',
		display: 'flex',
		gap: '1rem',
	},
}
