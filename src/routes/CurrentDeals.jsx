import deals from '../../deals.json'
import dayjs from 'dayjs'
import UTC from 'dayjs/plugin/utc'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

dayjs.extend(UTC)

export default function CurrentDeals() {
	const [sortedDeals, setSortedDeals] = useState([])

	useEffect(() => {
		fetchDeals().then((deals) => {
			setSortedDeals(
				deals.sort((dealA, dealB) => new Date(dealA.start_date).valueOf() - new Date(dealB.start_date).valueOf()).filter((deal) => deal.draft === false)
			)
		})
	}, [])

	async function fetchDeals() {
		try {
			const { data, error } = await supabase.from('deals').select()
			if (error) {
				throw error
			}
			return data
		} catch (error) {
			console.log('Error fetching deals: ', error.message)
		}
	}

	function dealStatus(deal, timePeriod) {
		const start_date = new Date(deal.start_date).valueOf()
		const end_date = new Date(deal.end_date).valueOf()

		if (start_date > Date.now()) {
			return 'UPCOMING'
		} else if (start_date < Date.now() && end_date > Date.now()) {
			return 'ONGOING'
		} else if (end_date < Date.now()) {
			console.log(deal.title, end_date, new Date(end_date), Date.now())
			return 'EXPIRED'
		} else {
			return timePeriod
		}
	}

	return (
		<>
			{sortedDeals.length === 0 ? (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<p style={{ fontFamily: 'Poppins', fontSize: '2.25rem' }}>No current deals, check back later.</p>
				</div>
			) : (
				<div style={{ width: '100%' }}>
					{sortedDeals.map((deal) => (
						<div
							key={deal.title}
							style={{
								border: '2px solid #fedd04',
								boxSizing: 'border-box',
								margin: '1rem',
								padding: '1rem',
								backgroundColor: Date.now() > new Date(deal.start_date).valueOf() && Date.now() < new Date(deal.end_date).valueOf() ? '#fedd0423' : 'none',
								opacity: Date.now() > new Date(deal.end_date).valueOf() ? '25%' : '100%',
							}}
						>
							<h3 style={{ fontSize: '1rem', color: '#b3b3b3' }}>
								{dealStatus(deal, deal.timePeriod)}
								{deal.start_date ? ' | ' : ''}
								{deal.start_date ? `${dayjs.utc(deal.start_date).format('M/D/YYYY')}` : ''}
								{deal.end_date && new Date(deal.end_date).valueOf() !== new Date(deal.start_date).valueOf()
									? ` - ${dayjs.utc(deal.end_date).format('M/D/YYYY')}`
									: ''}
							</h3>
							<h1 style={{ fontSize: '1.5rem' }}>{deal.title}</h1>
							<h2 style={{ fontSize: '1rem', fontFamily: 'Poppins' }}>{deal.description}</h2>
						</div>
					))}
				</div>
			)}
		</>
	)
}

// Example deals (place in deals.json)

// {
// 	"draft": false,
// 	"title": "Example Deal A",
// 	"description": "Example deal A",
// 	"start_date": "15 March 2024 00:00:00 CST",
// 	"end_date": "20 March 2024 22:00:00 CST",
// 	"timePeriod": ""
// },
// {
// 	"draft": true,
// 	"title": "Example Deal B",
// 	"description": "Example deal B",
// 	"start_date": "",
// 	"end_date": "",
// 	"timePeriod": "SUMMER 2023"
// }
