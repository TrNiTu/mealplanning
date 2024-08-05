import { ChakraProvider, Text } from "@chakra-ui/react";
import ListItem from "../ListItem/ListItem";
import { getInventoryItems } from "./InventoryList";
import { useEffect, useState } from "react";

const InventoryList = ({ account }) => {
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getInventoryItems(account);
            setInventoryItems(fetchedItems);
        }

        fetchItems();
    }, [account]);

    return (
        <ChakraProvider>
            {inventoryItems.map((item, i) => (
                <ListItem key={i} amount={item.amount} itemName={item.name} unit={item.unit}/>
            ))}
        </ChakraProvider>
    )
}

export default InventoryList;