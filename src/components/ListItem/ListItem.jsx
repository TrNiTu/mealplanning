import {
  Card,
  CardBody,
  Checkbox,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BsCheck, BsFillTrash3Fill } from "react-icons/bs";
import {
  MAIN_COLOR,
  MAIN_COLOR_DARK,
  MAIN_COLOR_LIGHT,
  TRANSPARENT,
} from "../../service/Constants";
import { updateItemAmount } from "./ListItem";
import { useEffect, useState } from "react";

import ItemStockBadge from "../ItemStockBadge/InventoryStockBadge";

import "./ListItem.css";

const ListItem = ({ item, onCheckboxChange, onDelete }) => {
  const [canSave, setCanSave] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(
    item === null ? "" : item.amount
  );
  const [isChecked, setIsChecked] = useState(false);
  const originalAmount = item === null ? "" : item.amount;

  const handleBadgeClick = (amount) => {
    if (amount === "High") {
      setCurrentAmount("Medium");
    } else if (amount === "Medium") {
      setCurrentAmount("Low");
    } else if (amount === "Low") {
      setCurrentAmount("Out");
    } else {
      setCurrentAmount("High");
    }
    setCanSave(true);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    onCheckboxChange(item.id, item.name, e.target.checked);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  const handleSave = () => {
    if (canSave) {
      updateItemAmount(item.id, currentAmount);
      setCanSave(false);
    }
  };

  useEffect(() => {
    if (currentAmount !== originalAmount) {
      setCanSave(true);
    }
  }, [currentAmount, originalAmount]);
  return (
    <Card
      bg="rgba(32,32,32)"
      borderColor={isChecked ? MAIN_COLOR : TRANSPARENT}
      p="2"
      m="2"
      variant={"outline"}
    >
      <CardBody>
        <Flex align="center" width="100%">
          <Checkbox
            isDisabled={item === null}
            onChange={(e) => handleCheckboxChange(e)}
          ></Checkbox>
          <Flex align="center" flex="1" justify="center">
            <ItemStockBadge
              amount={currentAmount === null ? "n/a" : currentAmount}
              handleBadgeClick={handleBadgeClick}
            />
          </Flex>
          <Flex align="center" flex="1" justify="center">
            <Text color={MAIN_COLOR} fontSize="lg">
              {item === null ? "No Items" : item.name}
            </Text>
          </Flex>
          <Flex align="center" flex="1" justify="end">
            {canSave ? (
              <IconButton
                _hover={{ bg: MAIN_COLOR, color: MAIN_COLOR_DARK }}
                bg={TRANSPARENT}
                color={MAIN_COLOR}
                icon={<BsCheck />}
                mx="7"
                onClick={() => handleSave()}
                size="xs"
                variant="ghost"
              />
            ) : (
              <IconButton
                _hover={{
                  cursor: "default",
                  bg: TRANSPARENT,
                  color: TRANSPARENT,
                }}
                bg={TRANSPARENT}
                color={TRANSPARENT}
                icon={<BsCheck />}
                mx="7"
                size="xs"
                variant="ghost"
              />
            )}

            <IconButton
              _hover={
                item === null
                  ? { bg: TRANSPARENT, cursor: "not-allowed" }
                  : { bg: MAIN_COLOR, color: MAIN_COLOR_DARK }
              }
              bg={TRANSPARENT}
              color={MAIN_COLOR}
              icon={<BsFillTrash3Fill />}
              onClick={item === null ? null : () => handleDelete(item)}
              size="xs"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ListItem;
