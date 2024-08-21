import React from "react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import InventoryList from "../../components/Desktop/InventoryList/InventoryList.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import ScreenTabs from "../../components/ScreenTabs/ScreenTabs.jsx";

// constants
import {
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	SCREEN_TAB_NAMES,
} from "../../service/Constants.js";

// styles
import "../../styles/Home.css";
import StoreList from "../../components/Desktop/StoreList/StoreList.jsx";
import MealsList from "../../components/Desktop/MealsList/MealsList.jsx";
import { getItems } from "../../components/Desktop/InventoryList/InventoryList.js";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [selectedTabIndex, setSelectedTabIndex] = useState(1);
	const [items, setItems] = useState([]);
	const [user, setUser] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state && location.state.user) {
			setUser(location.state.user);
		}
		setLoading(false);
	}, [location.state]);

	useEffect(() => {
		if (user === null) return;

		setLoading(true);
		try {
			const fetchItems = async () => {
				const fetchedItems = await getItems(user.email);
				setItems(fetchedItems);
			};

			fetchItems();
		} catch (error) {
			console.error("Error while fetching items: ", error);
		} finally {
			setLoading(false);
		}
	}, [user]);

	// if user is null, navigate to login screen
	useEffect(() => {
		if (!loading && !user) {
			navigate("/");
		}
	}, [user, loading, navigate]);

	useEffect(() => {
		// TODO: implement logic to render things based on tab index
	}, [selectedTabIndex]);

	return (
		<ChakraProvider bg={MAIN_COLOR_BACKGROUND}>
			{user ? (
				<Flex
					align="center"
					bg={MAIN_COLOR_BACKGROUND}
					direction="column"
					maxWidth="100vw"
					height="100vh"
					overflowX="hidden"
				>
					<Box>
						<ScreenTabs
							setSelectedTabIndex={setSelectedTabIndex}
							screenTabNames={SCREEN_TAB_NAMES}
						/>
					</Box>
					{/* // post-login user is verified, conditional rendering based on selected tab */}
					<Box>
						{selectedTabIndex === 0 ? (
							<InventoryList account={user.email} items={items} />
						) : selectedTabIndex === 1 ? (
							<MealsList account={user.email} items={items} />
						) : (
							<StoreList account={user.email} />
						)}
					</Box>
				</Flex>
			) : (
				<Flex
					align="center"
					bg={MAIN_COLOR_BACKGROUND}
					height="100vh"
					justify="center"
					maxHeight="100vh"
					maxWidth="100vw"
					width="100vw"
				>
					<LoadingSpinner size="xl" thickness="4px" />
				</Flex>
			)}
		</ChakraProvider>
	);
};

export default Home;
