import Button from "../Button/Button";
import Card from "../Card/Card";

import "./ErrorModal.css";

const ErrorModal = ({ onErrorModal, title, message }) => {
	return (
		<>
			<div className="backdrop" onClick={onErrorModal} />
			<Card className="modal">
				<header className="header">
					<h2>{title}</h2>
				</header>
				<div className="content">
					<p>{message}</p>
				</div>
				<footer className="actions">
					<Button onClick={onErrorModal}>Okay</Button>
				</footer>
			</Card>
		</>
	);
};

export default ErrorModal;
