import useWebSocket, { ReadyState } from 'react-use-websocket'
import './SpectatorView.scss'
import { GameScreen } from '../components/GameScreen'
import { Connecting } from '../components/Connecting'
import { Disconnected } from '../components/Disconnected'

export default function SpectatorView() {
	const { lastJsonMessage, readyState } = useWebSocket(import.meta.env.VITE_WEBSERVER_URL)

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState]

	return (
		<div className="spectator-view">
			{connectionStatus === 'Connecting' ? <Connecting /> : <></>}
			{connectionStatus === 'Open' ? (
				<div>
					{lastJsonMessage ? (
						<>
							{lastJsonMessage.status === 'idle' ? (
								<p className="status-text">Waiting for session operator to start a game</p>
							) : (
								<GameScreen game={lastJsonMessage.currentGame} />
							)}
						</>
					) : (
						<p className="status-text">Awaiting response from server...</p>
					)}
				</div>
			) : (
				<></>
			)}
			{connectionStatus === 'Closed' ? <Disconnected /> : <></>}
		</div>
	)
}
