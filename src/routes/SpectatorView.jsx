import { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import './SpectatorView.css'

export default function SpectatorView() {
	const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080')
	const [parsedLastMessage, setParsedLastMessage] = useState({})

	// const handleClickSendMessage = useCallback(() => sendMessage('Hello World'), [])

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]

	useEffect(() => {
		sendMessage(
			JSON.stringify({
				type: 'request_game_state',
			})
		)
	}, [])

	function parseMessageData(data) {
		return JSON.parse(data)
	}

	useEffect(() => {
		renderScreen()
	}, [readyState])

	function renderScreen() {
		if (connectionStatus !== 'Open') {
			return <h1>Connecting...</h1>
		} else {
			if (lastMessage) {
				if (parseMessageData(lastMessage.data).status === 'idle') {
					return <h1>Game is idle</h1>
				} else {
					return (
						<section className="page">
							<div className="title-text">
								<h2>MISSION SCENARIO:</h2>
								<h1>{parseMessageData(lastMessage.data).gameTitle}</h1>
								<p>{parseMessageData(lastMessage.data).gameDescription}</p>
							</div>

							<div className="total-cps">
								<h2>Total Control Points</h2>
								<h1>{parseMessageData(lastMessage.data).totalControlPoints}</h1>
							</div>

							<div className="bottom-section">
								<div className="text">
									<p>
										<span className="blue-team">Blue Team</span>
										<br />
										has captured {parseMessageData(lastMessage.data).blueControlPoints} control points
									</p>
									<p>
										{parseMessageData(lastMessage.data).totalControlPoints -
											parseMessageData(lastMessage.data).blueControlPoints -
											parseMessageData(lastMessage.data).redControlPoints}{' '}
										control points
										<br />
										are contested
									</p>
									<p>
										<span className="red-team">Red Team</span>
										<br />
										has captured {parseMessageData(lastMessage.data).redControlPoints} control points
									</p>
								</div>
								<div className="meters">
									<ProgressBar
										key="blue-team-bar"
										bgcolor="blue"
										completed={((parseMessageData(lastMessage.data).blueControlPoints / parseMessageData(lastMessage.data).totalControlPoints) * 100).toFixed(
											1
										)}
									/>
									<ProgressBar
										key="red-team-bar"
										bgcolor="red"
										completed={((parseMessageData(lastMessage.data).redControlPoints / parseMessageData(lastMessage.data).totalControlPoints) * 100).toFixed(1)}
									/>
								</div>
							</div>
						</section>
					)
				}
			} else {
				return <h1>Loading...</h1>
			}
		}
	}

	return <>{renderScreen()}</>
}
