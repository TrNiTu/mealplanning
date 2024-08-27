import { Button, ChakraProvider, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import AddMealModal from "../../Modals/AddMealModal/AddMealModal.jsx";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner.jsx";
import MealsListCard from "../MealsListCard/MealsListCard.jsx";

// Constants
import { MAIN_COLOR } from "../../../../service/Constants";

// Scripts
import { addMeal, deleteMeal, getMeals } from "./MealsList.js";

const MealsList = ({ account, items }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [meals, setMeals] = useState([]);
	const [openAddMealModal, setOpenAddMealModal] = useState(false);

	const toast = useToast({
		duration: 1500,
		position: "top",
	});

	useEffect(() => {
		setIsLoading(true);
		fetchMeals();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [account]);

	const closeModals = () => {
		setOpenAddMealModal(false);
	};

	const fetchMeals = async () => {
		const fetchedMeals = await getMeals(account);
		setMeals(fetchedMeals);
	};

	const handleAdd = async (newItem) => {
		setIsLoading(true);
		closeModals();
		const addResult = await addMeal(account, newItem);
		toast({
			description: addResult.description,
			status: addResult.status,
			title: addResult.title,
		});
		fetchMeals();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleDelete = async (meal) => {
		setIsLoading(true);
		const deleteResult = await deleteMeal(account, meal);
		toast({
			description: deleteResult.description,
			status: deleteResult.status,
			title: deleteResult.title,
		});
		fetchMeals();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	return (
		<ChakraProvider>
			<Flex
				align="start"
				direction="column"
				height="90vh"
				justify="center"
				maxHeight="90vh"
				maxWidth="65vw"
				overflowX="hidden"
				overflowY="scroll"
				p="5"
				width="75vw"
			>
				<AddMealModal
					isOpen={openAddMealModal}
					items={items}
					onClose={() => setOpenAddMealModal(false)}
					onConfirm={handleAdd}
				/>
				{isLoading ? (
					<Flex
						height="100%"
						align="center"
						justify="center"
						transform="scale(1.5)"
						width="100%"
					>
						<LoadingSpinner size="xl" thickness="4px" />
					</Flex>
				) : meals.length > 0 ? (
					<Flex
						align="center"
						direction="column"
						height="100%"
						justify="start"
						maxWidth="100%"
						overflowX="hidden"
						overflowY="scroll"
						width="100%"
					>
						<Flex justify="center" width="100%">
							<Button
								_hover={{ bg: "green.600", color: "green.50" }}
								bg="green.800"
								color="green.300"
								mb="2"
								onClick={() => setOpenAddMealModal(true)}
								size="md"
								transform="scale(1)"
								variant="solid"
							>
								Create Meal
							</Button>
						</Flex>
						{meals.map((meal, i) => (
							<MealsListCard
								account={account}
								key={i}
								meal={meal}
								onDelete={() => handleDelete(meal)}
							/>
						))}
					</Flex>
				) : (
					<Text color={MAIN_COLOR}>No existing meals</Text>
				)}
			</Flex>
		</ChakraProvider>
	);
};

export default MealsList;
