import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import "./LoginButton.css";

const GoogleLoginButton = ({ clickHandler }) => {
  return (
    <Button
      colorScheme="gray"
      onClick={clickHandler}
      size="lg"
    >
      <FcGoogle className="fcgoogle"/>
    </Button>
  );
};

export default GoogleLoginButton;
