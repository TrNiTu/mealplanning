import { Box, Heading, Flex, Text } from "@chakra-ui/react";

import {
	HOVER_COLOR_DARK,
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	MAIN_COLOR_DARK2,
	MAIN_COLOR_LIGHT,
} from "../../service/Constants";
import { useEffect, useState } from "react";

// Components
import ListItem from "../ListItem/ListItem.jsx";

// Script
import { getItems } from "./CategorizedList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";

const CategorizedList = ({ category, account, onCheckboxChange, onDelete }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleCheckboxChange = (itemId, itemName, isChecked) => {
		onCheckboxChange(itemId, itemName, isChecked);
	};

	const handleDelete = (item) => {
		onDelete(item);
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchItems = async () => {
			const fetchedItems = await getItems(account, category);
			setItems(fetchedItems);
		};

		fetchItems();
		setIsLoading(false);
	}, [category, account]);

	return (
		<Flex
			py="3"
			direction="column"
			maxWidth="100%"
			textAlign="center"
			width="100%"
		>
			<Box>
				<Heading color={MAIN_COLOR_LIGHT} mb="1" size="lg" fontWeight="medium">
					{category}
				</Heading>
			</Box>
			<Box
				bg="rgba(0,0,0,0.3)"
				height="25vh"
				maxHeight="25vh"
				width="100%"
				overflowY="scroll"
			>
				{isLoading ? (
					<LoadingSpinner size="xl" thickness="3px" />
				) : items.length > 0 ? (
					items.map((item, i) => (
						<ListItem
							item={item}
							key={i}
							onCheckboxChange={handleCheckboxChange}
							onDelete={() => handleDelete(item)}
						/>
					))
				) : (
					<ListItem
						item={null}
						onCheckboxChange={handleCheckboxChange}
						onDelete={null}
					/>
				)}
			</Box>
		</Flex>
		// todo: implement list item
	);
};

export default CategorizedList;
