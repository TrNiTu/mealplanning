import {
	Button,
	ChakraProvider,
	CircularProgress,
	Flex,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Components
import MealsListCard from "../MealsListCard/MealsListCard.jsx";

// Constants
import {
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_LIGHT,
} from "../../../service/Constants";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

// Scripts
import { addMeal, deleteMeal, getMeals } from "./MealsList";
import { BsPlus } from "react-icons/bs";
import AddMealModal from "../AddMealModal/AddMealModal.jsx";

const MealsList = ({ account, items }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [meals, setMeals] = useState([]);
	const [openAddMealModal, setOpenAddMealModal] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchMeals = async () => {
			const fetchedMeals = await getMeals(account);
			setMeals(fetchedMeals);
		};
		fetchMeals();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, [account]);

	const closeModals = () => {
		setOpenAddMealModal(false);
	};

	const handleAdd = (newItem) => {
		setIsLoading(true);
		closeModals();
		console.log("new item: ", newItem);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleDelete = async (item) => {
		console.log("deleting item: ", item);
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
				<Flex justify="center" transform="scale(0.5)" width="100%">
					<Button
						_hover={{ bg: "green.600", color: "green.50" }}
						bg="green.800"
						color="green.300"
						mb="2"
						size="md"
						onClick={() => setOpenAddMealModal(true)}
						variant="solid"
					>
						Create Meal
					</Button>
				</Flex>
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
						maxHeight="100%"
						maxWidth="100%"
						overflowX="hidden"
						overflowY="scroll"
						width="100%"
					>
						{meals.map((meal, i) => (
							<MealsListCard
								account={account}
								key={i}
								meal={meal}
								onDelete={handleDelete}
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
