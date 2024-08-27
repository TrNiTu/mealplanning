import {
	Box,
	ChakraProvider,
	Divider,
	Flex,
	Heading,
	IconButton,
	Spinner,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { BsCheck, BsPencilFill } from "react-icons/bs";
import { useState } from "react";

// Components
// import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

// Constants
import {
	HOVER_COLOR_DARK,
	MAIN_COLOR,
	MAIN_COLOR_INPUT,
	MAIN_COLOR_LIGHT,
} from "../../../../service/Constants";

const MealInstructions = ({
	handleSave,
	instructions,
	instructionsLoading,
}) => {
	const [currentValue, setCurrentValue] = useState(instructions);
	const [isChanged, setIsChanged] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const oldValue = instructions;

	const handleInstructionsChange = (e) => {
		setCurrentValue(e.target.value);
	};

	const onEdit = () => {
		setIsEditing(true);
	};

	const onSave = () => {
		if (currentValue !== oldValue) handleSave(currentValue);

		setIsChanged(false);
		setIsEditing(false);
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
			<Box flex="1" justifyContent="start" align="center">
				<Heading color={MAIN_COLOR_LIGHT} fontSize="lg" mb="2">
					Instructions
				</Heading>
				<Divider width="25%" />
			</Box>
			<Box flex="3" my="2" justifySelf="center" overflow="auto">
				{isEditing ? (
					<Textarea
						_focusVisible={{ border: "none" }}
						_hover={{ bg: "rgba(96,96,96,0.1)" }}
						bg={MAIN_COLOR_INPUT}
						color={MAIN_COLOR}
						fontSize="sm"
						onChange={(e) => handleInstructionsChange(e)}
						size="sm"
						textAlign="center"
						variant="filled"
						value={currentValue}
					/>
				) : (
					<Box height="100%" width="100%">
						{isLoading ? (
							<Box
								display="flex"
								height="100%"
								width="100%"
								justifyContent="center"
								alignItems="center"
							>
								<Spinner
									justifySelf="center"
									color={HOVER_COLOR_DARK}
									size="md"
									thickness="3px"
								/>
							</Box>
						) : (
							<ChakraProvider>
								{currentValue.length > 0 ? (
									<Text
										_hover={{ userSelect: "none" }}
										color={MAIN_COLOR}
										fontSize="sm"
									>
										{currentValue}
									</Text>
								) : (
									<Text
										_hover={{ userSelect: "none" }}
										color={HOVER_COLOR_DARK}
										fontSize="sm"
									>
										Empty instructions
									</Text>
								)}
							</ChakraProvider>
						)}
					</Box>
				)}
			</Box>
			{isEditing ? (
				<IconButton
					_hover={{ bg: "green.600", color: "green.50" }}
					bg="green.800"
					color="green.300"
					flex="1"
					icon={<BsCheck />}
					onClick={() => onSave()}
					size="xs"
					transform="scale(1.0)"
					variant="solid"
				/>
			) : (
				<IconButton
					_hover={{ bg: "purple.600", color: "purple.50" }}
					bg="purple.800"
					color="purple.300"
					flex="1"
					icon={<BsPencilFill />}
					onClick={() => onEdit()}
					size="xs"
					transform="scale(1.0)"
					variant="solid"
				/>
			)}
		</Flex>
	);
};

export default MealInstructions;
