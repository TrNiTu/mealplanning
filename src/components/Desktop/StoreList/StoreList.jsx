import {
	ChakraProvider,
	Flex,
	IconButton,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { BsPlus, BsSave2, BsTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";

// Components
import CategorizedStoreList from "../CategorizedStoreList/CategorizedStoreList.jsx";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

// Constants
import { MAIN_COLOR } from "../../../service/Constants";

// Scripts
import { deleteItems, getItems, saveItems } from "./StoreList";
import ListItemModal from "../ListItemModal/ListItemModal.jsx";

const StoreList = ({ account }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [openAddItemModal, setOpenAddItemModal] = useState(false);
	const [openMultiDeleteModal, setOpenMultiDeleteModal] = useState(false);
	const [openSingleDeleteModal, setOpenSingleDeleteModal] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [singleItemToDelete, setSingleItemToDelete] = useState({});
	const [storeItemList, setStoreItemList] = useState([]);

	const toast = useToast({
		duration: 1500,
		position: "top",
	});
	useEffect(() => {
		setIsLoading(true);
		const fetchItems = async () => {
			const fetchedItems = await getItems(account);
			setStoreItemList(fetchedItems);
		};

		fetchItems();
		setSelectedItems([]);
		setIsLoading(false);
	}, [account]);

	const handleAddItem = () => {
		console.log("Add item modal");
		// this will have just the category & name, amount defaults to Out
	};

	const handleDelete = async (singleOrMultiDelete) => {
		setIsLoading(true);
		let deleteItemsResult =
			singleOrMultiDelete === "single"
				? await deleteItems([singleItemToDelete])
				: await deleteItems(selectedItems);
		const updatedItems = await getItems(account);
		setStoreItemList(updatedItems);
		toast({
			description: deleteItemsResult.description,
			status: deleteItemsResult.status,
			title: deleteItemsResult.title,
		});
		if (singleOrMultiDelete === "single") setSingleItemToDelete({});
		if (singleOrMultiDelete === "multi") setSelectedItems([]);
		handleModalClose();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const handleModalClose = () => {
		if (openAddItemModal) setOpenAddItemModal(false);
		if (openMultiDeleteModal) setOpenMultiDeleteModal(false);
		if (openSingleDeleteModal) setOpenSingleDeleteModal(false);
	};

	const handleSaveList = async () => {
		setIsLoading(true);
		let saveItemsResult = await saveItems(selectedItems);
		if (saveItemsResult.status === "success") {
			setStoreItemList(
				storeItemList.filter(
					(item) => !selectedItems.some((selected) => selected.id === item.id)
				)
			);
			setSelectedItems([]);
		}
		toast({
			description: saveItemsResult.description,
			status: saveItemsResult.status,
			title: saveItemsResult.title,
		});

		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	const onCheckboxChange = (item, isChecked) => {
		setSelectedItems((prevSelectedItems) => {
			if (isChecked) {
				return [...prevSelectedItems, item];
			} else {
				return prevSelectedItems.filter((i) => i.id !== item.id);
			}
		});
	};

	const onDeleteMulti = () => {
		setOpenMultiDeleteModal(true);
	};

	const onDeleteSingle = (item) => {
		setSingleItemToDelete(item);
		setOpenSingleDeleteModal(true);
	};

	return (
		<ChakraProvider>
			{isLoading ? (
				<Flex
					align="center"
					height="75vh"
					justify="center"
					overflowY="hidden"
					width="75vw"
				>
					<Spinner size="xl" thickness="5px" color={MAIN_COLOR} />
				</Flex>
			) : (
				<Flex direction="column">
					<ListItemModal
						deleteOrShop="delete"
						isOpen={openMultiDeleteModal}
						items={selectedItems}
						onClose={() => handleModalClose()}
						onConfirm={() => handleDelete("multi")}
					/>
					<ListItemModal
						deleteOrShop="delete"
						isOpen={openSingleDeleteModal}
						items={[singleItemToDelete]}
						onClose={() => handleModalClose()}
						onConfirm={() => handleDelete("single")}
					/>
					<Flex pb="5" justify="end">
						<IconButton
							_hover={{ bg: "green.600", color: "green.50" }}
							bg="green.800"
							color="green.300"
							icon={<BsPlus />}
							mx="4"
							onClick={handleAddItem}
							size="xs"
							variant="solid"
						/>
						<IconButton
							_hover={{ bg: "blue.600", color: "blue.50" }}
							bg="blue.800"
							color="blue.300"
							icon={<BsSave2 />}
							isDisabled={selectedItems.length > 0 ? false : true}
							mx="4"
							size="xs"
							onClick={handleSaveList}
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
							onClick={onDeleteMulti}
							variant="solid"
						/>
					</Flex>
					<Flex
						textAlign="center"
						justifyContent="center"
						align="center"
						direction="column"
						height="75vh"
						maxHeight="75vh"
						maxWidth="50vw"
						width="50vw"
					>
						<CategorizedStoreList
							items={storeItemList}
							onCheckboxChange={onCheckboxChange}
							onDelete={onDeleteSingle}
							selectedItems={selectedItems}
						/>
					</Flex>
				</Flex>
			)}
		</ChakraProvider>
	);
};

export default StoreList;
