import { Box, Heading, Flex } from "@chakra-ui/react";

import { useEffect, useState } from "react";

// Components
import InventoryListItem from "../InventoryListItem/InventoryListItem.jsx";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner.jsx";

// Constants
import { MAIN_COLOR_LIGHT } from "../../../../service/Constants.js";

const CategorizedInventoryList = ({
	category,
	isListLoading,
	items,
	onCheckboxChange,
	onDelete,
	onSave,
}) => {
	const [filteredItems, setFilteredItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(isListLoading);
	}, [isListLoading]);

	useEffect(() => {
		if (items) {
			isListLoading = false;
		} else {
			isListLoading = true;
		}
	}, [items]);

	useEffect(() => {
		if (!items || !category) return;

		setIsLoading(true);
		setFilteredItems(items.filter((item) => item.category === category));
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [items, category]);

	const handleCheckboxChange = (item, isChecked) => {
		onCheckboxChange(item, isChecked);
	};

	const handleDelete = (item) => {
		onDelete(item);
	};

	const handleSave = (updateItemResult) => {
		onSave(updateItemResult);
	};

	return (
		<Flex
			py="3"
			direction="column"
			maxWidth="100%"
			textAlign="center"
			width="100%"
			overflowX="hidden"
			overflowY="scroll"
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
					<Flex align="center" height="100%" justify="center" width="100%">
						<LoadingSpinner size="xl" thickness="3px" />
					</Flex>
				) : filteredItems.length > 0 ? (
					filteredItems.map((item, i) => (
						<InventoryListItem
							item={item}
							key={i}
							onCheckboxChange={handleCheckboxChange}
							onDelete={() => handleDelete(item)}
							onSave={handleSave}
						/>
					))
				) : (
					<InventoryListItem
						item={null}
						onCheckboxChange={handleCheckboxChange}
						onDelete={null}
					/>
				)}
			</Box>
		</Flex>
	);
};

export default CategorizedInventoryList;
