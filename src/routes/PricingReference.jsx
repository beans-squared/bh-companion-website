import { useState } from 'react';
import './PricingReference.css';

export default function PricingReference() {
	const [chartSelection, setChartSelection] = useState('sessionPasses');

	function currentPriceChart() {
		if (chartSelection === 'sessionPasses') {
			return (
				<section className="price-container">
					<h1>Individual Tickets</h1>
					<h2>Standard Admission</h2>
					<section className="prices">
						<p>
							<span>One Battle (1.0 Hour)</span>
							<span>$34</span>
						</p>
						<p>
							<span>Two Battles (2.25 Hours)</span>
							<span>$44</span>
						</p>
						<p>
							<span>Three Battles (3.5 Hours)</span>
							<span>$54</span>
						</p>
						<p>
							<span>Four Battles (4.75 Hours)</span>
							<span>$64</span>
						</p>
						<p>
							<span>Additional Battle (1.0 Hour)</span>
							<span>$10</span>
						</p>
					</section>
					<h2>Friends of Battle House</h2>
					<section className="prices">
						<p>
							<span>One Battle (1.0 Hour)</span>
							<span>$17.50</span>
						</p>
						<p>
							<span>Two Battles (2.25 Hours)</span>
							<span>$27.50</span>
						</p>
						<p>
							<span>Three Battles (3.5 Hours)</span>
							<span>$37.50</span>
						</p>
						<p>
							<span>Four Battles (4.75 Hours)</span>
							<span>$47.50</span>
						</p>
					</section>
					<h2>Student Special (Wednesday & Thursday Only)</h2>
					<section className="prices">
						<p>
							<span>One Battle (1.0 Hour)</span>
							<span>$22</span>
						</p>
						<p>
							<span>Two Battles (2.25 Hours)</span>
							<span>$33</span>
						</p>
						<p>
							<span>Three Battles (3.5 Hours)</span>
							<span>$44</span>
						</p>
						<p>
							<span>Four Battles (4.75 Hours)</span>
							<span>$55</span>
						</p>
					</section>
				</section>
			);
		} else if (chartSelection === 'privateEvents') {
			return (
				<section className="price-container">
					<h1>Mid-Week Off Hours</h1>
					<h2>1.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$458</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>12</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$34</span>
						</p>
					</section>
					<h2>2.0 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$578</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>12</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$44</span>
						</p>
					</section>
					<h1>Organized School & Youth Groups</h1>
					<h2>1.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$500</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$25</span>
						</p>
					</section>
					<h2>2.0 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$700</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$35</span>
						</p>
					</section>
					<h1>Wednesday & Thursday</h1>
					<h2>1.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$730</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$34</span>
						</p>
					</section>
					<h2>2.0 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$930</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$44</span>
						</p>
					</section>
					<h1>Friday, Saturday  & Sunday</h1>
					<h2>1.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,070</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>30</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$34</span>
						</p>
					</section>
					<h2>2.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,370</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>30</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$44</span>
						</p>
					</section>
				</section>
			);
		} else if (chartSelection === 'events') {
			return (
				<section className="price-container">
					<h1>Standard Pricing</h1>
					<h2>Recon 1.1</h2>
					<section className="prices">
						<p>
							<span>One Battle (1.0 Hour)</span>
							<span>$200</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$34</span>
						</p>
						<p>
							<span>Event Space After Battle</span>
							<span>30 minutes</span>
						</p>
					</section>
					<h2>Recon 1.2</h2>
					<section className="prices">
						<p>
							<span>Two Battles (2.25 Hours)</span>
							<span>$250</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$44</span>
						</p>
						<p>
							<span>Event Space After Battle</span>
							<span>30 minutes</span>
						</p>
					</section>

					<h1>Military & First Responders</h1>
					<h2>Recon 1.1</h2>
					<section className="prices">
						<p>
							<span>One Battle (1.0 Hour)</span>
							<span>$180</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$30</span>
						</p>
						<p>
							<span>Event Space After Battle</span>
							<span>30 minutes</span>
						</p>
					</section>
					<h2>Recon 1.2</h2>
					<section className="prices">
						<p>
							<span>Two Battles (2.25 Hour)</span>
							<span>$230</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$40</span>
						</p>
						<p>
							<span>Event Space After Battle</span>
							<span>30 minutes</span>
						</p>
					</section>
				</section>
			);
		}
	}

	return (
		<div id="page" className="animate-1">
			<select onChange={(event) => setChartSelection(event.target.value)}>
				<option value="sessionPasses">Individual Tickets</option>
				<option value="privateEvents">Private Events</option>
				<option value="events">Birthdays & Corporate Events</option>
			</select>
			{currentPriceChart()}
		</div>
	);
}
