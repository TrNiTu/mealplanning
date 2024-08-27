import { ChakraProvider, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import InventoryListCards from "../InventoryListCards/InventoryListCards";

// Constants
import {
	CATEGORIES,
	MAIN_COLOR,
	MAIN_COLOR_LIGHT,
} from "../../../service/Constants";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

/**
 * Categorizes items
 * @param {String} category
 * @returns {Object[]} items
 */
const categorizeItems = (items) => {
	const categorized = {};
	CATEGORIES.forEach((category) => {
		categorized[category] = items.filter(
			(item) => item.category === category && item.inInventory
		);
	});
	return categorized;
};

const InventoryList = ({ items, user }) => {
	const [isLoading, setIsLoading] = useState(true);
	const categorizedItems = categorizeItems(items);

	useEffect(() => {
		setIsLoading(false);
	}, [categorizedItems]);

	return (
		<ChakraProvider>
			<Flex
				align="center"
				direction="column"
				height="100%"
				justify="start"
				overflowY="scroll"
				textAlign="center"
				width="100%"
			>
				{CATEGORIES.map((c, i) => (
					<ChakraProvider key={i}>
						<Flex direction="column" height="30vh" width="100%">
							<Heading
								color={MAIN_COLOR}
								fontSize="xl"
								mb="1"
								style={{ cursor: "none", userSelect: "none  " }}
							>
								{c}
							</Heading>
							<InventoryListCards items={categorizedItems[c]} user={user} />
						</Flex>
					</ChakraProvider>
				))}
			</Flex>
		</ChakraProvider>
	);
};

export default InventoryList;
