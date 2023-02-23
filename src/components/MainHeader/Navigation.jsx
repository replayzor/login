import { useContext } from "react";

import AuthContext from "../../context/auth-context";
// styles
import "./Navigation.css";

const Navigation = () => {
	const { isLoggedIn, onLogout } = useContext(AuthContext);

	return (
		<nav className="nav">
			<ul>
				{isLoggedIn && (
					<li>
						<a href="/">Users</a>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<a href="/">Admin</a>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<button onClick={onLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
