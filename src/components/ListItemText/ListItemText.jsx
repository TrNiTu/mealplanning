import { Box, ChakraProvider, Checkbox, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { BsPencil, BsFillTrash3Fill } from "react-icons/bs";
import { CUSTOM_THEME } from "../../service/Constants";

// components
import ItemStockBadge from "../ItemStockBadge/InventoryStockBadge";

// styles
import "./ListItemText.css";

const ListItemText = ({ amount, color, itemName, unit }) => {
  // TODO implement logic to determine which badge to use
  return (
    <ChakraProvider theme={CUSTOM_THEME}>
      <Flex align="center" justify="space-between" width="100%">
        <Box align="center">
          <ItemStockBadge amount={amount} />
        </Box>
        <Box align="center">
        <Text color={color} m="2">
            {itemName}
          </Text>
        </Box>
        <Box align="center">
          <Icon as={BsPencil} m="1" color={color} />
          <Icon as={BsFillTrash3Fill} m="1" color={color} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default ListItemText;
