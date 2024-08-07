import { Badge, ChakraProvider } from "@chakra-ui/react";

const ItemStockBadge = ({ amount, handleBadgeClick }) => {
  const badgeStyles = {
    cursor: "pointer",
    userSelect: "none",
  }
  return (
    <ChakraProvider>
      {amount === "High" ? (
        <Badge colorScheme="green" fontSize="l" onClick={() => handleBadgeClick(amount)} style={badgeStyles} variant="solid" >High Stock</Badge>
      ) : amount === "Medium" ? (
        <Badge colorScheme="yellow" fontSize="l" onClick={() => handleBadgeClick(amount)} style={badgeStyles} variant="solid" >Medium Stock</Badge>
      ) : amount === "Low" ? (
        <Badge colorScheme="red" fontSize="l" onClick={() => handleBadgeClick(amount)} style={badgeStyles} variant="solid" >Low Stock</Badge> 
      ) : (
        <Badge colorScheme="gray" fontSize="l" onClick={() => handleBadgeClick(amount)} style={badgeStyles} variant="solid">Out of Stock</Badge>
      ) }
    </ChakraProvider>
  );
};

export default ItemStockBadge;
