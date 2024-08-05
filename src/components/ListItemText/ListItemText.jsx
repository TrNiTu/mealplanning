import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { BsPencil, BsFillTrash3Fill } from "react-icons/bs";

const ListItemText = ({ amount, itemName, unit }) => {
    return (
        <ChakraProvider>
            <Flex align="center" justify="center">
                <Text m="2">{amount}{unit} of {itemName}</Text>
                <BsPencil className="BsPencil" />
                <BsFillTrash3Fill  />
            </Flex>
        </ChakraProvider>
    )
}

export default ListItemText;