import { Link } from 'react-router-dom'
import WrenchIcon from './icons/Wrench'
import PartyIcon from './icons/Party'
import NumberListIcon from './icons/NumberList'
import TvIcon from './icons/Tv'
import PlayIcon from './icons/Play'
import PriceTagIcon from './icons/PriceTag'
import SprayIcon from './icons/Spray'
import PriceIcon from './icons/Price'
import MapIcon from './icons/Map'

export default function App() {
	return (
		<div style={styles.homepage}>
			<img src="logo.png" alt="the battle house logo" style={styles.homepage.logo} className="animate-1" />
			<Link to={'generator'}>
				<button style={styles.homepageButton} className="animate-2">
					<NumberListIcon />
					GENERATE GAME PLAYLIST
				</button>
			</Link>
			<Link to={'reporter'}>
				<button style={styles.homepageButton} className="animate-3" disabled>
					<WrenchIcon />
					REPORT BROKEN EQUIPMENT
				</button>
			</Link>
			<Link to={'current-deals'}>
				<button style={styles.homepageButton} className="animate-4">
					<PriceTagIcon />
					VIEW CURRENT DEALS
				</button>
			</Link>
			<Link to={'pricing-reference'}>
				<button style={styles.homepageButton} className="animate-5">
					<PriceIcon />
					PRICING REFERENCE
				</button>
			</Link>
			<Link to={'cleaning-list'}>
				<button style={styles.homepageButton} className="animate-6" disabled>
					<SprayIcon />
					CLEANING LIST
				</button>
			</Link>
			<Link to={'room-manager'}>
				<button style={styles.homepageButton} className="animate-7" disabled>
					<PartyIcon />
					MANAGE PARTY ROOMS
				</button>
			</Link>
			<Link to={'session-manager'}>
				<button style={styles.homepageButton} className="animate-8" disabled>
					<PlayIcon />
					RUN A SESSION
				</button>
			</Link>
			<Link to={'spectator-view'}>
				<button style={styles.homepageButton} className="animate-9" disabled>
					<TvIcon />
					OPEN SPECTATOR VIEW
				</button>
			</Link>
			<Link to={'arena-editor'}>
				<button style={styles.homepageButton} className="animate-10" disabled>
					<MapIcon />
					VIRTUAL ARENA MAP
				</button>
			</Link>
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
