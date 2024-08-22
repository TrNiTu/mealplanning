import { BsCartPlusFill, BsTrash3Fill } from "react-icons/bs";
import { Flex, Heading, IconButton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import AddIngredientModal from "../../Modals/AddIngredientModal/AddIngredientModal.jsx";
import MealIngredients from "../MealIngredients/MealIngredients.jsx";
import MealInstructions from "../MealInstructions/MealInstructions.jsx";

// Constants
import {
	HOVER_COLOR_DARK,
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_LIGHT,
} from "../../../../service/Constants";

// Scripts
import {
	addMealIngredient,
	getMealIngredients,
	formatTimestamp,
	saveMealInstructions,
	removeIngredients,
} from "./MealsListCard";
import { shopItems } from "../../Inventory/InventoryList/InventoryList.js";

const MealsListCard = ({ account, meal, onDelete }) => {
	const [ingredients, setIngredients] = useState([]);
	const [ingredientsLoading, setIngredientsLoading] = useState(false);
	const [instructionsLoading, setInstructionsLoading] = useState(false);
	const [mealItem, setMealItem] = useState(meal);
	const [openAddIngredientModal, setOpenAddIngredientModal] = useState(false);

	const toast = useToast({
		duration: 1500,
		position: "top",
	});

	useEffect(() => {
		setIngredientsLoading(true);
		setInstructionsLoading(true);
		const fetchIngredients = async () => {
			const fetchedIngredients = await getMealIngredients(meal);
			setIngredients(fetchedIngredients);
		};
		fetchIngredients();
		setTimeout(() => {
			setIngredientsLoading(false);
			setInstructionsLoading(false);
		}, 500);
	}, [meal]);

	const handleAddAll = async () => {
		console.log("adding these ingredients to shopping list: ", ingredients);
	};

	const handleAddIngredient = async (docId, amount, itemValidity) => {
		handleModalClose();
		if (itemValidity) {
			setIngredientsLoading(true);
			const addIngredientResult = await addMealIngredient(amount, docId, meal);
			const updatedIngredients = await getMealIngredients(meal);
			setIngredients(updatedIngredients);
			toast({
				description: addIngredientResult.description,
				status: addIngredientResult.status,
				title: addIngredientResult.title,
			});
			setTimeout(() => {
				setIngredientsLoading(false);
			}, 500);
		}
	};

	const handleDelete = async () => {
		onDelete(meal);
	};

	const handleModalClose = () => {
		if (openAddIngredientModal) setOpenAddIngredientModal(false);
	};

	const handleSaveInstructions = async (newInstructions) => {
		setInstructionsLoading(true);
		const saveResult = await saveMealInstructions(meal, newInstructions);
		toast({
			description: saveResult.description,
			status: saveResult.status,
			title: saveResult.title,
		});
		setTimeout(() => {
			setInstructionsLoading(false);
		}, 500);
	};

	const handleIngredientAction = async (actionType, items) => {
		setIngredientsLoading(true);
		let result;
		if (actionType === "delete") {
			result = await removeIngredients(meal, items);
			const updatedIngredients = await getMealIngredients(meal);
			setIngredients(updatedIngredients);
		} else {
			result = await shopItems(items);
		}
		toast({
			description: result.description,
			status: result.status,
			title: result.title,
		});
		setTimeout(() => {
			setIngredientsLoading(false);
		}, 500);
	};

	return (
		<Flex
			bg={MAIN_COLOR_BACKGROUND}
			border="2px solid"
			borderColor={HOVER_COLOR_DARK}
			direction="column"
			minHeight="50%"
			maxHeight="50%"
			maxWidth="100%"
			m="2"
			overflow="auto"
			width="100%"
		>
			<AddIngredientModal
				account={account}
				isOpen={openAddIngredientModal}
				ingredients={ingredients}
				onClose={() => handleModalClose()}
				onConfirm={handleAddIngredient}
			/>
			<Flex direction="row" p="2" width="100%">
				<Flex flex="3" direction="column" px="3">
					<Heading color={MAIN_COLOR_LIGHT} fontSize="xl" mb="1">
						{meal.name}
					</Heading>
					<Heading color={MAIN_COLOR} fontSize="xs">
						Last made: {formatTimestamp(meal.timestamp)}
					</Heading>
				</Flex>
				<Flex flex="1" width="100%" justify="end" align="center">
					<IconButton
						_hover={{ bg: "blue.600", color: "blue.50" }}
						bg="blue.800"
						color="blue.300"
						icon={<BsCartPlusFill />}
						mx="4"
						onClick={() => handleAddAll()}
						size="xs"
						transform="scale(1.5)"
						variant="solid"
					/>
					<IconButton
						_hover={{ bg: "red.600", color: "red.50" }}
						bg="red.800"
						color="red.300"
						icon={<BsTrash3Fill />}
						mx="4"
						onClick={() => handleDelete()}
						size="xs"
						style={{ transform: "scale(1.5)" }}
						variant="solid"
					/>
				</Flex>
			</Flex>
			<Flex
				direction="row"
				height="100%"
				my="3"
				overflow="hidden"
				px="3"
				width="100%"
			>
				<Flex
					bg="rgba(128,128,128,0.1)"
					direction="column"
					flex="1"
					height="100%"
					overflowY="auto"
					mr="2"
					textAlign="center"
				>
					<MealIngredients
						handleModalOpen={() => setOpenAddIngredientModal(true)}
						ingredients={ingredients}
						isLoading={ingredientsLoading}
						meal={mealItem}
						handleAction={handleIngredientAction}
					/>
				</Flex>
				<Flex
					bg="rgba(128,128,128,0.1)"
					direction="column"
					flex="1"
					height="100%"
					overflowY="auto"
					ml="2"
					textAlign="center"
				>
					<MealInstructions
						instructions={meal.instructions}
						isLoading={instructionsLoading}
						handleSave={handleSaveInstructions}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default MealsListCard;
