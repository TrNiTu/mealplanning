import { BsCheck, BsX } from "react-icons/bs";
import {
  Button,
  IconButton,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
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
  MAIN_COLOR_LIGHT,
  TRANSPARENT,
} from "../../service/Constants";

// DeleteConfirmationModal
const ListItemSingleDeleteModal = ({ isOpen, itemId, itemName, onClose, onConfirm }) => {
    const handleConfirm = () => {
        onConfirm(itemId)
    }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent bg={MAIN_COLOR_DARK}>
        <ModalHeader alignSelf="center" color={MAIN_COLOR_LIGHT}>
          CONFIRM DELETE
        </ModalHeader>
        <ModalBody>
          <Flex textAlign="center" alignItems="center" justifyContent="center">
            <Text color={MAIN_COLOR_LIGHT} fontSize="lg" mr="1rem">
              Remove
            </Text>
            <Text color={MAIN_COLOR} fontSize="lg" fontWeight="bold" mr="1rem">
              {itemName}
            </Text>
            <Text color={MAIN_COLOR_LIGHT} fontSize="lg">
              from Inventory?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="space-around">
            <IconButton
              _hover={{ bg: "green.800", color: "green.100" }}
              bg={TRANSPARENT}
              colorScheme="green"
              icon={<BsCheck />}
              onClick={handleConfirm}
              size="sm"
              variant="ghost"
            />
            <IconButton
              _hover={{ bg: "red.800", color: "red.100" }}
              bg={TRANSPARENT}
              colorScheme="red"
              icon={<BsX />}
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

export default ListItemSingleDeleteModal;
