import '../assets/loader.scss'

export function Connecting() {
	return (
		<div style={{
			display: 'flex',
			gap: '16px',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100vw',
			height: '100vh'
		}}>
			<h1 style={{
				fontFamily: 'Poppins',
				fontSize: '64px',
			}}>Connecting to remote server...</h1>
			<div className="loader"></div>
		</div>
	)
}
