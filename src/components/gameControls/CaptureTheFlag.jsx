export function CaptureTheFlag({ gameProperties, sendJsonMessage }) {
	function update(event) {
		event.preventDefault()

		sendJsonMessage({
			command: 'update_current_game_data',
			data: {
				redFlagStatus: event.target.redFlagStatus.value,
				blueFlagStatus: event.target.blueFlagStatus.value,
			},
		})
	}

	return (
		<form onSubmit={update}>
			<label htmlFor="redFlagStatus">Red Flag Status</label>
			<select name="redFlagStatus">
				<option value="RETURNED">RETURNED</option>
				<option value="STOLEN">STOLEN</option>
				<option value="CAPTURED">CAPTURED</option>
			</select>
			<label htmlFor="blueFlagStatus">Blue Flag Status</label>
			<select name="blueFlagStatus">
				<option value="RETURNED">RETURNED</option>
				<option value="STOLEN">STOLEN</option>
				<option value="CAPTURED">CAPTURED</option>
			</select>
			<button type="submit">Update Status</button>
		</form>
	)
}
