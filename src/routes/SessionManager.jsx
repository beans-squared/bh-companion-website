import { useCallback, useEffect, useState } from 'react'
import { render } from 'react-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import './SessionManager.css'

export default function SessionManager() {
	const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://${process.env.WSS}`)
	const [totalCubes, setTotalCubes] = useState(1)
	const [blueCubes, setBlueCubes] = useState(0)
	const [redCubes, setRedCubes] = useState(0)

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]

	function parseMessageData(data) {
		return JSON.parse(data)
	}

	function stringifyMessageData(data) {
		return JSON.stringify(data)
	}

	function submitUpdate() {
		sendMessage(
			stringifyMessageData({
				type: 'update_game_state',
				totalControlPoints: totalCubes,
				blueControlPoints: blueCubes,
				redControlPoints: redCubes,
			})
		)
	}

	function startSession() {
		sendMessage(stringifyMessageData({ type: 'admin_request' }))
	}

	useEffect(() => {
		renderScreen()
	}, [readyState])

	function renderScreen() {
		if (connectionStatus !== 'Open') {
			return <h1>Connecting...</h1>
		} else {
			if (lastMessage) {
				if (parseMessageData(lastMessage.data).success === true) {
					return (
						<div className="interface">
							<h1>You are now running a session</h1>

							<div>
								<label htmlFor="totalCubes">Total number of cubes</label>
								<input name="totalCubes" type="number" onChange={(event) => setTotalCubes(event.target.value)} />
							</div>

							<div>
								<label htmlFor="blueCubes">Captured blue cubes</label>
								<input name="blueCubes" type="number" onChange={(event) => setBlueCubes(event.target.value)} />
							</div>

							<div>
								<label htmlFor="redCubes">Captured red cubes</label>
								<input name="redCubes" type="number" onChange={(event) => setRedCubes(event.target.value)} />
							</div>

							<button onClick={submitUpdate}>Set</button>
						</div>
					)
				} else {
					return <h1>Failed to start session</h1>
				}
			} else {
				return <button onClick={startSession}>Start Session</button>
			}
		}
	}

	return <>{renderScreen()}</>
}
