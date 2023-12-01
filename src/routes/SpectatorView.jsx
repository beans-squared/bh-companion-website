import useWebSocket, { ReadyState } from 'react-use-websocket'
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
		<div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '0' }}>
			{connectionStatus === 'Connecting' ? <Connecting /> : <></>}
			{connectionStatus === 'Open' ? (
				<div>
					{lastJsonMessage ? (
						<>
							{lastJsonMessage.status === 'idle' ? (
								<p style={{ fontSize: '4rem', fontFamily: 'Poppins' }}>Waiting for session operator to start a game</p>
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
