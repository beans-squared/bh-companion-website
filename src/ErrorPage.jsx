import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div style={styles.errorPage}>
			<h1 style={styles.errorPage.h1}>Oops!</h1>
			<p style={styles.errorPage.p}>Sorry, an unexpected error has occurred.</p>
			<p style={styles.errorPage.statusText}>{error.statusText}</p>
			<code style={styles.errorPage.message}>{error.message}</code>
			<Link to={''} style={styles.errorPage.returnButton}>
				<button>RETURN HOME</button>
			</Link>
		</div>
	)
}

const styles = {
	errorPage: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		h1: {
			textAlign: 'center',
		},
		p: {
			fontFamily: 'Poppins',
			textAlign: 'center',
		},
		statusText: {
			fontFamily: 'Poppins',
			fontWeight: 'bold',
			fontSize: '1.5rem',
			textAlign: 'center',
			marginTop: '1rem',
		},
		message: {
			backgroundColor: '#424242',
			padding: '0.5rem',
			marginTop: '1rem',
		},
		returnButton: {
			display: 'flex',
			justifyContent: 'center',
			marginTop: '1rem',
		},
	},
}
