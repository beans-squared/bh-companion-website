import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	let navigate = useNavigate()

	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		})
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '1rem',
				marginTop: '2rem',
			}}
		>
			<div>
				<input
					style={{
						width: '400px',
						boxSizing: 'border-box',
					}}
					type="email"
					name="email"
					placeholder="email"
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input
					style={{
						width: '400px',
						boxSizing: 'border-box',
						marginTop: '1rem',
					}}
					type="password"
					name="password"
					placeholder="password"
					onChange={(event) => setPassword(event.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							signIn()
							navigate('/')
						}
					}}
				/>
				<button
					style={{
						width: '400px',
						display: 'flex',
						gap: '1rem',
						marginTop: '1rem',
					}}
					onClick={() => {
						signIn()
						navigate('/')
					}}
				>
					SIGN IN
				</button>
			</div>
		</div>
	)
}
