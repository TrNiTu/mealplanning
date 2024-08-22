import React from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import InventoryList from "../../components/Desktop/Inventory/InventoryList/InventoryList.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import MealsList from "../../components/Desktop/Meals/MealsList/MealsList.jsx";
import ScreenTabs from "../../components/Desktop/ScreenTabs/ScreenTabs.jsx";
import StoreList from "../../components/Desktop/Store/StoreList/StoreList.jsx";

// Constants
import {
	MAIN_COLOR_BACKGROUND,
	SCREEN_TAB_NAMES,
} from "../../service/Constants.js";

// Scripts
import { getItems } from "../../components/Desktop/Inventory/InventoryList/InventoryList.js";

// Styles
import "../../styles/Home.css";

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
