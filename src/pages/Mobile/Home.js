import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NavigationDrawer from "../../components/Mobile/NavigationDrawer/NavigationDrawer";

// styles
import "../../styles/Home.css";
import { MAIN_COLOR, MAIN_COLOR_BACKGROUND } from "../../service/Constants";
import userEvent from "@testing-library/user-event";

const HomeMobile = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const location = useLocation();
	const navigate = useNavigate();

	// grabbing user details
	useEffect(() => {
		document.body.style = "background-color: " + MAIN_COLOR_BACKGROUND;
		if (location.state && location.state.user) {
			setUser(location.state.user);
			setIsLoading(false);
		}
	}, [location.state]);

	// if user is null, navigate to login screen
	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}

		if (user) {
		}

		// if user is not on mobile device, navigate to desktop home screen
		if (!isMobile) navigate("/desktop/home", { state: { user } });

		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [user, isLoading, navigate]);

	// TODO implement get
	return (
		<ChakraProvider>
			<Flex
				align="center"
				bg={MAIN_COLOR_BACKGROUND}
				direction="column"
				justify="start"
				height="100vh"
				maxWidth="100vw"
				py="3"
			>
				{user ? (
					// <Text color={MAIN_COLOR}>
					// 	Hello, {user.firstName}. Welcome to the mobile site.
					// </Text>
					<NavigationDrawer page="Inventory" />
				) : (
					<LoadingSpinner size="xl" thickness="4px" />
				)}
			</Flex>
		</ChakraProvider>
	);
};

export default HomeMobile;
