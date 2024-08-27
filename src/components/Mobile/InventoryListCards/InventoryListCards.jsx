import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

// Constants
import { HOVER_COLOR_LIGHT } from "../../../service/Constants";
import InventoryListItem from "../InventoryListItem/InventoryListItem";

const InventoryListCards = ({ items, user }) => {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<Flex
			align="center"
			direction="column"
			justify="start"
			mb="4"
			overflowX="hidden"
			overflowY="scroll"
			textAlign="center"
		>
			{isLoading ? (
				<LoadingSpinner size="md" thickness="2px" />
			) : (
				<ChakraProvider>
					{items.map((doc, i) => (
						<InventoryListItem item={doc} />
					))}
				</ChakraProvider>
			)}
		</Flex>
	);
};

export default InventoryListCards;
