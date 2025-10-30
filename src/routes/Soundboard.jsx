export default function Soundboard() {
	return (
		<div>
			<div>
				<h1>Zombie noises</h1>
				<p>L4D Horde Incoming</p>
				<audio controls src="/soundboard/mega_mob_incoming.wav"></audio>
			</div>
			<div>
				<h1>Ambience</h1>
				<p>Cold and Windy (Loop)</p>
				<audio controls loop src="/soundboard/urban_rooftop_ambloop02.wav"></audio>
				<p>Underground Eerie (Loop)</p>
				<audio controls loop src="/soundboard/crucial_undergroundrumbletone_loop.wav"></audio>
				<p>Big Warehouse (Loop)</p>
				<audio controls loop src="/soundboard/crucial_bigwarehouseamb_loop.wav"></audio>
				<p>The Big Creepy (Loop)</p>
				<audio controls loop src="/soundboard/airport_lobby_amb_loop.wav"></audio>
				<p>Raining (Loop)</p>
				<audio controls loop src="/soundboard/crucial_surfacerain_med_loop.wav"></audio>
			</div>
			<div>
				<h1>Weather</h1>
				<p>Thunder Close 1</p>
				<audio controls src="/soundboard/thunder_close01.wav"></audio>
				<p>Thunder Close 2</p>
				<audio controls src="/soundboard/thunder_close02.wav"></audio>
				<p>Thunder Close 3</p>
				<audio controls src="/soundboard/thunder_close03.wav"></audio>
				<p>Thunder Close 4</p>
				<audio controls src="/soundboard/thunder_close04.wav"></audio>
				<p>Thunder Distant 1</p>
				<audio controls src="/soundboard/thunder_distant01.wav"></audio>
				<p>Thunder Distant 2</p>
				<audio controls src="/soundboard/thunder_distant02.wav"></audio>
				<p>Thunder Distant 3</p>
				<audio controls src="/soundboard/thunder_distant03.wav"></audio>
			</div>
		</div>
	)
}
