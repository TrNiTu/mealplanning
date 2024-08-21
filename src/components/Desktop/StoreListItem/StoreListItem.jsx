import { BsFillTrash3Fill, BsTrash3Fill } from "react-icons/bs";
import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

// Constants
import {
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	TRANSPARENT,
} from "../../../service/Constants";

const StoreListItem = ({ isSelected, item, onCheckboxChange, onDelete }) => {
	const [currentItem, setCurrentItem] = useState(item);
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = (e) => {
		setIsChecked(e.target.checked);
		onCheckboxChange(item, e.target.checked);
	};

	const handleDelete = (item) => {
		onDelete(item);
	};
	return (
		<Flex p="3" align="center" width="100%" height="100%" py="1">
			<Flex pl="3" justifyContent="start" flex="1">
				<Checkbox
					isChecked={isSelected}
					onChange={(e) => handleCheckboxChange(e)}
					size="lg"
				></Checkbox>
			</Flex>
			<Flex justifyContent="start" flex="2">
				<Text
					color={isSelected ? MAIN_COLOR_DARK : MAIN_COLOR}
					fontSize="lg"
					textDecoration={isSelected ? "line-through" : null}
				>
					{item.category}
				</Text>
			</Flex>
			<Flex justifyContent="center" flex="2">
				<Text
					color={isSelected ? MAIN_COLOR_DARK : MAIN_COLOR}
					fontSize="lg"
					textDecoration={isSelected ? "line-through" : null}
				>
					{item.name}
				</Text>
			</Flex>
			<Flex pr="3" justifyContent="end" flex="1">
				<IconButton
					_hover={
						isSelected
							? { bg: TRANSPARENT, color: MAIN_COLOR }
							: { bg: MAIN_COLOR, color: MAIN_COLOR_DARK }
					}
					bg={TRANSPARENT}
					color={isSelected ? MAIN_COLOR_DARK : MAIN_COLOR}
					icon={<BsFillTrash3Fill />}
					onClick={item === null ? null : () => handleDelete(item)}
					size="xs"
					variant="ghost"
				/>
			</Flex>
		</Flex>
	);
};

export default StoreListItem;
