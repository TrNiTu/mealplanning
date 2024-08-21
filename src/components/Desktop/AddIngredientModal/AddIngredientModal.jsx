import { BsCheck } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import {
	Flex,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Constants
import {
	CATEGORIES,
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	MAIN_COLOR_INPUT,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../../service/Constants";

// Scripts
import { getIngredientRef } from "./AddIngredientModal.js";

const AddIngredientModal = ({
	account,
	ingredients,
	isOpen,
	onClose,
	onConfirm,
}) => {
	const [isAmountTouched, setIsAmountTouched] = useState(false);
	const [isCategoryTouched, setIsCategoryTouched] = useState(false);
	const [isNameTouched, setIsNameTouched] = useState(false);
	const [isAmountValid, setIsAmountValid] = useState(false);
	const [isCategoryValid, setIsCategoryValid] = useState(false);
	const [isItemValid, setIsItemValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isNameValid, setIsNameValid] = useState(false);
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		const validateInputs = () => {
			const amountValidity = amount.trim().length > 0;
			const categoryUpper =
				category.trim().charAt(0).toUpperCase() + category.slice(1);
			const categoryValidity = CATEGORIES.includes(categoryUpper);
			const nameValidity = name.trim().length > 0;

			setIsItemValid(amountValidity && categoryValidity && nameValidity);
		};

		validateInputs();
	}, [amount, category, name]);

	const handleConfirm = async () => {
		const getResult = await getIngredientRef(account, category, name);
		onConfirm(getResult, amount, isItemValid);
	};

	const handleInputChange = (e, inputType) => {
		const value = e.target.value;
		if (inputType === "category") {
			setCategory(value);
			setIsCategoryTouched(true);
			const val = value.charAt(0).toUpperCase() + value.slice(1);
			const validity = CATEGORIES.includes(val);
			setIsCategoryValid(validity);
		} else if (inputType === "name") {
			setName(value);
			setIsNameTouched(true);
			const validity = value.length > 0;
			setIsNameValid(validity);
		} else {
			setAmount(value);
			setIsAmountTouched(true);
			const validity = value.length > 0;
			setIsAmountValid(validity);
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
					Add Ingredient
				</ModalHeader>
				<ModalBody>
					<Flex
						align="center"
						direction="row"
						height="25vh"
						justify="space-around"
					>
						{/* Text Column */}
						<Flex
							flex="1"
							align="center"
							justify="space-around"
							height="100%"
							direction="column"
						>
							<Text color={MAIN_COLOR} fontSize="md">
								Amount
							</Text>
							<Text color={MAIN_COLOR} fontSize="md">
								Category
							</Text>
							<Text color={MAIN_COLOR} fontSize="md">
								Name
							</Text>
						</Flex>
						{/* Input Column */}
						<Flex
							align="center"
							direction="column"
							justify="space-around"
							height="100%"
							flex="1"
						>
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
								isInvalid={isAmountTouched && !isAmountValid}
								onChange={(e) => handleInputChange(e, "amount")}
								placeholder="i.e. '1/2 tbsp'"
								size="md"
								variant="outline"
							/>
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
								isInvalid={isCategoryTouched && !isCategoryValid}
								onChange={(e) => handleInputChange(e, "category")}
								placeholder="i.e. 'Pantry'"
								size="md"
								variant="outline"
							/>
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
								isInvalid={isNameTouched && !isNameValid}
								onChange={(e) => handleInputChange(e, "name")}
								placeholder="i.e. 'Olive Oil'"
								size="md"
								variant="outline"
							/>
						</Flex>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex width="100%" justify="space-around">
						<IconButton
							_hover={{ bg: "green.600", color: "green.100 " }}
							bg={TRANSPARENT}
							colorScheme="green"
							icon={
								isLoading ? <Spinner size="xs" thickness="1px" /> : <BsCheck />
							}
							isDisabled={isLoading || !isItemValid}
							onClick={handleConfirm}
							size="sm"
							transform="scale(1.5)"
							variant="ghost"
						/>
						<IconButton
							_hover={{ bg: "red.600", color: "red.100" }}
							bg={TRANSPARENT}
							colorScheme="red"
							icon={<BiX />}
							onClick={onClose}
							size="sm"
							transform="scale(1.5)"
							variant="ghost"
						/>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddIngredientModal;
