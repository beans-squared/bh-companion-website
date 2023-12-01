import deals from '../../deals.json'

export default function CurrentDeals() {
	function dealStatus(deal, timePeriod) {
		const startDate = new Date(deal.startDate).valueOf()
		const endDate = new Date(deal.endDate).valueOf()

		if (startDate > Date.now()) {
			return 'UPCOMING'
		} else if (startDate < Date.now() && endDate > Date.now()) {
			return 'ONGOING'
		} else if (endDate < Date.now()) {
			return 'EXPIRED'
		} else {
			return timePeriod
		}
	}

	return (
		<>
			{deals.length === 0 ? (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<p style={{ fontFamily: 'Poppins', fontSize: '2.25rem' }}>No current deals, check back later.</p>
				</div>
			) : (
				<div style={{ width: '100%' }}>
					{deals
						.sort((dealA, dealB) => new Date(dealA.startDate).valueOf() - new Date(dealB.startDate).valueOf())
						.filter((deal) => deal.draft === false)
						.map((deal) => (
							<div
								key={deal.title}
								style={{
									border: '2px solid #fedd04',
									boxSizing: 'border-box',
									margin: '1rem',
									padding: '1rem',
									backgroundColor: Date.now() > new Date(deal.startDate).valueOf() && Date.now() < new Date(deal.endDate).valueOf() ? '#fedd0423' : 'none',
								}}
							>
								<h3 style={{ fontSize: '1rem', color: '#b3b3b3' }}>
									{dealStatus(deal, deal.timePeriod)}
									{deal.startDate ? ' | ' : ''}
									{deal.startDate ? `${new Date(deal.startDate).toLocaleDateString('en-US')}` : ''}
									{deal.endDate && new Date(deal.endDate).valueOf() !== new Date(deal.startDate).valueOf()
										? ` - ${new Date(deal.endDate).toLocaleDateString('en-US')}`
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
// 	"startDate": "15 March 2024 00:00:00 CST",
// 	"endDate": "20 March 2024 22:00:00 CST",
// 	"timePeriod": ""
// },
// {
// 	"draft": true,
// 	"title": "Example Deal B",
// 	"description": "Example deal B",
// 	"startDate": "",
// 	"endDate": "",
// 	"timePeriod": "SUMMER 2023"
// }
