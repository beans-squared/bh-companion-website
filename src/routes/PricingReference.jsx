import { useState } from 'react';
import './PricingReference.css';

export default function PricingReference() {
	const [chartSelection, setChartSelection] = useState('sessionPasses');

	function currentPriceChart() {
		if (chartSelection === 'sessionPasses') {
			return (
				<section className="price-container">
					<h1>Friday & Saturday</h1>
					<h2>Standard Admission</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$47</span>
						</p>
						<p>
							<span>Additional Play (1.75 Hours)</span>
							<span>$22</span>
						</p>
						<p>
							<span>Late Night Deal (1.75 Hours)</span>
							<span>$42</span>
						</p>
						<p>
							<span>Double Time (3.5 Hours)</span>
							<span>$60</span>
						</p>
					</section>
					<h2>Military/First Responders</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$42</span>
						</p>
					</section>
					<h2>Groups of 21 or More</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$42</span>
						</p>
					</section>
					<h2>Friends of Battle House</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1.75 Hours)</span>
							<span>$27.50</span>
						</p>
						<p>
							<span>Additional Play (1.75 Hours)</span>
							<span>$17.50</span>
						</p>
					</section>

					<h1>Wednesday, Thursday & Sunday</h1>
					<h2>Standard Admission</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$34</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$44</span>
						</p>
						<p>
							<span>Additional Play (1 Hour)</span>
							<span>$17</span>
						</p>
					</section>
					<h2>Student Special (Wednesday & Thursday Only)</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$22</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$33</span>
						</p>
					</section>
					<h2>Friends of Battle House</h2>
					<section className="prices">
						<p>
							<span>Standard Play (1 Hour)</span>
							<span>$17.50</span>
						</p>
						<p>
							<span>Standard Play (2 Hours)</span>
							<span>$27.50</span>
						</p>
						<p>
							<span>Additional Play (1 Hour)</span>
							<span>$12.50</span>
						</p>
					</section>
				</section>
			);
		} else if (chartSelection === 'privateEvents') {
			return (
				<section className="price-container">
					<h1>Mid-Week Off Hours</h1>
					<h2>1.75 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$614</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>12</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$47</span>
						</p>
					</section>
					<h2>1.0 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$540</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>15</span>
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
							<span>$470</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>10</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$44</span>
						</p>
					</section>
					<h1>Organized School & Youth Groups</h1>
					<h2>Off Hours</h2>
					<section className="prices">
						<p>
							<span>Battle Outside Open Hours</span>
						</p>
						<p>
							<span>15-40 Players</span>
							<span>$35</span>
						</p>
						<p>
							<span>41+ Players</span>
							<span>$32</span>
						</p>
						<p>
							<span>No Charge for Event Room</span>
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
							<span>$710</span>
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
							<span>$910</span>
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
					<h1>Friday</h1>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,225</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>25</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$47</span>
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
							<span>$1,225</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>25</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$47</span>
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
							<span>$1,930</span>
						</p>
						<p>
							<span>Minimum Players</span>
							<span>40</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$47</span>
						</p>
					</section>
					<h1>Sunday</h1>
					<h2>1.0 Hour</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,050</span>
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
					<h2>2.0 Hours</h2>
					<section className="prices">
						<p>
							<span>Battle During Open Hours</span>
						</p>
						<p>
							<span>Minimum Deposit</span>
							<span>$1,350</span>
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
					<h1>Fri & Sat</h1>
					<h2>Recon 2</h2>
					<section className="prices">
						<p>
							<span>1.75 Hours</span>
							<span>$285</span>
						</p>
						<p>
							<span>Included Tickets</span>
							<span>5</span>
						</p>
						<p>
							<span>Additional Players</span>
							<span>$47</span>
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
							<span>2 Hours</span>
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
