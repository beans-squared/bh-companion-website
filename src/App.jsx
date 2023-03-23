import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import allGames from '../games.json';
import GameList from './GameList';

export default function App() {
	const [sessionLength, setSessionLength] = useState(null);
	const [players, setPlayers] = useState(null);
	const [age, setAge] = useState(null);
	const [experience, setExperience] = useState(null);
	const [allowExperimental, setAllowExperimental] = useState(null);
	const [playlist, setPlaylist] = useState([]);

	let submitReady;
	if (
		sessionLength !== null &&
		players !== null &&
		age !== null &&
		experience !== null &&
		allowExperimental !== null
	) {
		submitReady = (
			<>
				<button onClick={generatePlaylist}>Generate Playlist</button>
				<GameList list={playlist} />
			</>
		);
	} else {
		submitReady = <></>;
	}

	function generatePlaylist() {
		const sessionTotalMinutes = sessionLength * 60 - 15;
		let remainingMinutes = sessionTotalMinutes;
		let chosenGames = [];
		let chosenCategories = [];

		const gameList = chooseGames(
			remainingMinutes,
			players,
			age,
			experience,
			allowExperimental,
			allGames,
			chosenGames,
			chosenCategories
		);

		console.dir('Generated playlist', gameList);

		setPlaylist(gameList);
	}

	function chooseGames(
		remainingMinutes,
		players,
		age,
		experience,
		allowExperimental,
		games,
		chosenGames,
		chosenCategories
	) {
		// Filter for remaining time in session
		games = games.filter((game) => {
			const INITIAL_BRIEFING_TIME = 4;
			const SWAP_BRIEFING_TIME = 2;

			const gameTime =
				game.timeLimit +
				(game.swapSides ? game.timeLimit + SWAP_BRIEFING_TIME : 0) +
				INITIAL_BRIEFING_TIME;
			// (Game's maximum time) + if the game swaps sides (game's maximum time + 2) + (4) for briefing time
			return gameTime < remainingMinutes;
		});

		// Filter for experimental games
		if (!allowExperimental) games = games.filter((game) => !game.experimental);

		// Filter for number of players
		// will take game's ideal player count and set min as ideal-15, min 2 and max as ideal+15, max 60
		games = games.filter((game) => {
			let min = game.idealPlayers - 15;
			if (min < 2) min = 2;
			let max = game.idealPlayers + 15;
			if (max > 60) max = 60;

			return players >= min && players <= max;
		});

		// Filter for appropriate difficulty
		// Youth = 0, Teens = 1, Adults = 2
		// First Timers = 0, Familiar = 1, Experienced = 2, Expert = 3
		// Add age and experience values
		// 0-1 Low, 2-3 Medium, 4-5 Hard
		games = games.filter((game) => {
			const diffVal = age + experience;
			console.log('Difficulty value for group:', diffVal);
			if (diffVal === 0 || diffVal === 1) {
				return game.difficulty === 'low';
			} else if (diffVal === 2 || diffVal === 3) {
				return game.difficulty === 'low' || game.difficulty === 'medium';
			} else {
				return game.difficulty === 'medium' || game.difficulty === 'high';
			}
		});

		// Filter for duplicate categories
		let filteredGames = games;
		for (const category of chosenCategories) {
			if (games.some((game) => game.category === category)) {
				filteredGames = games.filter((game) => game.category !== category);
			}
		}
		if (filteredGames.length === 0) {
			chosenCategories = [];
		}
		games = filteredGames;

		if (games.length === 0) return chosenGames;
		const rand = Math.floor(Math.random() * games.length);
		const selectedGame = games[rand];
		games = games.filter((game) => game.name !== selectedGame.name);

		chosenGames.push(selectedGame);
		chosenCategories.push(selectedGame.category);

		return chooseGames(
			remainingMinutes -
				(selectedGame.timeLimit +
					(selectedGame.swapSides ? selectedGame.timeLimit + 2 : 0) +
					4),
			players,
			age,
			experience,
			allowExperimental,
			games,
			chosenGames,
			chosenCategories
		);
	}

	return (
		<div className="App">
			<div>
				<h2>How long is the session?</h2>
				{sessionLength ? (
					<h3>Selected: {sessionLength === 1 ? `1 hour` : `1.75 hours`}</h3>
				) : (
					<></>
				)}
				<button onClick={() => setSessionLength(1)}>1 hour</button>
				<button onClick={() => setSessionLength(1.75)}>1.75 hours</button>
			</div>
			<div>
				<h2>How many players are in the session?</h2>
				{players ? <h3>Entered: {players} players</h3> : <></>}
				<input
					type="number"
					onChange={(event) => setPlayers(event.target.valueAsNumber)}
				/>
			</div>
			<div>
				<h2>What is the average age of the players in the session?</h2>
				{age !== null ? (
					<h3>
						Selected: {age === 0 ? 'Youth' : age === 1 ? 'Teens' : 'Adults'}
					</h3>
				) : (
					<></>
				)}
				<button onClick={() => setAge(0)}>Youth</button>
				<button onClick={() => setAge(1)}>Teens</button>
				<button onClick={() => setAge(2)}>Adults</button>
			</div>
			<div>
				<h2>
					What is the average experience level of the players in the session?
				</h2>
				{experience !== null ? (
					<h3>
						Selected:{' '}
						{experience === 0
							? 'First Timers'
							: experience === 1
							? 'Familiar'
							: experience === 2
							? 'Experienced'
							: 'Expert'}
					</h3>
				) : (
					<></>
				)}
				<button onClick={() => setExperience(0)}>First Timers</button>
				<button onClick={() => setExperience(1)}>Familiar</button>
				<button onClick={() => setExperience(2)}>Experienced</button>
				<button onClick={() => setExperience(3)}>Expert</button>
			</div>
			<div>
				<h2>Allow experimental games?</h2>
				{allowExperimental !== null ? (
					<h3>Selected: {allowExperimental ? 'Yes' : 'No'}</h3>
				) : (
					<></>
				)}
				<button onClick={() => setAllowExperimental(true)}>Yes</button>
				<button onClick={() => setAllowExperimental(false)}>No</button>
			</div>
			{submitReady}
		</div>
	);
}
