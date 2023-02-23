import "./Input.css";

const Input = ({ isValid, id, type, value, onChange, onBlur, label }) => {
	return (
		<div className={`control ${isValid === false ? "invalid" : ""}`}>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default Input;
