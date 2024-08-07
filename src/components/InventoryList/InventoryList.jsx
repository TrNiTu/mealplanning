import { BsPlus, BsCartPlusFill, BsTrash3Fill, BsCart } from "react-icons/bs";
import { ChakraProvider, Flex, IconButton } from "@chakra-ui/react";
import { deleteItem, getItems } from "./InventoryList";
import { useEffect, useState } from "react";

import {
  CUSTOM_THEME,
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  MAIN_COLOR_LIGHT,
  TRANSPARENT,
} from "../../service/Constants";

import ListItem from "../ListItem/ListItem.jsx";
import ListItemDeleteModal from "../ListItemDeleteModal/ListItemDeleteModal";

const InventoryList = ({ account }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventoryItemsLeftCol, setInventoryItemsLeftCol] = useState([]);
  const [inventoryItemsRightCol, setInventoryItemsRightCol] = useState([]);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inlineDeleteItemId, setInlineDeleteItemId] = useState("");
  const [inlineDeleteItemName, setInlineDeleteItemName] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems(account);
      setInventoryItems(fetchedItems);
      let halfFetchedItemsSize = Math.ceil(fetchedItems.length / 2);
      setInventoryItemsLeftCol(fetchedItems.slice(0, halfFetchedItemsSize));
      setInventoryItemsRightCol(fetchedItems.slice(halfFetchedItemsSize));
    };

    fetchItems();
  }, [account]);

  useEffect(() => {
    let halfFetchedItemsSize = Math.ceil(inventoryItems.length / 2);
    setInventoryItemsLeftCol(inventoryItems.slice(0, halfFetchedItemsSize));
    setInventoryItemsRightCol(inventoryItems.slice(halfFetchedItemsSize));
  }, [inventoryItems]);

  const handleCheckboxChange = (itemId, isChecked) => {
    if (isChecked) {
      // TODO: add to selectedItems
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
    } else {
      // TODO: remove from selectedItems (IF IT EXISTS)
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemId)
      );
    }
  };

  const handleDelete = (itemId, itemName) => {
    setInlineDeleteItemId(itemId);
    setInlineDeleteItemName(itemName);
    setIsDeleteConfirmationModalOpen(true);
  };

  const handleDeleteConfirm = async (docId) => {
    // await deleteItem(docId);
    setIsDeleteConfirmationModalOpen(false);
    setInventoryItems((prevItems) =>
      prevItems.filter((item) => item.id !== docId)
    );
  };

  const handleNewItem = async () => {
    // TODO new item card implementation
  }

  const handleShopSelected = async () => {
    console.log("going to need these: ", selectedItems);
  };

  const handleDeleteSelected = async () => {
    console.log("need to use this for deletion: " , selectedItems);
  }
  

  useEffect(() => {
    // todo trash icon disabled if selectedItems.size() < 1
  }, [selectedItems]);

  // TODO RESPONSIVE DESIGN FOR DESKTOP
  // know when to switch to single column
  return (
    <ChakraProvider theme={CUSTOM_THEME}>
      <Flex pb="4" justify="end">
        <IconButton
          _hover={{ bg: "green.600", color: "green.50" }}
          bg="green.800"
          color="green.300"
          icon={<BsPlus />}
          mx="4"
          size="xs"
          onClick={handleNewItem}
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
          onClick={handleDeleteSelected}
          variant="solid"
        />
      </Flex>
      <Flex width="65vw">
        <ListItemDeleteModal
          itemId={inlineDeleteItemId}
          itemName={inlineDeleteItemName}
          isOpen={isDeleteConfirmationModalOpen}
          onClose={() => setIsDeleteConfirmationModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
        <Flex direction="column" flex="1">
          {inventoryItemsLeftCol.map((item, i) => (
            <ListItem
              key={i}
              amount={item.amount}
              onCheckboxChange={handleCheckboxChange}
              itemId={item.id}
              itemName={item.name}
              onDelete={handleDelete}
            />
          ))}
        </Flex>
        <Flex direction="column" flex="1">
          {inventoryItemsRightCol.map((item, i) => (
            <ListItem
              key={i}
              amount={item.amount}
              onCheckboxChange={handleCheckboxChange}
              itemId={item.id}
              itemName={item.name}
              onDelete={handleDelete}
            />
          ))}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default InventoryList;
