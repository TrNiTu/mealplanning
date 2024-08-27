import {
	ChakraProvider,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Highlight,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

// Constants
import {
	CUSTOM_THEME,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_LIGHT,
	SCREEN_NAMES,
} from "../../../service/Constants";

const NavigationDrawer = ({ navigationHandler, page }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const onNavigate = (page) => {
		onClose();
		navigationHandler(page);
	};

	return (
		<ChakraProvider theme={CUSTOM_THEME}>
			<Text
				color={MAIN_COLOR_LIGHT}
				fontSize="xl"
				mb="3"
				onClick={onOpen}
				style={{ cursor: "pointer", userSelect: "none" }}
			>
				{page}
			</Text>
			<Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="top">
				<DrawerOverlay />
				<DrawerContent bg={MAIN_COLOR_BACKGROUND}>
					<DrawerBody>
						<Flex direction="row" justify="space-around" py="3">
							{SCREEN_NAMES.map((name, i) => (
								<Text
									key={i}
									color={name === page ? "green.500" : "gray.500"}
									onClick={() => onNavigate(name)}
									fontSize="xl"
									style={{ cursor: "pointer", userSelect: "none" }}
								>
									<Highlight
										bg="orange"
										query={page}
										styles={{
											px: "4",
											py: "3",
											rounded: "full",
											bg: "green.100",
										}}
									>
										{name}
									</Highlight>
								</Text>
							))}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</ChakraProvider>
	);
};

export default NavigationDrawer;
