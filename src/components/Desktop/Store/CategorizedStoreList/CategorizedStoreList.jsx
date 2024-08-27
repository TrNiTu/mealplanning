import { ChakraProvider, Flex } from "@chakra-ui/react";

// Components
import StoreListItem from "../StoreListItem/StoreListItem.jsx";

// Constants
import { CUSTOM_THEME, MAIN_COLOR_LIGHT } from "../../../../service/Constants";

const CategorizedStoreList = ({
	items,
	onCheckboxChange,
	onDelete,
	selectedItems,
}) => {
	const handleCheckboxChange = (item, isChecked) => {
		onCheckboxChange(item, isChecked);
	};

	const handleOnDelete = (item) => {
		onDelete(item);
	};

	return (
		<ChakraProvider theme={CUSTOM_THEME}>
			<Flex
				border="2px solid"
				borderColor={MAIN_COLOR_LIGHT}
				direction="column"
				height="100%"
				width="100%"
				align="start"
				overflowX="hidden"
				overflowY="auto"
			>
				{items.map((item, i) => {
					const isSelected = selectedItems.some(
						(selected) => selected.id === item.id
					);
					return (
						<StoreListItem
							key={i}
							isSelected={isSelected}
							item={item}
							onCheckboxChange={handleCheckboxChange}
							onDelete={() => handleOnDelete(item)}
						/>
					);
				})}
			</Flex>
		</ChakraProvider>
	);
};

export default CategorizedStoreList;
