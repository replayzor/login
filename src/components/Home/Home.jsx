import { useContext } from "react";

import AuthContext from "../../context/auth-context";
// components
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

// styles
import "./Home.css";

const Home = () => {
	const { onLogout } = useContext(AuthContext);

	return (
		<Card className="home">
			<h1>Welcome back!</h1>
			<Button onClick={onLogout}>Logout</Button>
		</Card>
	);
};

export default Home;
