import { useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import './SessionManager.scss'
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
		<div className="session-manager">
			{connectionStatus === 'Connecting' ? <Connecting /> : <></>}
			{connectionStatus === 'Open' ? (
				<div>
					{lastJsonMessage ? (
						<>
							{lastJsonMessage.status === 'idle' ? (
								<div className="page-content">
									<p className="title">Start by creating a game playlist below</p>
									<form onSubmit={addGameToPlaylist}>
										<select name="selectedGame" id="">
											<option value="Bomb">Bomb</option>
											<option value="Capture the Flag">Capture the Flag</option>
											<option value="Domination">Domination</option>
											<option value="Search and Destroy">Search and Destroy</option>
											<option value="Siege">Siege</option>
										</select>
										<button type="submit">Add Game to Playlist</button>
										{playlist.length >= 1 ? <button onClick={() => setPlaylist([])}>Clear Playlist</button> : <></>}
									</form>
									<div className="playlist">
										<ol>
											{playlist.map((game) => (
												<li>{game}</li>
											))}
										</ol>
										{playlist.length >= 1 ? (
											<button onClick={() => sendJsonMessage({ command: 'start_session', games: playlist })}>Start Session</button>
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
