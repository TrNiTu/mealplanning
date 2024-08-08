import { Badge, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ItemStockBadge = ({ amount, handleBadgeClick }) => {
  const [currentAmount, setCurrentAmount] = useState(amount);
  const [badgeColor, setBadgeColor] = useState("green");
  const [badgeText, setBadgeText] = useState("");

  useEffect(() => {
    setCurrentAmount(amount);
  }, [amount]);

  useEffect(() => {
    if (currentAmount === "High") {
      setBadgeColor("green");
      setBadgeText("High Stock");
    } else if (currentAmount === "Medium") {
      setBadgeColor("yellow");
      setBadgeText("Medium Stock");
    } else if (currentAmount === "Low") {
      setBadgeColor("red");
      setBadgeText("Low Stock");
    } else if (currentAmount === "Out") {
      setBadgeColor("purple");
      setBadgeText("Out of Stock");
    } else {
      setBadgeColor("gray");
      setBadgeText("N/A");
    }
  }, [currentAmount]);

  const badgeStyle = {
    cursor: "pointer",
    userSelect: "none",
  };

  const naBadgeStyle = {
    cursor: "not-allowed",
    userSelect: "none",
  };

  return (
    <ChakraProvider>
      <Badge
        colorScheme={badgeColor}
        onClick={
          badgeText !== "N/A" ? () => handleBadgeClick(currentAmount) : null
        }
        size="md"
        style={badgeText !== "N/A" ? badgeStyle : naBadgeStyle}
        variant="solid"
      >
        {badgeText}
      </Badge>
    </ChakraProvider>
  );
};

export default ItemStockBadge;
