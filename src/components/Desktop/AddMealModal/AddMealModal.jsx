import { BiX } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import {
	ChakraBaseProvider,
	ChakraProvider,
	Flex,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	Textarea,
	Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Constants
import {
	CATEGORIES,
	HOVER_COLOR_DARK,
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_DARK,
	MAIN_COLOR_INPUT,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../../service/Constants";
import { SearchIcon } from "@chakra-ui/icons";

const AddMealModal = ({ isOpen, items, onClose, onConfirm }) => {
	const [categoryFilter, setCategoryFilter] = useState("");
	const [nameFilter, setNameFilter] = useState("");
	const [isNameValid, setIsNameValid] = useState(true);
	const [isNewItemValid, setIsNewItemValid] = useState(false);
	const [isIngredientsValid, setIsIngredientsValid] = useState(false);
	const [isInstructionsValid, setIsInstructionsValid] = useState(true);
	const [itemsToDisplay, setItemsToDisplay] = useState(items);
	const [newItemAmounts, setNewItemAmounts] = useState([]);
	const [newItemName, setNewItemName] = useState("");
	const [newItemInstructions, setNewItemInstructions] = useState("");
	const [newItemIngredients, setNewItemIngredients] = useState([]);

	useEffect(() => {
		handleValidityCheck();
	}, [isNameValid, isInstructionsValid, isIngredientsValid]);

	useEffect(() => {
		filterItems(categoryFilter, nameFilter);
	}, [items, categoryFilter, nameFilter]);

	useEffect(() => {
		checkIngredientsValid();
	}, [newItemAmounts]);
	const checkAmountInvalid = (index) => {
		const amountObject = newItemAmounts.find((item) => item.index === index);
		return amountObject ? !amountObject.isValid : true;
	};

	const checkIngredientsValid = () => {
		const filteredAmountList = newItemAmounts?.filter(
			(item) => item.isValid === false
		);
		const validity =
			newItemIngredients.length > 0 && filteredAmountList.length === 0;
		setIsIngredientsValid(validity);
		return validity;
	};

	const handleSelectIngredient = (item) => {
		let updatedList = newItemIngredients;
		if (newItemIngredients.includes(item)) {
			updatedList = updatedList.filter((i) => i.id !== item.id);
		} else {
			updatedList = [...updatedList, item];
		}

		setNewItemIngredients(updatedList);
		setIsIngredientsValid(
			updatedList.length === newItemAmounts.length && updatedList.length > 0
		);
		handleValidityCheck();
	};

	const filterItems = (category, name) => {
		let filteredItems = items;
		name = name.length > 0 ? name.toLowerCase() : name;
		if (category) {
			filteredItems = filteredItems.filter(
				(item) => item.category === category
			);
		}

		if (name) {
			filteredItems = filteredItems.filter((item) =>
				item.name.toLowerCase().includes(name)
			);
		}

		setItemsToDisplay(filteredItems);
	};

	const handleClose = () => {
		setNewItemAmounts([]);
		setNewItemIngredients([]);
		onClose();
	};

	const handleConfirm = () => {
		if (isNewItemValid) {
			let item = {
				amounts: newItemAmounts,
				instructions: newItemInstructions,
				name: newItemName,
			};
			onConfirm(item);
		}
	};

	const handleInputChange = (e, inputType) => {
		if (inputType === "instructions") {
			let value = e.target.value;
			setNewItemInstructions(value);
			setIsInstructionsValid(value.length > 0);
		} else if (inputType === "name") {
			let value = e.target.value;
			setNewItemName(value);
			setIsNameValid(value.length > 0);
		} else {
			let amountValidity = e.value !== null && e.value.length > 0;
			let amountObject = {
				index: e.index,
				ingredientId: e.ingredientId,
				isValid: amountValidity,
				value: e.value,
			};
			if (newItemAmounts[e.index]) {
				let updatedAmounts = newItemAmounts.filter(
					(item) => item.index !== e.index
				);
				updatedAmounts = [...updatedAmounts, amountObject];
				setNewItemAmounts(updatedAmounts);
			} else {
				setNewItemAmounts([...newItemAmounts, amountObject]);
			}

			checkIngredientsValid();
		}
	};

	const handleValidityCheck = () => {
		const ingredientsValidity = checkIngredientsValid();
		const instructionsValidity = newItemInstructions.length > 0;
		const nameValidity = newItemName.length > 0;
		const validity =
			ingredientsValidity && instructionsValidity && nameValidity;
		setIsNewItemValid(validity);
	};

	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={handleClose}
			scrollBehavior="outside"
			size="xl"
		>
			<ModalOverlay backdropFilter="blur(8px)" />
			<ModalContent bg={MAIN_COLOR_DARK}>
				<ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
					Create Meal Recipe
				</ModalHeader>
				<ModalBody maxHeight="75vh" overflowX="hidden" overflowY="scroll">
					<Flex
						align="center"
						direction="row"
						height="100%"
						justify="space-around"
						maxHeight="50vh"
					>
						{/* Text Column */}
						<Flex align="center" direction="column" flex="1" height="40vh">
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Name
								</Text>
							</Flex>
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Instructions
								</Text>
							</Flex>
							<Flex align="center" flex="1">
								<Text color={MAIN_COLOR} fontSize="md">
									Category Filter
								</Text>
							</Flex>
						</Flex>

						{/* Input Column */}
						<Flex align="center" direction="column" flex="1" height="40vh">
							<Flex align="center" flex="1" width="100%">
								<Input
									_focusVisible={{
										borderColor: MAIN_COLOR + " !important",
										boxShadow: "0 0 0 1px " + MAIN_COLOR + " !important",
									}}
									_hover={{ bg: MAIN_COLOR_BACKGROUND }}
									bg={MAIN_COLOR_INPUT}
									borderColor={MAIN_COLOR_INPUT}
									color={MAIN_COLOR_LIGHT}
									fontSize="sm"
									isInvalid={!isNameValid}
									onChange={(e) => handleInputChange(e, "name")}
									placeholder="i.e. Turkey Sandwich"
									size="md"
									variant="outline"
								/>
							</Flex>
							<Flex align="center" flex="1" width="100%">
								<Textarea
									_focusVisible={{
										borderColor: MAIN_COLOR + " !important",
										boxShadow: "0 0 0 1px " + MAIN_COLOR + " !important",
									}}
									_hover={{ bg: MAIN_COLOR_BACKGROUND }}
									bg={MAIN_COLOR_INPUT}
									borderColor={MAIN_COLOR_INPUT}
									color={MAIN_COLOR_LIGHT}
									fontSize="sm"
									isInvalid={!isInstructionsValid}
									onChange={(e) => handleInputChange(e, "instructions")}
									placeholder="i.e. 'Put turkey on bread...'"
									resize="none"
									size="md"
									variant="outline"
								/>
							</Flex>
							<Flex align="center" flex="1" width="100%">
								<Select
									_focusVisible={{
										bg: MAIN_COLOR_INPUT,
										color: MAIN_COLOR_LIGHT,
									}}
									_hover={{ bg: MAIN_COLOR_INPUT, color: MAIN_COLOR_LIGHT }}
									bg={MAIN_COLOR_INPUT}
									color={MAIN_COLOR_LIGHT}
									placeholder="Choose Category"
									onChange={(e) => setCategoryFilter(e.target.value)}
									variant="filled"
								>
									{CATEGORIES.map((category, i) => (
										<option key={i} value={category}>
											{category}
										</option>
									))}
								</Select>
							</Flex>
						</Flex>
					</Flex>
					<Flex align="center" direction="column" justify="space-around" mt="3">
						<Text color={MAIN_COLOR} fontSize="md">
							Ingredients
						</Text>
						<InputGroup>
							<InputLeftElement>
								<SearchIcon color={MAIN_COLOR_LIGHT} />
							</InputLeftElement>
							<Input
								_focusVisible={{
									borderColor: MAIN_COLOR_INPUT + " !important",
									boxShadow: "0 0 0 0px " + MAIN_COLOR_INPUT + " !important",
								}}
								_hover={{ bg: MAIN_COLOR_INPUT }}
								bg={MAIN_COLOR_INPUT}
								borderColor={MAIN_COLOR_INPUT}
								color={MAIN_COLOR_LIGHT}
								fontSize="sm"
								onChange={(e) => setNameFilter(e.target.value)}
								placeholder="i.e. 'Salt'"
								size="md"
								variant="outline"
							/>
						</InputGroup>

						{/* Ingredients list */}
						<Flex
							align="center"
							bg={MAIN_COLOR_INPUT}
							direction="column"
							height="35vh"
							justify="start"
							maxHeight="35%"
							overflowX="hidden"
							overflowY="scroll"
							py="2"
							width="100%"
						>
							{itemsToDisplay.map((item, i) => (
								<Text
									key={i}
									_hover={
										newItemIngredients.includes(item)
											? { color: "red.500" }
											: { color: "green.200" }
									}
									color={
										newItemIngredients.includes(item) ? "green.500" : MAIN_COLOR
									}
									my="1"
									onClick={() => handleSelectIngredient(item)}
									style={{ cursor: "pointer", userSelect: "none" }}
									transition="0.25s ease-in-out"
								>
									<Tooltip
										bg={MAIN_COLOR_DARK}
										color={MAIN_COLOR_LIGHT}
										label={"Category: " + item.category}
										placement="right"
									>
										{item.name}
									</Tooltip>
								</Text>
							))}
						</Flex>
						{/* Ingredient Amounts */}
						<Text color={MAIN_COLOR} fontSize="md" mb="1" mt="5">
							Amounts
						</Text>

						<Flex
							align="start"
							bg="rgba(0,0,0,0.1)"
							height="25vh"
							maxHeight="25vh"
							width="75%"
							overflowX="hidden"
							overflowY="scroll"
						>
							{/* Input Column */}
							{/* add validity handling for each item amount input */}
							<Flex
								align="center"
								direction="column"
								justify="start"
								maxHeight="25vh"
								width="100%"
								overflow="auto"
							>
								{newItemIngredients.map((item, i) => (
									<Input
										key={i}
										_focusVisible={{
											borderColor: MAIN_COLOR + " !important",
											boxShadow: "0 0 0 1px " + MAIN_COLOR + " !important",
										}}
										_hover={{ bg: MAIN_COLOR_BACKGROUND }}
										bg={MAIN_COLOR_INPUT}
										borderColor={MAIN_COLOR_INPUT}
										color={MAIN_COLOR_LIGHT}
										fontSize="sm"
										isInvalid={checkAmountInvalid(i)} // where index === i
										onChange={(e) =>
											handleInputChange(
												{
													index: i,
													ingredientId: item.id,
													value: e.target.value,
													ingredient: newItemIngredients[i],
												},
												"ingredient"
											)
										}
										placeholder={item.name + " amount..."}
										size="md"
										minHeight="2rem"
										my="2"
										variant="outline"
										width="55%"
									/>
								))}
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
							isDisabled={!isNewItemValid}
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

// inputs needed:
// name instructions

export default AddMealModal;
