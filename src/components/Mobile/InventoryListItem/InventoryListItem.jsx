import { BsCheck, BsTrash3Fill } from "react-icons/bs";
import {
	ChakraProvider,
	Checkbox,
	Flex,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import ItemStockBadge from "../../ItemStockBadge/InventoryStockBadge";

// Constants
import {
	CUSTOM_THEME,
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../../service/Constants";
const InventoryListItem = ({ item, onDelete, onSave }) => {
	const [canSave, setCanSave] = useState(false);
	const [currentAmount, setCurrentAmount] = useState(item.amount);
	const [isSelected, setIsSelected] = useState(false);

	const handleAmountChange = (amount) => {
		if (amount === "High") {
			setCurrentAmount("Medium");
		} else if (amount === "Medium") {
			setCurrentAmount("Low");
		} else if (amount === "Low") {
			setCurrentAmount("Out");
		} else {
			setCurrentAmount("High");
		}
		setCanSave(true);
	};
	const handleCheckboxChange = (e) => {
		// handle is selected
		setIsSelected(e.target.checked);
		console.log("item " + item.name + " selected: ", e.target.checked);
	};

	const handleDelete = () => {
		// onDelete(item);
	};

	const handleSave = () => {
		item.amount = currentAmount;
		console.log("new item: ", item);
		// onSave(item);
	};

	return (
		<ChakraProvider theme={CUSTOM_THEME}>
			<Flex
				border="1px solid"
				borderColor={isSelected ? MAIN_COLOR : TRANSPARENT}
				height="15vh"
				maxHeight="5vh"
				my="2"
				width="100%"
			>
				{/* Checkbox || Stock Badge || Item Name || checkmark || delete */}
				<Checkbox onChange={(e) => handleCheckboxChange(e)} />
				<ItemStockBadge
					amount={currentAmount}
					handleBadgeClick={handleAmountChange}
				/>
				<Text color={MAIN_COLOR_LIGHT}>{item.name}</Text>
				<IconButton
					_hover={{ bg: TRANSPARENT, color: MAIN_COLOR_DARK }}
					bg={TRANSPARENT}
					color={MAIN_COLOR}
					icon={<BsCheck />}
					isDisabled={!canSave}
					onClick={() => handleSave()}
					size="xs"
					variant="ghost"
				/>
				<IconButton
					_hover={{ bg: TRANSPARENT, color: MAIN_COLOR_DARK }}
					bg={TRANSPARENT}
					color={MAIN_COLOR}
					icon={<BsTrash3Fill />}
					onClick={() => handleDelete()}
					size="xs"
					variant="ghost"
				/>
			</Flex>
		</ChakraProvider>
	);
};

export default InventoryListItem;
