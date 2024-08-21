import { BsCheck } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import {
	Divider,
	Flex,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import {
	CATEGORIES,
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	MAIN_COLOR_INPUT,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../../service/Constants";
import { useState, useEffect } from "react";

import ItemStockBadge from "../../ItemStockBadge/InventoryStockBadge";

const AddItemModal = ({ isOpen, item, onClose, onConfirm }) => {
	// only allow user to save when name, amount, and category are filled
	// only need to validate amount and category
	// validate upon saving
	const [newItemAmount, setNewItemAmount] = useState("High");
	const [newItemCategory, setNewItemCategory] = useState(true);
	const [newItemName, setNewItemName] = useState(true);
	const [newItemValidity, setNewItemValidity] = useState("");
	const [isCategoryValid, setIsCategoryValid] = useState("");
	const [isNameValid, setIsNameValid] = useState("");

	useEffect(() => {
		setIsCategoryValid(true);
		setIsNameValid(true);
	}, [isOpen]);

	const onBadgeClick = () => {
		if (newItemAmount === "High") {
			setNewItemAmount("Medium");
		} else if (newItemAmount === "Medium") {
			setNewItemAmount("Low");
		} else if (newItemAmount === "Low") {
			setNewItemAmount("Out");
		} else {
			setNewItemAmount("High");
		}
	};

	const containsIgnoreCase = (category, input) => {
		return category.toLowerCase().includes(input.toLowerCase());
	};

	const handleConfirm = () => {
		const categoryValidity = CATEGORIES.some(
			(category) => category.toLowerCase() === newItemCategory.toLowerCase()
		);
		const nameValidity = newItemName.length > 0;
		const validity = categoryValidity && nameValidity;

		setIsCategoryValid(categoryValidity);
		setIsNameValid(nameValidity);
		setNewItemValidity(validity);
		onConfirm({
			amount: newItemAmount,
			category: newItemCategory,
			name: newItemName,
			validity: validity,
		});
	};

	const handleInputChange = (e, inputType) => {
		if (inputType === "category") {
			setNewItemCategory(e.target.value);
		} else if (inputType === "name") {
			setNewItemName(e.target.value);
		} else {
			console.error(
				"Error when handling input change, type " +
					inputType +
					" is not found. Expected 'name' or 'category'."
			);
		}
	};

	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			scrollBehavior="outside"
			size="md"
		>
			<ModalOverlay backdropFilter="blur(8px)" />
			<ModalContent bg={MAIN_COLOR_DARK}>
				<ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
					Add Item
				</ModalHeader>
				<Divider color={MAIN_COLOR_LIGHT} width="25%" />
				<ModalBody>
					<Flex
						align="center"
						direction="row"
						height="100%"
						justify="space-around"
					>
						{/* Text Column */}
						<Flex align="center" direction="column" flex="1" height="30vh">
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Amount
								</Text>
							</Flex>
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Category
								</Text>
							</Flex>
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Name
								</Text>
							</Flex>
						</Flex>

						{/* Input Column */}
						<Flex align="center" direction="column" flex="1" height="30vh">
							<Flex align="center" flex="1">
								<ItemStockBadge
									amount={newItemAmount}
									handleBadgeClick={onBadgeClick}
								/>
							</Flex>
							<Flex align="center" flex="1">
								<Input
									_focusVisible={{
										borderColor: MAIN_COLOR + " !important",
										boxShadow: "0 0 0 1px" + MAIN_COLOR + "!important",
									}}
									_hover={{ bg: MAIN_COLOR_INPUT }}
									bg={MAIN_COLOR_INPUT}
									borderColor={MAIN_COLOR_INPUT}
									color={MAIN_COLOR_LIGHT}
									fontSize="sm"
									isInvalid={!isCategoryValid}
									onChange={(e) => handleInputChange(e, "category")}
									placeholder="i.e. 'Meats'"
									size="md"
									variant="outline"
								/>
							</Flex>
							<Flex align="center" flex="1">
								<Input
									_focusVisible={{
										borderColor: MAIN_COLOR + " !important",
										boxShadow: "0 0 0 1px" + MAIN_COLOR + "!important",
									}}
									_hover={{ bg: MAIN_COLOR_INPUT }}
									bg={MAIN_COLOR_INPUT}
									borderColor={MAIN_COLOR_INPUT}
									color={MAIN_COLOR_LIGHT}
									fontSize="sm"
									isInvalid={!isNameValid}
									onChange={(e) => handleInputChange(e, "name")}
									placeholder="i.e. 'Chicken Breast'"
									size="md"
									variant="outline"
								/>
							</Flex>
						</Flex>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex align="center" justify="space-around" width="100%">
						<IconButton
							_hover={{ bg: "green.600", color: "green.100 " }}
							bg={TRANSPARENT}
							colorScheme="green"
							icon={<BsCheck />}
							onClick={handleConfirm}
							size="sm"
							variant="ghost"
						/>
						<IconButton
							_hover={{ bg: "red.600", color: "red.100" }}
							bg={TRANSPARENT}
							colorScheme="red"
							icon={<BiX />}
							onClick={onClose}
							size="sm"
							variant="ghost"
						/>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddItemModal;
