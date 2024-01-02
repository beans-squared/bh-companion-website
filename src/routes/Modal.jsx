import { Link } from 'react-router-dom'

export default function Modal({ options }) {
	return (
		<div
			className="animate-1"
			style={{
				position: 'absolute',
				border: '2px solid var(--color-brand)',
				padding: '1rem',
				margin: '1rem',
				backgroundColor: '#242424',
				width: '400px',
				maxWidth: '90vw',
				boxSizing: 'border-box',
			}}
		>
			<h1>{options.title}</h1>
			<p>{options.description}</p>
			<Link to={options.linkTo}>
				<button style={{ marginTop: '1rem', width: '100%' }}>OKAY</button>
			</Link>
		</div>
	)
}
