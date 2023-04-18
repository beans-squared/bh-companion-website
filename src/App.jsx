import { Link } from 'react-router-dom';
import WrenchIcon from './icons/Wrench';
import PartyIcon from './icons/Party';
import NumberListIcon from './icons/NumberList';
import TvIcon from './icons/Tv';
import PlayIcon from './icons/Play';
import PriceTagIcon from './icons/PriceTag';
import './App.css';

export default function App() {
	return (
		<div id="homepage">
			<img
				src="logo.png"
				alt="the battle house logo"
				className="animate-1"
				id="logo"
			/>
			<Link to={'generator'}>
				<button className="homepage-button animate-2">
					<NumberListIcon />
					GENERATE GAME PLAYLIST
				</button>
			</Link>
			<Link to={'reporter'}>
				<button className="homepage-button animate-3">
					<WrenchIcon />
					REPORT BROKEN EQUIPMENT
				</button>
			</Link>
			<Link to={'current-deals'}>
				<button className="homepage-button animate-4">
					<PriceTagIcon />
					VIEW CURRENT DEALS
				</button>
			</Link>
			<Link to={'room-manager'}>
				<button className="homepage-button animate-5" disabled>
					<PartyIcon />
					MANAGE PARTY ROOMS
				</button>
			</Link>
			<Link to={'session-manager'}>
				<button className="homepage-button animate-6" disabled>
					<PlayIcon />
					RUN A SESSION
				</button>
			</Link>
			<Link to={'spectator-view'}>
				<button className="homepage-button animate-7" disabled>
					<TvIcon />
					OPEN SPECTATOR VIEW
				</button>
			</Link>
		</div>
	);
}
