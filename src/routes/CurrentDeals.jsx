import { useState } from 'react';
import deals from '../../deals.json';
import './CurrentDeals.css';

export default function CurrentDeals() {
	function dealStatus(deal, defaultPlaceholder) {
		const startDate = new Date(deal.startDate).valueOf();
		const endDate = new Date(deal.endDate).valueOf();

		if (startDate > Date.now()) {
			return 'UPCOMING';
		} else if (startDate < Date.now() && endDate > Date.now()) {
			return 'ONGOING';
		} else if (endDate < Date.now()) {
			return 'EXPIRED';
		} else {
			return defaultPlaceholder;
		}
	}

	const sortedDeals = deals.sort((dealA, dealB) => {
		const dateAValue = new Date(dealA.startDate).valueOf();
		const dateBValue = new Date(dealB.startDate).valueOf();
		return dateAValue - dateBValue;
	});

	const listedDeals = sortedDeals.map((deal) => (
		<div key={deal.title} className="deal-item">
			<h3 className="deal-dates">
				{dealStatus(deal, 'SUMMER 2023')}
				{deal.startDate ? ' | ' : ''}
				{deal.startDate
					? `${new Date(deal.startDate).toLocaleDateString()}`
					: ''}
				{deal.endDate &&
				new Date(deal.endDate).valueOf() !== new Date(deal.startDate).valueOf()
					? ` - ${new Date(deal.endDate).toLocaleDateString()}`
					: ''}
			</h3>
			<h1 className="deal-title">{deal.title}</h1>
			<h2 className="deal-desc">{deal.description}</h2>
		</div>
	));

	return <div>{listedDeals}</div>;
}
