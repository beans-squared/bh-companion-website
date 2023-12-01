import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Connecting } from '../components/Connecting'
import { Disconnected } from '../components/Disconnected'
import { GameControls } from '../components/GameControls'

export default function SessionManager() {
	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(import.meta.env.VITE_WEBSERVER_URL)
	const [playlist, setPlaylist] = useState([])

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]

	function addGameToPlaylist(event) {
		event.preventDefault()
		setPlaylist([...playlist, event.target.selectedGame.value])
	}

	return (
		<div style={{ position: 'absolute', top: '0', width: '100vw' }}>
			{connectionStatus === 'Connecting' ? <Connecting /> : <></>}
			{connectionStatus === 'Open' ? (
				<div>
					{lastJsonMessage ? (
						<>
							{lastJsonMessage.status === 'idle' ? (
								<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '640px', margin: '0 auto' }}>
									<p style={{ fontSize: '1.5rem', fontFamily: 'Poppins', textAlign: 'center', padding: '1rem' }}>Start by creating a game playlist below</p>
									<form onSubmit={addGameToPlaylist} style={{ width: '100%' }}>
										<select name="selectedGame" style={{ width: '100%' }}>
											<option value="Bomb">Bomb</option>
											<option value="Capture the Flag">Capture the Flag</option>
											<option value="Domination">Domination</option>
											<option value="Search and Destroy">Search and Destroy</option>
											<option value="Siege">Siege</option>
										</select>
										<button type="submit" style={{ width: '100%' }}>
											Add Game to Playlist
										</button>
										{playlist.length >= 1 ? <button onClick={() => setPlaylist([])} style={{ width: '100%' }}>Clear Playlist</button> : <></>}
									</form>
									<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', width: '100%', maxWidth: '90vw' }}>
										<ol style={{ border: playlist.length >= 1 ? '2px solid var(--color-brand)' : '', boxSizing: 'border-box', width: '100%' }}>
											{playlist.map((game) => (
												<li
													style={{
														backgroundColor: 'var(--color-bg-light)',
														fontFamily: 'Poppins',
														listStylePosition: 'inside',
														padding: '0.5rem',
														margin: '0.5rem',
													}}
												>
													{game}
												</li>
											))}
										</ol>
										{playlist.length >= 1 ? (
											<button onClick={() => sendJsonMessage({ command: 'start_session', games: playlist })} style={{ marginTop: '1rem', width: '100%' }}>
												Start Session
											</button>
										) : (
											<></>
										)}
									</div>
								</div>
							) : (
								<div
									style={{
										padding: '16px',
									}}
								>
									<p>Current Game</p>
									<h1>{lastJsonMessage.currentGame.name}</h1>
									<section>
										<GameControls game={lastJsonMessage.currentGame} sendJsonMessage={sendJsonMessage} />
									</section>
									<div
										style={{
											display: 'flex',
											gap: '8px',
											marginTop: '16px',
										}}
									>
										<button onClick={() => sendJsonMessage({ command: 'end_session' })} style={{ width: '100%' }}>
											End Session
										</button>
										{lastJsonMessage.currentGameIndex + 1 <= lastJsonMessage.gameQueue.length - 1 ? (
											<button onClick={() => sendJsonMessage({ command: 'next_game' })} style={{ width: '100%' }}>
												Next Game
											</button>
										) : (
											<></>
										)}
									</div>
								</div>
							)}
						</>
					) : (
						<>
							<h1>Awaiting response from server...</h1>
						</>
					)}
				</div>
			) : (
				<></>
			)}
			{connectionStatus === 'Closed' ? <Disconnected /> : <></>}
		</div>
	)
}
