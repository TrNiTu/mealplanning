import React from "react";
import { ChakraProvider, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Components
import NavigationDrawer from "../../components/Mobile/NavigationDrawer/NavigationDrawer";

// Constants
import {
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_DARK,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../service/Constants";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// Scripts
import { getListItems, getUserDocs } from "../../service/Firebase";
import { isMobile } from "react-device-detect";
import InventoryList from "../../components/Mobile/InventoryList/InventoryList";

function Inventory() {
	const [isLoading, setIsLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [user, setUser] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style = "background-color: " + MAIN_COLOR_BACKGROUND;
		if (location.state && location.state.user) {
			setUser(location.state.user);
		}
	}, [location.state]);

	useEffect(() => {
		const fetchItems = async () => {
			if (user) {
				try {
					const fetchedItems = await getUserDocs("Items", user);
					setItems(fetchedItems);
				} catch (error) {
					console.error("Failed to fetch items", error);
				} finally {
					// setIsLoading(false);
				}
			} else {
				setIsLoading(false);
				// navigate("/");
			}
		};

		fetchItems();

		// change 0 to isMobile
		if (0) navigate("desktop/home", { state: { user } });
	}, [user, isLoading, navigate]);

	useEffect(() => {
		setIsLoading(false);
	}, [items]);

	const onNavigate = (page) => {
		// navigate("/Mobile/" + page);
		navigate("/Mobile/" + page, { state: { user } });
		console.log("navigate to: ", page);
	};

	return (
		<ChakraProvider>
			<Flex
				bg={MAIN_COLOR_BACKGROUND}
				height="100vh"
				maxWidth="100vw"
				overflow="hidden"
				width="100vw"
			>
				{isLoading ? (
					<Flex
						align="center"
						direction="column"
						justify="start"
						height="100%"
						position="relative"
						width="100%"
					>
						<NavigationDrawer
							navigationHandler={onNavigate}
							page={"Inventory"}
							justifySelf="center"
						/>
						<Flex
							align="center"
							height="100%"
							justify="center"
							position="absolute"
							width="100%"
						>
							<LoadingSpinner size="xl" thickness="2px" />
						</Flex>
					</Flex>
				) : (
					<Flex
						align="center"
						direction="column"
						justify="start"
						p="3"
						width="100%"
					>
						<NavigationDrawer
							navigationHandler={onNavigate}
							page={"Inventory"}
						/>
						<InventoryList items={items} user={user} />
					</Flex>
				)}
			</Flex>
		</ChakraProvider>
	);
}

export default Inventory;
