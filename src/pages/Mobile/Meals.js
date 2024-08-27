import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MAIN_COLOR, MAIN_COLOR_BACKGROUND } from "../../service/Constants";

function Meals() {
	const [isLoading, setIsLoading] = useState(true);
	const [meals, setMeals] = useState([]);
	const [user, setUser] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		document.body.style = "background-color: " + MAIN_COLOR_BACKGROUND;
		if (location.state && location.state.user) {
			setUser(location.state.user);
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [location.state]);

	return (
		<ChakraProvider>
			<Flex
				align="center"
				bg={MAIN_COLOR_BACKGROUND}
				height="100vh"
				maxWidth="100vw"
			>
				<Text color={MAIN_COLOR}>Hello, {user.firstName}</Text>
			</Flex>
		</ChakraProvider>
	);
}

export default Meals;
