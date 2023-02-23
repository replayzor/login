import { useContext, useEffect, useReducer,  useState } from "react";

// components
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

// styles
import "./Login.css";
import AuthContext from "../../context/auth-context";
import ErrorModal from "../UI/ErrorModal/ErrorModal";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.trim().length >= 6 };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length >= 6 };
	}
	return { value: "", isValid: false };
};

const Login = () => {
	const [formIsValid, setFormIsValid] = useState(false);
	const [errorModal, setErrorModal] = useState(false);

	

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});
	const { onLogin } = useContext(AuthContext);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking for validity...");
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			clearTimeout(identifier);
			console.log("CLEANUP");
		};
	}, [passwordIsValid, emailIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();

		

		if (!emailState.isValid) {
			setErrorModal({
				title: "Invalid input",
				message: "Please enter a valid email address",
			});
			return;
		}

		if (!passwordState.isValid) {
			setErrorModal({
				title: "Invalid input",
				message: "Please enter a valid password (> 7).",
			});
			return;
		}

		onLogin(emailState.value, passwordState.value);
	};

	const errorHandler = () => {
		setErrorModal(false);
	};

	return (
		<>
			{errorModal && (
				<ErrorModal
					onErrorModal={errorHandler}
					title={errorModal.title}
					message={errorModal.message}
				/>
			)}
			<Card className="login">
				<form onSubmit={submitHandler}>
					<Input
						id="email"
						label="E-Mail"
						type="email"
						isValid={emailIsValid}
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						isValid={passwordIsValid}
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
						
					/>
					<div className="actions">
						<Button type="submit" className="btn">
							Login
						</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default Login;
