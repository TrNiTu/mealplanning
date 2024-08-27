import { BsCartPlusFill, BsTrash3Fill } from "react-icons/bs";
import {
	Box,
	ChakraProvider,
	Checkbox,
	Divider,
	Flex,
	Heading,
	IconButton,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";
import { useEffect, useState } from "react";

// Constants
import {
	CUSTOM_THEME,
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_LIGHT,
} from "../../../../service/Constants";

// Scripts
import { getIngredientItems, getMealIngredients } from "./MealIngredients.js";

const MealIngredients = ({
	handleAction,
	handleModalOpen,
	ingredients,
	isLoading,
	meal,
}) => {
	const [ingredientRefs, setIngredientRefs] = useState([]);
	const [ingredientItems, setIngredientItems] = useState([]);
	const [ingredientTexts, setIngredientTexts] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedItemRefs, setSelectedItemRefs] = useState([]);

	useEffect(() => {
		const fetchIngredients = async () => {
			if (meal) {
				try {
					const ingredients = await getMealIngredients(meal);
					const ingredientItems = await getIngredientItems(ingredients);
					let ingredientTexts = [];
					for (let i = 0; i < ingredients.length; i++) {
						ingredientTexts.push(
							ingredients[i].amount + " " + ingredientItems[i].name
						);
					}
					setIngredientRefs(ingredients);
					setIngredientItems(ingredientItems);
					setIngredientTexts(ingredientTexts);
				} catch (error) {
					console.error("Error fetching ingredients:", error);
				}
			}
		};

		fetchIngredients();
	}, [ingredients, meal]);

	const onAddIngredient = () => {
		handleModalOpen();
	};

	const onCheckboxChange = (e, i) => {
		if (e.target.checked) {
			setSelectedItems((prevItems) => [...prevItems, ingredientItems[i]]);
			setSelectedItemRefs((prevItemRefs) => [
				...prevItemRefs,
				ingredientRefs[i],
			]);
		} else {
			setSelectedItems((prevItems) =>
				prevItems.filter((item) => item.id !== ingredientItems[i].id)
			);
			setSelectedItemRefs((prevItemRefs) =>
				prevItemRefs.filter((item) => item.id !== ingredientRefs[i].id)
			);
		}
	};

	const onDeleteIngredient = async () => {
		handleAction("delete", selectedItemRefs);
		setSelectedItems([]);
	};

	const onShopIngredient = async () => {
		handleAction("shop", selectedItems);
		setSelectedItems([]);
	};

	return (
		<Flex
			border="2px solid"
			borderColor={MAIN_COLOR}
			direction="column"
			height="100%"
			overflow="hidden"
			p="2"
			width="100%"
		>
			<Box align="center" flex="1" justifyContent="start" width="100%">
				<Flex align="center" justify="end" mb="2" position="relative">
					<Heading
						color={MAIN_COLOR_LIGHT}
						fontSize="lg"
						justifySelf="center"
						width="100%"
					>
						Ingredients
					</Heading>
					<Flex position="absolute">
						<IconButton
							_hover={{ bg: "blue.600", color: "blue.50" }}
							bg="blue.800"
							color="blue.300"
							icon={<BsCartPlusFill />}
							isDisabled={selectedItems.length === 0}
							m="2"
							onClick={onShopIngredient}
							size="xs"
							transform="scale(1.25)"
							variant="ghost"
						/>
						<IconButton
							_hover={{ bg: "red.600", color: "red.50" }}
							bg="red.800"
							color="red.300"
							icon={<BsTrash3Fill />}
							isDisabled={selectedItems.length === 0}
							m="2"
							onClick={onDeleteIngredient}
							size="xs"
							transform="scale(1.25)"
							variant="ghost"
						/>
					</Flex>
				</Flex>
				<Divider width="25%" />
			</Box>
			<Box flex="3" my="2" overflow="auto">
				{!isLoading && ingredients.length < 0 ? (
					<Text color={MAIN_COLOR}>No ingredients available</Text>
				) : ingredients.length > 0 ? (
					<ChakraProvider theme={CUSTOM_THEME}>
						{ingredientTexts.map((item, i) => (
							<Flex key={i} align="center" width="100%">
								<Checkbox
									justifySelf="start"
									onChange={(e) => onCheckboxChange(e, i)}
								></Checkbox>
								<Text
									color={MAIN_COLOR}
									fontSize="sm"
									justifySelf="center"
									width="100%"
								>
									<Tooltip
										bg={MAIN_COLOR_BACKGROUND}
										label={"Stock: " + ingredientItems[i].amount}
										placement="right"
									>
										{item}
									</Tooltip>
								</Text>
							</Flex>
						))}
					</ChakraProvider>
				) : (
					<ChakraProvider>
						<Flex height="100%" justify="center" align="center">
							<Spinner color={MAIN_COLOR} size="lg" thickness="3px" />
						</Flex>
					</ChakraProvider>
				)}
			</Box>
			<IconButton
				_hover={{ bg: "green.600", color: "green.50" }}
				bg="green.800"
				color="green.300"
				flex="1"
				icon={<BsPlus />}
				mt="1"
				onClick={onAddIngredient}
				size="lg"
				transform="scale(1.0)"
				variant="solid"
			/>
		</Flex>
	);
};

export default MealIngredients;
