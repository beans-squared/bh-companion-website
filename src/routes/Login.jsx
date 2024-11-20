import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Login() {
	const [email, setEmail] = useState(null)
	const [sent, setSent] = useState(false)

	async function signInWithEmail() {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				emailRedirectTo: 'http://localhost:5173',
			},
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
			{!sent ? (
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
					<button
						style={{
							width: '400px',
							display: 'flex',
							gap: '1rem',
							marginTop: '1rem',
						}}
						onClick={() => {
							signInWithEmail()
							setSent(true)
						}}
					>
						SIGN IN
					</button>
				</div>
			) : (
				<div
					style={{
						border: '2px solid #fedd04',
						padding: '1rem',
					}}
				>
					<p
						style={{
							width: '400px',
							display: 'flex',
							gap: '1rem',
							justifyContent: 'center',
							fontSize: '1.5rem',
							fontFamily: 'Poppins',
						}}
					>
						Email sent! Check your inbox.
					</p>
				</div>
			)}
		</div>
	)
}
