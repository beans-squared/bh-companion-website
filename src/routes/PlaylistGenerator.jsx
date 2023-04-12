import { useState } from 'react';
import Playlist from './Playlist';
import allGames from '../../games.json';
import './PlaylistGenerator.css';

export default function PlaylistGenerator() {
	const [sessionLength, setSessionLength] = useState(getDefaultHourValue());
	const [playerCount, setPlayerCount] = useState(null);
	const [avgPlayerAge, setAvgPlayerAge] = useState(null);
	const [avgPlayerExp, setAvgPlayerExp] = useState(null);
	const [allowExperimentalGames, setAllowExperimentalGames] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const [playlist, setPlaylist] = useState([]);

	function handleSubmit(event) {
		event.preventDefault();

		const playlist = generatePlaylist(
			sessionLength,
			playerCount,
			avgPlayerAge,
			avgPlayerExp,
			allowExperimentalGames
		);

		setPlaylist(playlist);
		setFormSubmitted(true);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				method="POST"
				className={formSubmitted ? 'hidden' : ''}
			>
				<div className="form-item animate-1">
					<label className="form-label">SESSION LENGTH</label>
					<div className="button-options">
						<div className="prefill-button" onClick={() => setSessionLength(1)}>
							1 HOUR
						</div>
						<div
							className="prefill-button"
							onClick={() => setSessionLength(1.75)}
						>
							1.75 HOURS
						</div>
						<div className="prefill-button" onClick={() => setSessionLength(2)}>
							2 HOURS
						</div>
					</div>
					<input
						type="number"
						name="sessionLength"
						id="hours-input"
						value={sessionLength}
						onChange={(event) => setHours(event.target.value)}
					/>
				</div>

				<div className="form-item animate-2" id="player-count-div">
					<label className="form-label">PLAYER COUNT</label>
					<input
						type="number"
						name="playerCount"
						onChange={(event) => setPlayerCount(event.target.value)}
					/>
				</div>

				<div className="form-item animate-3">
					<label className="form-label" htmlFor="avgPlayerAge">
						AVERAGE PLAYER AGE
					</label>
					<select
						name="avgPlayerAge"
						defaultValue="default"
						onChange={(event) => setAvgPlayerAge(event.target.value)}
					>
						<option value="default" disabled>
							Select one
						</option>
						<option value="youth">Youth</option>
						<option value="teens">Teens</option>
						<option value="adults">Adults</option>
					</select>
				</div>

				<div className="form-item animate-4">
					<label className="form-label" htmlFor="avgPlayerExp">
						AVERAGE EXPERIENCE LEVEL
					</label>
					<select
						name="avgPlayerExp"
						defaultValue="default"
						onChange={(event) => setAvgPlayerExp(event.target.value)}
					>
						<option value="default" disabled>
							Select one
						</option>
						<option value="firsttimers">First Timers</option>
						<option value="familiar">Familiar</option>
						<option value="experienced">Experienced</option>
						<option value="expert">Expert</option>
					</select>
				</div>

				<div className="form-item animate-5">
					<div id="enable-experimental-item">
						<input
							type="checkbox"
							name="allowExperimentalGames"
							id="enable-experimental-checkbox"
							onChange={(event) =>
								setAllowExperimentalGames(event.target.value)
							}
						/>
						<label
							className="form-label"
							htmlFor="enable-experimental-checkbox"
						>
							Allow experimental games?
						</label>
					</div>
				</div>

				<div className="form-item animate-6">
					<button
						disabled={!(playerCount && avgPlayerAge && avgPlayerExp)}
						type="submit"
					>
						GENERATE PLAYLIST
					</button>
				</div>
			</form>

			<div className={!formSubmitted ? 'hidden' : ''} id="playlist">
				<Playlist playlist={playlist} />
				<button
					onClick={() =>
						setPlaylist(
							generatePlaylist(
								sessionLength,
								playerCount,
								avgPlayerAge,
								avgPlayerExp,
								allowExperimentalGames
							)
						)
					}
					id="regenerate-button"
				>
					REGENERATE
				</button>
			</div>
		</>
	);
}

function getDefaultHourValue() {
	const day = new Date().getDay();
	if (day === 0 || day === 4) {
		return 1;
	} else {
		return 1.75;
	}
}

function generatePlaylist(
	sessionLength,
	playerCount,
	avgPlayerAge,
	avgPlayerExp,
	allowExperimentalGames
) {
	const sessionTotalMinutes = sessionLength * 60 - 15;
	let remainingMinutes = sessionTotalMinutes;
	let chosenGames = [];
	let chosenCategories = [];

	const gameList = chooseGames(
		remainingMinutes,
		playerCount,
		avgPlayerAge,
		avgPlayerExp,
		allowExperimentalGames,
		allGames,
		chosenGames,
		chosenCategories
	);

	return gameList;
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
