import { useState, useEffect } from 'react'
import Playlist from './Playlist'
import { supabase } from '../supabaseClient'

export default function PlaylistGenerator() {
	const [allGames, setAllGames] = useState([])
	const [sessionLength, setSessionLength] = useState(1)
	const [playerCount, setPlayerCount] = useState(null)
	const [avgPlayerAge, setAvgPlayerAge] = useState(null)
	const [avgPlayerExp, setAvgPlayerExp] = useState(null)
	const [allowExperimentalGames, setAllowExperimentalGames] = useState(false)
	const [formSubmitted, setFormSubmitted] = useState(false)

	const [playlist, setPlaylist] = useState([])

	useEffect(() => {
		fetchGames().then((games) => {
			setAllGames(games)
		})
	}, [])

	function handleSubmit(event) {
		event.preventDefault()

		const playlist = generatePlaylist(sessionLength, playerCount, avgPlayerAge, avgPlayerExp, allowExperimentalGames)

		console.log('Generated playlist:', playlist)

		setPlaylist(playlist)
		setFormSubmitted(true)
	}

	async function fetchGames() {
		try {
			const { data, error } = await supabase.from('games').select()
			if (error) {
				throw error
			}
			return data
		} catch (error) {
			console.log('Error fetching games: ', error.message)
		}
	}

	function generatePlaylist(sessionLength, playerCount, avgPlayerAge, avgPlayerExp, allowExperimentalGames) {
		const sessionTotalSeconds = sessionLength * 60 * 60 - 900
		let remainingSeconds = sessionTotalSeconds
		let chosenGames = []
		let chosenCategories = []

		const gameList = chooseGames(remainingSeconds, playerCount, avgPlayerAge, avgPlayerExp, allowExperimentalGames, allGames, chosenGames, chosenCategories)

		return gameList
	}

	return (
		<>
			<form onSubmit={handleSubmit} method="POST" className={formSubmitted ? 'hidden' : ''}>
				<div className="form-item animate-1">
					<label className="form-label">SESSION LENGTH</label>
					<div className="button-options">
						<div
							style={{ color: 'black', backgroundColor: 'var(--color-brand)', padding: '1rem', margin: '1rem 0', fontSize: '1.2rem', cursor: 'pointer' }}
							onClick={() => setSessionLength(1)}
						>
							1 HOUR
						</div>
						<div
							style={{ color: 'black', backgroundColor: 'var(--color-brand)', padding: '1rem', fontSize: '1.2rem', cursor: 'pointer' }}
							onClick={() => setSessionLength(2.25)}
						>
							2 HOURS
						</div>
					</div>
					<input type="number" name="sessionLength" style={{ marginTop: '1rem' }} value={sessionLength} onChange={(event) => setHours(event.target.value)} />
				</div>

				<div className="form-item animate-2" id="player-count-div">
					<label className="form-label">PLAYER COUNT</label>
					<input type="number" name="playerCount" onChange={(event) => setPlayerCount(event.target.value)} />
				</div>

				<div className="form-item animate-3">
					<label className="form-label" htmlFor="avgPlayerAge">
						AVERAGE PLAYER AGE
					</label>
					<select name="avgPlayerAge" defaultValue="default" onChange={(event) => setAvgPlayerAge(event.target.value)}>
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
					<select name="avgPlayerExp" defaultValue="default" onChange={(event) => setAvgPlayerExp(event.target.value)}>
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
					<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						<input
							type="checkbox"
							name="allowExperimentalGames"
							id="enable-experimental-checkbox"
							onChange={(event) => setAllowExperimentalGames(event.target.value)}
						/>
						<label className="form-label" htmlFor="enable-experimental-checkbox" style={{ fontSize: '1.3rem' }}>
							Allow experimental games?
						</label>
					</div>
				</div>

				<div className="form-item animate-6">
					<button disabled={!(playerCount && avgPlayerAge && avgPlayerExp)} type="submit">
						GENERATE PLAYLIST
					</button>
				</div>
			</form>

			<div className={!formSubmitted ? 'hidden' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
				<Playlist playlist={playlist} />
				<button
					style={{ width: '400px', maxWidth: '90vw', marginTop: '1rem' }}
					onClick={() => setPlaylist(generatePlaylist(sessionLength, playerCount, avgPlayerAge, avgPlayerExp, allowExperimentalGames))}
				>
					REGENERATE
				</button>
			</div>
		</>
	)
}

function chooseGames(remainingSeconds, players, age, experience, allowExperimental, games, chosenGames, chosenCategories) {
	console.log('Starting list of games:', games)
	// Filter for remaining time in session
	games = games.filter((game) => {
		const INITIAL_BRIEFING_TIME = 240
		const SWAP_BRIEFING_TIME = 120

		const gameTime = game.max_time_s + (game.swap_sides ? game.max_time_s + SWAP_BRIEFING_TIME : 0) + INITIAL_BRIEFING_TIME
		// (Game's maximum time) + if the game swaps sides (game's maximum time + 2) + (4) for briefing time
		return gameTime < remainingSeconds
	})

	console.log(`Games after filtering for remaining time in session (${Math.round(remainingSeconds / 60)}m):`, games)

	// Filter for experimental games
	if (!allowExperimental) games = games.filter((game) => !game.in_testing)

	console.log('Games after filtering for games in testing:', games)

	// Filter for number of players
	// will take game's ideal player count and set min as ideal-15, min 2 and max as ideal+15, max 80
	games = games.filter((game) => {
		let min = game.min_players
		if (min < 2) min = 2
		let max = game.max_players
		if (max > 80) max = 80

		return players >= min && players <= max
	})

	console.log('Games after filtering for player count:', games)

	// Filter for appropriate difficulty
	// Games have a difficulty score between 0-3 as represented in the backend
	// Youth = 0, Teens = 1, Adults = 2
	// First Timers = 0, Familiar = 1, Experienced = 2, Expert = 3
	// Add age and experience values
	// 0-1 Low, 2-3 Medium, 4-5 Hard
	games = games.filter((game) => {
		const diffVal = age + experience
		if (diffVal === 0 || diffVal === 1) {
			return game.difficulty <= 1
		} else if (diffVal === 2 || diffVal === 3) {
			return game.difficulty <= 2
		} else {
			return game.difficulty <= 3
		}
	})

	console.log('Games after filtering for difficulty:', games)

	// Filter for duplicate categories
	let filteredGames = games
	for (const category of chosenCategories) {
		if (games.some((game) => game.category === category)) {
			filteredGames = games.filter((game) => game.category !== category)
		}
	}
	if (filteredGames.length === 0) {
		chosenCategories = []
	}
	games = filteredGames

	console.log('Games after filtering for duplicate categories:', games)

	if (games.length === 0) return chosenGames
	const rand = Math.floor(Math.random() * games.length)
	const selectedGame = games[rand]
	games = games.filter((game) => game.name !== selectedGame.name)

	console.log(`Added ${selectedGame.name} to the playlist`)

	chosenGames.push(selectedGame)
	chosenCategories.push(selectedGame.category)

	return chooseGames(
		remainingSeconds - (selectedGame.max_time_s + (selectedGame.swap_sides ? selectedGame.max_time_s + 2 : 0) + 4),
		players,
		age,
		experience,
		allowExperimental,
		games,
		chosenGames,
		chosenCategories
	)
}
