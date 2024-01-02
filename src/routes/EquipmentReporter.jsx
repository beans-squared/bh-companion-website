import { useState } from 'react';
import Modal from './Modal';

export default function EquipmentLogger() {
	const [itemType, setItemType] = useState();
	const [confirmationModal, setConfirmationModal] = useState();
	const [formSubmitted, setFormSubmitted] = useState(false);

	let itemTypeInputElement;
	if (itemType === 'gun') {
		itemTypeInputElement = (
			<div className="form-item animate-1">
				<label htmlFor="itemName" className="form-label">
					ITEM NAME
				</label>
				<select name="itemName">
					<optgroup label="Rifles">
						<option value="mp5">MP5 Stinger</option>
						<option value="auto">Auto</option>
						<option value="ak47">AK-47</option>
						<option value="ak74u">AK-74u</option>
						<option value="m4">M4</option>
						<option value="xm4">XM4</option>
					</optgroup>
					<optgroup label="SMGs">
						<option value="raptor">Raptor</option>
						<option value="viper">Viper</option>
						<option value="p90">P90</option>
						<option value="razorback">Razorback</option>
					</optgroup>
					<optgroup label="Close Quarters">
						<option value="shotgun">Shotgun</option>
						<option value="pistol">Pistol</option>
					</optgroup>
					<optgroup label="Snipers">
						<option value="fal">FAL Sniper</option>
						<option value="2shot">XM4 Sniper</option>
					</optgroup>
				</select>
			</div>
		);
	} else if (itemType === 'prop') {
		itemTypeInputElement = (
			<div className="form-item">
				<label htmlFor="itemName" className="form-label">
					ITEM NAME
				</label>
				<select name="itemName">
					<option value="cube">Domination Cube</option>
					<option value="bomb">Briefcase Bomb</option>
					<option value="minibomb">Backpack Bomb</option>
					<option value="safe">Portable Safe</option>
					<option value="flag">Flag</option>
					<option value="cashbag">Money Bag</option>
					<option value="fuelcan">Fuel Can</option>
					<option value="ammocan">Ammo Can</option>
				</select>
			</div>
		);
	} else if (itemType === 'other') {
		itemTypeInputElement = (
			<div className="form-item">
				<label htmlFor="itemName" className="form-label">
					ITEM NAME
				</label>
				<input type="text" name="itemName" />
			</div>
		);
	} else {
		itemTypeInputElement = <></>;
	}

	function handleSubmit(event) {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());
		formJson.createdAt = new Date();

		console.log('New ticket submission:', formJson);

		fetch(import.meta.env.VITE_CREATE_REPORT_ENDPOINT_URL, {
			method: 'POST',
			body: JSON.stringify(formJson),
		});

		setConfirmationModal(
			<Modal
				options={{
					title: 'REPORT SUBMITTED',
					description: 'Your report has been submitted.',
					linkTo: '/',
				}}
			/>
		);
	}

	return (
		<>
			{confirmationModal}
			<form onSubmit={handleSubmit} method="POST" id="ticket-form">
				<div className="form-item animate-1">
					<label htmlFor="itemType" className="form-label">
						ITEM TYPE
					</label>
					<select
						name="itemType"
						defaultValue="default"
						onChange={(event) => setItemType(event.target.value)}
					>
						<option value="default" disabled>
							Select one
						</option>
						<option value="gun">Gun</option>
						<option value="prop">Game Prop</option>
						<option value="other">Other</option>
					</select>
				</div>

				{itemTypeInputElement}

				{itemType ? (
					<div className="form-item animate-2">
						<label htmlFor="itemNumber" className="form-label">
							ITEM #
						</label>
						<input type="number" name="itemNumber" placeholder="(optional)" />
					</div>
				) : (
					<></>
				)}

				{itemType ? (
					<div className="form-item animate-3">
						<label htmlFor="issueDescription" className="form-label">
							DESCRIPTION OF ISSUE
						</label>
						<textarea
							name="issueDescription"
							placeholder={'Ex: ' + randomPlaceholderDescription()}
						></textarea>
					</div>
				) : (
					<></>
				)}

				{itemType ? (
					<div className="form-item animate-4">
						<label htmlFor="author" className="form-label">
							YOUR INITIALS
						</label>
						<input type="text" name="author" maxLength="2" minLength="2" />
					</div>
				) : (
					<></>
				)}

				{itemType ? (
					<div className="form-item animate-5">
						<button
							type="submit"
							onClick={() => setFormSubmitted(true)}
							disabled={formSubmitted}
						>
							SUBMIT
						</button>
					</div>
				) : (
					<></>
				)}
			</form>
		</>
	);
}

function randomPlaceholderDescription() {
	const placeholders = [
		'Head sensors are flickering, cannot be hit.',
		"Won't turn on, even after overnight charging.",
		'Reload button does not work.',
		'Blue score counter does not turn on.',
		'Speaker makes no sound.',
		'Gun cannot hit anything.',
	];
	return placeholders[Math.round(Math.random() * placeholders.length - 1)];
}
