import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
});

export const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserInfo = localStorage.getItem("isLoggedIn");

		if (storedUserInfo === "LOGGED_IN") {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		localStorage.setItem("isLoggedIn", "LOGGED_IN");
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
