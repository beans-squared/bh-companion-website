import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { CreateNewAgendaItemModal } from '../components/CreateNewAgendaItemModal'
import '../assets/loader.scss'

export default function Agenda() {
	const [user, setUser] = useState(null)
	const [agenda, setAgenda] = useState(null)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		setAgenda(null)
		supabase.auth.getUser().then(({ data }) => {
			setUser(data)
			supabase
				.from('agenda')
				.select()
				.eq('owner_id', data.user.id)
				.then(({ data }) => setAgenda(data))
		})
	}, [])

	return (
		<div style={{ display: 'flex', width: '90vw', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
			{user && agenda ? (
				<>
					{agenda.length > 0 ? (
						<div>
							{agenda.map((item) => (
								<div>
									<h1>{item.title}</h1>
									<p>{item.description}</p>
								</div>
							))}
						</div>
					) : (
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
							<p style={{ fontFamily: 'Poppins', fontSize: '2rem' }}>No items in agenda.</p>
							<button onClick={() => setShowModal(true)}>ADD NEW ITEM</button>
						</div>
					)}
				</>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
					<p style={{ fontFamily: 'Poppins', fontSize: '2rem' }}>Loading agenda...</p>
					<div className="loader"></div>
				</div>
			)}
			{showModal ? <CreateNewAgendaItemModal /> : <></>}
		</div>
	)
}
