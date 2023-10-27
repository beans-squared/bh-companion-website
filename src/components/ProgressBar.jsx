import React from 'react'

const ProgressBar = (props) => {
	const { bgcolor, completed } = props

	const containerStyles = {
    height: 80,
    width: '100%',
    backgroundColor: "#424242",
    borderRadius: 0,
		marginTop: 20,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
		fontSize: 60,
  }

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}>
				<span style={labelStyles}>{`${completed}%`}</span>
			</div>
		</div>
	)
}

export default ProgressBar