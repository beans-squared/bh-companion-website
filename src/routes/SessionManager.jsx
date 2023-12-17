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
										<div style={{ width: '100%', height: '4rem', display: 'flex', justifyContent: 'space-between' }}>
											<select name="selectedGame" style={{ boxSizing: 'border-box', height: '100%', width: '100%', marginRight: '1rem' }}>
												<option value="Bomb">Bomb</option>
												<option value="Capture the Flag">Capture the Flag</option>
												<option value="Domination">Domination</option>
												<option value="Search and Destroy">Search and Destroy</option>
												<option value="Siege">Siege</option>
											</select>
											<button
												type="submit"
												style={{ height: '100%', minWidth: '4rem', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
													<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
												</svg>
											</button>
										</div>
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
											<div style={{ marginTop: '1rem', display: 'flex', width: '100%', height: '4rem', gap: '1rem' }}>
												<button
													onClick={() => setPlaylist([])}
													style={{
														width: '100%',
														height: '100%',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														gap: '1rem',
														fontFamily: 'Poppins',
													}}
												>
													<svg
														height="2rem"
														width="2rem"
														clip-rule="evenodd"
														fill-rule="evenodd"
														stroke-linejoin="round"
														stroke-miterlimit="2"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
															fill-rule="nonzero"
														/>
													</svg>
													Clear Playlist
												</button>
												<button
													onClick={() => sendJsonMessage({ command: 'start_session', games: playlist })}
													style={{
														width: '100%',
														height: '100%',
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
														gap: '1rem',
														fontFamily: 'Poppins',
													}}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
														<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
													</svg>
													Start Session
												</button>
											</div>
										) : (
											<></>
										)}
									</div>
								</div>
							) : (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										margin: '0 auto',
										width: '640px',
										maxWidth: '90vw',
										height: '100vh',
									}}
								>
									<div style={{ marginTop: '1rem' }}>
										<p>Current Game</p>
										<h1>{lastJsonMessage.currentGame.name}</h1>
										<GameControls game={lastJsonMessage.currentGame} sendJsonMessage={sendJsonMessage} />
									</div>

									<div
										style={{
											display: 'flex',
											gap: '8px',
											marginBottom: '1rem',
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
