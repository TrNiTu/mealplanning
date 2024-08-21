import { BsPlus, BsCartPlusFill, BsTrash3Fill } from "react-icons/bs";
import {
	ChakraProvider,
	Flex,
	IconButton,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { createItem, deleteItems, shopItems } from "./InventoryList.js";
import { useEffect, useState } from "react";

import {
	CATEGORIES,
	CUSTOM_THEME,
	MAIN_COLOR,
} from "../../../service/Constants.js";

import ListItemModal from "../ListItemModal/ListItemModal.jsx";
import CategorizedInventoryList from "../CategorizedInventoryList/CategorizedInventoryList.jsx";
// import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

const InventoryList = ({ account, items }) => {
	const [inventoryItems, setInventoryItems] = useState([]);
	//   const [inventoryItemsLeftCol, setInventoryItemsLeftCol] = useState([]);
	//   const [inventoryItemsRightCol, setInventoryItemsRightCol] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isListLoading, setIsListLoading] = useState(false);
	const [openAddItemModal, setOpenAddItemModal] = useState(false);
	const [openMultiDeleteModal, setOpenMultiDeleteModal] = useState(false);
	const [openShopItemsModal, setOpenShopItemsModal] = useState(false);
	const [openSingleDeleteModal, setOpenSingleDeleteModal] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [singleItemToDelete, setSingleItemToDelete] = useState({});
	const leftColumnCategories = CATEGORIES.filter((_, index) => index % 2 === 0);
	const rightColumnCategories = CATEGORIES.filter(
		(_, index) => index % 2 !== 0
	);

	const toast = useToast({
		duration: 1500,
		position: "top",
	});

	const handleCheckboxChange = (item, isChecked) => {
		if (isChecked) {
			setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
		} else {
			setSelectedItems((prevSelectedItems) =>
				prevSelectedItems.filter((i) => i.id !== item.id)
			);
		}
	};

	const handleAddItem = async () => {
		setOpenAddItemModal(true);
	};

	const handleShopSelected = () => {
		setOpenShopItemsModal(true);
	};

	const handleShopSelectedConfirm = async () => {
		setIsLoading(true);
		const shopItemsResult = await shopItems(selectedItems);
		toast({
			description: shopItemsResult.description,
			status: shopItemsResult.status,
			title: shopItemsResult.title,
		});
		setSelectedItems([]);
		handleModalClose();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleMultiDelete = () => {
		setOpenMultiDeleteModal(true);
	};

	const handleMultiDeleteConfirm = async (items) => {
		setIsLoading(true);
		const deleteItemsResult = await deleteItems(items);
		toast({
			description: deleteItemsResult.description,
			status: deleteItemsResult.status,
			title: deleteItemsResult.title,
		});
		setSelectedItems([]);
		handleModalClose();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleSingleDelete = (item) => {
		setSingleItemToDelete(item);
		setOpenSingleDeleteModal(true);
	};

	const handleSingleDeleteConfirm = async (items) => {
		setIsLoading(true);
		setIsListLoading(true);
		const deleteItemsResult = await deleteItems(items);
		toast({
			description: deleteItemsResult.description,
			status: deleteItemsResult.status,
			title: deleteItemsResult.title,
		});
		setOpenSingleDeleteModal(false);
		setTimeout(() => {
			setIsLoading(false);
			setIsListLoading(false);
		}, 500);
	};

	const handleAddItemConfirm = async (item) => {
		if (item.validity) {
			setIsLoading(true);
			setIsListLoading(true);
			const createItemResult = await createItem(item, account);
			toast({
				description: createItemResult.description,
				status: createItemResult.status,
				title: createItemResult.title,
			});
			handleModalClose();
			setTimeout(() => {
				setIsLoading(false);
				setIsListLoading(false);
			}, 500);
		}
	};

	const handleModalClose = () => {
		if (openAddItemModal) setOpenAddItemModal(false);
		if (openMultiDeleteModal) setOpenMultiDeleteModal(false);
		if (openShopItemsModal) setOpenShopItemsModal(false);
		if (openSingleDeleteModal) setOpenSingleDeleteModal(false);
	};

	const showSaveToast = async (updateItemResult) => {
		try {
			console.log("updateitemresult: ", updateItemResult);
			if (updateItemResult) {
				toast({
					description: updateItemResult.description,
					status: updateItemResult.status,
					title: updateItemResult.title,
				});
			}
		} catch (error) {
			console.error("Error while showing save toast: ", showSaveToast);
		}
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
						<ListItemModal
							deleteOrShop="delete"
							isOpen={openMultiDeleteModal}
							items={selectedItems}
							onClose={() => handleModalClose()}
							onConfirm={handleMultiDeleteConfirm}
						/>
						<ListItemModal
							deleteOrShop="delete"
							isOpen={openSingleDeleteModal}
							items={[singleItemToDelete]}
							onClose={() => handleModalClose()}
							onConfirm={handleSingleDeleteConfirm}
						/>
						<ListItemModal
							deleteorShop="shop"
							isOpen={openShopItemsModal}
							items={selectedItems}
							onClose={() => handleModalClose()}
							onConfirm={handleShopSelectedConfirm}
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
								<CategorizedInventoryList
									account={account}
									category={category}
									isListLoading={isListLoading}
									items={items}
									key={i}
									onCheckboxChange={handleCheckboxChange}
									onDelete={handleSingleDelete}
									onSave={showSaveToast}
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
								<CategorizedInventoryList
									account={account}
									category={category}
									isListLoading={isListLoading}
									items={items}
									key={i}
									onCheckboxChange={handleCheckboxChange}
									onDelete={handleSingleDelete}
									onSave={showSaveToast}
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
