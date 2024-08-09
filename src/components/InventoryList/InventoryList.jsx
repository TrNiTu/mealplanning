import { BsPlus, BsCartPlusFill, BsTrash3Fill, BsCart } from "react-icons/bs";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	ChakraProvider,
	Flex,
	IconButton,
	Text,
	Spinner,
} from "@chakra-ui/react";
import { createItem, destroyItems } from "./InventoryList";
import { useEffect, useState } from "react";

import {
	CATEGORIES,
	CUSTOM_THEME,
	MAIN_COLOR,
	MAIN_COLOR_BACKGROUND,
	MAIN_COLOR_DARK,
	MAIN_COLOR_LIGHT,
	TRANSPARENT,
} from "../../service/Constants";

import ListItem from "../ListItem/ListItem.jsx";
import ListItemSingleDeleteModal from "../ListItemDeleteModal/ListItemSingleDeleteModal.jsx";
import DeleteListItemModal from "../DeleteListItemModal/DeleteListItemModal.jsx";
import CategorizedList from "../CategorizedList/CategorizedList.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

const InventoryList = ({ account }) => {
	const [inventoryItems, setInventoryItems] = useState([]);
	//   const [inventoryItemsLeftCol, setInventoryItemsLeftCol] = useState([]);
	//   const [inventoryItemsRightCol, setInventoryItemsRightCol] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [openAddItemModal, setOpenAddItemModal] = useState(false);
	const [openMultiDeleteModal, setOpenMultiDeleteModal] = useState(false);
	const [openSingleDeleteModal, setOpenSingleDeleteModal] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [singleItemToDelete, setSingleItemToDelete] = useState({});
	const leftColumnCategories = CATEGORIES.filter((_, index) => index % 2 === 0);
	const rightColumnCategories = CATEGORIES.filter(
		(_, index) => index % 2 !== 0
	);

	useEffect(() => {
		// const fetchItems = async () => {
		//   const fetchedItems = await getItems(account);
		//   setInventoryItems(fetchedItems);
		//   let halfFetchedItemsSize = Math.ceil(fetchedItems.length / 2);
		//   setInventoryItemsLeftCol(fetchedItems.slice(0, halfFetchedItemsSize));
		//   setInventoryItemsRightCol(fetchedItems.slice(halfFetchedItemsSize));
		// };
		// fetchItems();
	}, [account]);

	useEffect(() => {
		// let halfFetchedItemsSize = Math.ceil(inventoryItems.length / 2);
		// setInventoryItemsLeftCol(inventoryItems.slice(0, halfFetchedItemsSize));
		// setInventoryItemsRightCol(inventoryItems.slice(halfFetchedItemsSize));
	}, [inventoryItems]);

	const handleCheckboxChange = (itemId, itemName, isChecked) => {
		if (isChecked) {
			setSelectedItems((prevSelectedItems) => [
				...prevSelectedItems,
				{ id: itemId, name: itemName },
			]);
		} else {
			setSelectedItems((prevSelectedItems) =>
				prevSelectedItems.filter((item) => item.id !== itemId)
			);
		}
	};

	const handleAddItem = async () => {
		setOpenAddItemModal(true);
	};

	const handleShopSelected = async () => {
		// console.log("going to need these: ", selectedItems);
	};

	const handleMultiDelete = () => {
		setOpenMultiDeleteModal(true);
	};

	const handleMultiDeleteConfirm = async (items) => {
		await deleteItems(items);
		setOpenMultiDeleteModal(false);
	};

	const handleSingleDelete = (item) => {
		setSingleItemToDelete(item);
		setOpenSingleDeleteModal(true);
	};

	const handleSingleDeleteConfirm = async (docId) => {
		await deleteItems(docId);
		setOpenSingleDeleteModal(false);
	};

	const deleteItems = async (docs) => {
		setIsLoading(true);
		await destroyItems(docs);
		setIsLoading(false);
	};

	const handleAddItemConfirm = async (item) => {
		console.log("here is item: ", item);
		if (item.validity) {
			setIsLoading(true);
			await createItem(item, account);
			handleModalClose();
			// show toast event
			setIsLoading(false);
		}
	};

	const handleModalClose = () => {
		if (openAddItemModal) {
			setOpenAddItemModal(false);
		}
		if (openMultiDeleteModal) setOpenMultiDeleteModal(false);
		if (openSingleDeleteModal) setOpenSingleDeleteModal(false);
	};

	return (
		<ChakraProvider theme={CUSTOM_THEME}>
			{isLoading ? (
				<Flex align="center" height="100%" justify="center">
					<Spinner size="xl" thickness="5px" color={MAIN_COLOR} />
				</Flex>
			) : (
				<Flex direction="column">
					<Flex pb="4" justify="end">
						<IconButton
							_hover={{ bg: "green.600", color: "green.50" }}
							bg="green.800"
							color="green.300"
							icon={<BsPlus />}
							mx="4"
							size="xs"
							onClick={handleAddItem}
							variant="solid"
						/>
						<IconButton
							_hover={{ bg: "blue.600", color: "blue.50" }}
							bg="blue.800"
							color="blue.300"
							icon={<BsCartPlusFill />}
							isDisabled={selectedItems.length > 0 ? false : true}
							mx="4"
							size="xs"
							onClick={handleShopSelected}
							variant="solid"
						/>
						<IconButton
							_hover={{ bg: "red.600", color: "red.50" }}
							bg="red.800"
							color="red.300"
							icon={<BsTrash3Fill />}
							isDisabled={selectedItems.length > 0 ? false : true}
							mx="4"
							size="xs"
							onClick={handleMultiDelete}
							variant="solid"
						/>
					</Flex>
					<Flex width="75vw" maxWidth="75vw">
						<DeleteListItemModal
							isOpen={openMultiDeleteModal}
							items={selectedItems}
							onClose={() => handleModalClose()}
							onConfirm={handleMultiDeleteConfirm}
						/>
						<DeleteListItemModal
							isOpen={openSingleDeleteModal}
							items={[singleItemToDelete]}
							onClose={() => handleModalClose()}
							onConfirm={handleSingleDeleteConfirm}
						/>
						<AddItemModal
							isOpen={openAddItemModal}
							onClose={() => handleModalClose()}
							onConfirm={handleAddItemConfirm}
						/>
						<Flex
							align="center"
							direction="column"
							flex="1"
							justify="start"
							maxWidth="75%"
							px="5"
						>
							{leftColumnCategories.map((category, i) => (
								<CategorizedList
									account={account}
									category={category}
									key={i}
									onCheckboxChange={handleCheckboxChange}
									onDelete={handleSingleDelete}
								/>
							))}
						</Flex>
						<Flex
							align="center"
							direction="column"
							flex="1"
							justify="start"
							maxWidth="75%"
							px="5"
						>
							{rightColumnCategories.map((category, i) => (
								<CategorizedList
									account={account}
									category={category}
									key={i}
									onCheckboxChange={handleCheckboxChange}
									onDelete={handleSingleDelete}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
			)}
		</ChakraProvider>
	);
};

export default InventoryList;
