import { BsCheck } from "react-icons/bs";
import { BiX } from "react-icons/bi";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  MAIN_COLOR,
  MAIN_COLOR_BACKGROUND,
  MAIN_COLOR_DARK,
  MAIN_COLOR_INPUT,
  MAIN_COLOR_LIGHT,
  TRANSPARENT,
} from "../../service/Constants";
import { useState, useEffect } from "react";

import ItemStockBadge from "../ItemStockBadge/InventoryStockBadge";

const AddItemModal = ({
  categoryValidity,
  nameValidity,
  isOpen,
  onClose,
  onConfirm,
}) => {
  // only allow user to save when name, amount, and category are filled
  // only need to validate amount and category
  // validate upon saving
  const [newItemAmount, setNewItemAmount] = useState("High");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [isCategoryValid, setIsCategoryValid] = useState("");
  const [isNameValid, setIsNameValid] = useState("");

  useEffect(() => {
    console.log("updating validity values: ", categoryValidity + " ", nameValidity);
    setIsCategoryValid(categoryValidity);
    setIsNameValid(nameValidity);
  }, [categoryValidity, nameValidity])
  const onBadgeClick = () => {
    if (newItemAmount === "High") {
      setNewItemAmount("Medium");
    } else if (newItemAmount === "Medium") {
      setNewItemAmount("Low");
    } else if (newItemAmount === "Low") {
      setNewItemAmount("Out");
    } else {
      setNewItemAmount("High");
    }
  };

  const handleConfirm = () => {
    onConfirm({ "amount": newItemAmount, "category": newItemCategory, "name": newItemName });
  };

  const handleInputChange = (e, inputType) => {
    if (inputType === "name") {
      setNewItemName(e.target.value);
    } else if (inputType === "category") {
      setNewItemCategory(e.target.value);
    } else {
      console.error(
        "Error when handling input change, type " +
          inputType +
          " is not found. Expected 'name' or 'category'."
      );
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent bg={MAIN_COLOR_DARK}>
        <ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
          Add Item
        </ModalHeader>
        <ModalBody>
          <Flex direction="column">
            <Flex my="3">
              <Text color={MAIN_COLOR}>Amount</Text>
              <ItemStockBadge
                amount={newItemAmount}
                handleBadgeClick={onBadgeClick}
              />
            </Flex>
            <Flex my="3">
              <Text color={MAIN_COLOR}>Name</Text>
              <Input
                _focusVisible={{
                  borderColor: MAIN_COLOR + " !important",
                  boxShadow: "0 0 0 1px" + MAIN_COLOR + "!important",
                }}
                _hover={{ bg: MAIN_COLOR_INPUT }}
                bg={MAIN_COLOR_INPUT}
                borderColor={MAIN_COLOR_INPUT}
                color={MAIN_COLOR_LIGHT}
                fontSize="sm"
                isInvalid={!isNameValid}
                onChange={(e) => handleInputChange(e, "name")}
                placeholder="i.e. 'Chicken Breast'"
                size="md"
                variant="outline"
                width="50%"
              />
            </Flex>
            <Flex my="3">
              <Text color={MAIN_COLOR}>Category</Text>
              <Input
                _focusVisible={{
                  borderColor: MAIN_COLOR + " !important",
                  boxShadow: "0 0 0 1px" + MAIN_COLOR + "!important",
                }}
                _hover={{ bg: MAIN_COLOR_INPUT }}
                bg={MAIN_COLOR_INPUT}
                borderColor={MAIN_COLOR_INPUT}
                color={MAIN_COLOR_LIGHT}
                fontSize="sm"
                isInvalid={!isCategoryValid}
                onChange={(e) => handleInputChange(e, "category")}
                placeholder="i.e. 'Meats'"
                size="md"
                variant="outline"
                width="50%"
              />
            </Flex>
          </Flex>
          {/* three inputs, name, category, amount */}
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="space-around">
            <IconButton
              _hover={{ bg: "green.600", color: "green.100 " }}
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
              onClick={onClose}
              size="sm"
              variant="ghost"
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;
