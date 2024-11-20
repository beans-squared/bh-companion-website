import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function PricingReference() {
	const [prices, setPrices] = useState([])
	const [pages, setPages] = useState(null)
	const [pageSelection, setPageSelection] = useState(prices[0])

	useEffect(() => {
		fetchPrices().then((prices) => {
			const pricing = []

			console.log('RETURNED PRICING FROM THE BACKEND: ', prices)

			// get all unique pages
			const pages = []
			for (const price of prices) {
				if (!pages.some((element) => element.title === price.page)) {
					console.log(`Adding page ${price.page}`)
					pages.push({ title: price.page, sections: [] })
				}
			}

			// get all sections for each page
			for (const page of pages) {
				for (const price of prices) {
					if (!page.sections.some((element) => element.title === price.section) && page.title === price.page) {
						console.log(`Adding section ${price.section} to page ${page.title}`)
						page.sections.push({ title: price.section, subsections: [] })
					}
				}
			}

			// get all subsections for each page section
			for (const page of pages) {
				for (const section of page.sections) {
					for (const price of prices) {
						if (!section.subsections.some((element) => (element.title === price.subsection)) && section.title === price.section && page.title === price.page) {
							console.log(`Adding subsection ${price.subsection} to section ${section.title} on page ${page.title}`)
							section.subsections.push({ title: price.subsection, items: [] })
						}
					}
				}
			}

			// add items
			for (const page of pages) {
				for (const section of page.sections) {
					for (const subsection of section.subsections) {
						for (const price of prices) {
							if (
								!subsection.items.some((element) => element.item === price.item) &&
								subsection.title === price.subsection &&
								section.title === price.section &&
								page.title === price.page
							) {
								console.log(`Adding item-value pair ${price.item}-${price.value} to subsection ${subsection.title} on page ${page.title}`)
								subsection.items.push({ key: price.item, value: price.value })
							}
						}
					}
				}
			}

			console.log(pages)

			setPrices(pages)
			setPageSelection(pages[0])
		})
	}, [])

	async function fetchPrices() {
		try {
			const { data, error } = await supabase.from('prices').select()
			if (error) {
				throw error
			}
			return data
		} catch (error) {
			console.log('Error fetching deals: ', error.message)
		}
	}

	return (
		<div style={{ width: '1280px', maxWidth: '90vw', display: 'flex', flexDirection: 'column' }} className="animate-1">
			<select
				style={{ margin: '1rem 0', fontSize: '1.25rem', fontWeight: 'bold', color: 'black', backgroundColor: 'var(--color-brand)' }}
				onChange={(event) => setPageSelection(prices.find((page) => page.title === event.target.value))}
			>
				{prices.map((page) => (
					<option value={page.title}>{page.title}</option>
				))}
			</select>
			<section style={{ border: '1px solid gray', marginBottom: '1rem' }}>
				{prices.length > 0 ? (
					<>
						{pageSelection.sections.map((section) => (
							<section>
								<h1 style={{ paddingLeft: '0.5rem', fontSize: '1.5rem' }}>{section.title}</h1>
								{section.subsections.map((subsection) => (
									<div>
										<h2 style={{ paddingLeft: '1rem', borderTop: '1px solid gray', fontFamily: 'Poppins' }}>{subsection.title}</h2>
										{subsection.items.map((item) => (
											<p
												style={{ padding: '0.25rem 1rem 0.25rem 2rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'Poppins' }}
												className="pricing-reference-item-highlight"
											>
												<span>{item.key}</span>
												<span>{item.value}</span>
											</p>
										))}
									</div>
								))}
							</section>
						))}
					</>
				) : (
					<></>
				)}
			</section>
		</div>
	)
}
