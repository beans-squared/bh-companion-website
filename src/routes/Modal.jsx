import { Link } from 'react-router-dom';
import './Modal.css';

export default function Modal({ options }) {
	return (
		<div className="modal-generic animate-1">
			<h1>{options.title}</h1>
			<p>{options.description}</p>
			<Link to={options.linkTo}>
				<button>OKAY</button>
			</Link>
		</div>
	);
}
