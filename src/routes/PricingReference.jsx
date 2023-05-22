import { useState } from 'react';
import './PricingReference.css';

export default function PricingReference() {
	const [chartSelection, setChartSelection] = useState('sessionPasses');

	function currentPriceChart() {
		if (chartSelection === 'sessionPasses') {
			return (
				<section className="price-container">
					<h1>Wed, Fri & Sat</h1>
					<h2>Standard Admission</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$43</span>
						</p>
						<p>
							<span>Additional Play (1.75 Hours)</span>
							<span>$20</span>
						</p>
						<p>
							<span>Late Night Deal (1.75 Hours)</span>
							<span>$38</span>
						</p>
						<p>
							<span>Double Time (3.5 Hours)</span>
							<span>$55</span>
						</p>
					</section>
					<h2>Military/First Responders</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$38</span>
						</p>
					</section>
					<h2>Friends of Battle House</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$25</span>
						</p>
						<p>
							<span>Additional Play (1.75 Hours)</span>
							<span>$15</span>
						</p>
					</section>

					<h1>Thurs & Sun</h1>
					<h2>Standard Admission</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$30</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$40</span>
						</p>
						<p>
							<span>Additional Play (1 Hour)</span>
							<span>$15</span>
						</p>
					</section>
					<h2>Student Special (Thurs Only)</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$20</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$30</span>
						</p>
					</section>
					<h2>Friends of Battle House</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$15</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$25</span>
						</p>
						<p>
							<span>Additional Play (1 Hour)</span>
							<span>$10</span>
						</p>
					</section>
				</section>
			);
		} else if (chartSelection === 'privateEvents') {
			return (
				<section className="price-container">
					<h1>Mid-Week</h1>
					<h2>Off Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$480</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>10</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$43</span>
						</p>
					</section>
					<h1>Organized School & Youth Groups</h1>
					<h2>Off Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>12-20 Players</span>
							<span>$34</span>
						</p>
						<p>
							<span>21-40 Players</span>
							<span>$32</span>
						</p>
						<p>
							<span>41+ Players</span>
							<span>$30</span>
						</p>
						<p>
							<span>No Charge for Event Room</span>
						</p>
					</section>
					<h1>Thursday</h1>
					<h2>One Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minium Deposit</span>
							<span>$630</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$30</span>
						</p>
					</section>
					<h2>Two Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$830</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$40</span>
						</p>
					</section>
					<h1>Friday</h1>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$910</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$43</span>
						</p>
					</section>
					<h1>Saturday</h1>
					<h2>Non-Peak Hours</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
							<span>11am & 9pm</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$910</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>20</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$43</span>
						</p>
					</section>
					<h2>Peak Hours</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
							<span>1pm, 3pm, 5pm & 7pm</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,770</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>40</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$43</span>
						</p>
					</section>
					<h1>Sunday</h1>
					<h2>One Hour</h2>
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
							<span>30</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$30</span>
						</p>
					</section>
					<h2>Two Hours</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,230</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>30</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$40</span>
						</p>
					</section>
				</section>
			);
		} else if (chartSelection === 'events') {
			return (
				<section className="price-container">
					<h1>Fri & Sat</h1>
					<h2>Recon 2</h2>
					<section className="prices">
						<p>
							<span>1.75 Hours</span>
							<span>$265</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$43</span>
						</p>
						<p>
							<span>Event Space After Battle</span>
							<span>45 minutes</span>
						</p>
					</section>
					<h1>Wed, Thurs & Sun</h1>
					<h2>Recon 1.1</h2>
					<section className="prices">
						<p>
							<span>1 Hour</span>
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
							<span>2 Hours</span>
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
				<option value="sessionPasses">Session Passes</option>
				<option value="privateEvents">Private Events</option>
				<option value="events">Birthday Parties/Corporate Events</option>
			</select>
			{currentPriceChart()}
		</div>
	);
}
