import { BiX } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import {
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// Constants
import {
	MAIN_COLOR,
	MAIN_COLOR_DARK,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../../service/Constants";

const ListItemModal = ({ deleteOrShop, isOpen, items, onClose, onConfirm }) => {
	const [itemList, setItemList] = useState(items);
	const textStyleMulti = {
		cursor: "pointer",
		userSelect: "none",
	};

	const handleConfirm = () => {
		onConfirm(items);
	};

	const handleOnClose = () => {
		onClose(items);
	};

	useEffect(() => {
		setItemList(items);
	}, [items]);

	return (
		<Modal isCentered isOpen={isOpen} onClose={handleOnClose}>
			<ModalOverlay backdropFilter="blur(8px)" />
			<ModalContent bg={MAIN_COLOR_DARK}>
				{deleteOrShop === "delete" ? (
					<ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
						Removing Item(s):
					</ModalHeader>
				) : (
					<ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
						Moving item(s) to shopping list:
					</ModalHeader>
				)}

				<ModalBody>
					<Flex
						alignItems="start"
						direction="column"
						maxHeight="50vh"
						overflowY="scroll"
						pl="3"
					>
						{items.map((item, i) => (
							<Text
								key={i}
								color={MAIN_COLOR}
								fontSize="md"
								style={textStyleMulti}
							>
								{item.name}
							</Text>
						))}
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex width="100%" justify="space-around">
						<IconButton
							_hover={{ bg: "green.600", color: "green.100" }}
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
							onClick={handleOnClose}
							size="sm"
							variant="ghost"
						/>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ListItemModal;
