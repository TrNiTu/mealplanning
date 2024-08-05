import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { firebaseAuth } from "../service/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

import GoogleLoginButton from "../components/LoginButton/LoginButton";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const authenticateUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // If user is verified, send them to the Home screen with their data
        if (result._tokenResponse.emailVerified) {
          var user = {
            email: result._tokenResponse.email,
            firstName: result._tokenResponse.firstName,
            photoUrl: result._tokenResponse.photoUrl,
          };
          console.log("User verified, sending to Home page");
          if (isMobile) {
            navigate("/Mobile/Home", { state: { user } });
          } else {
            navigate("/Desktop/Home", { state: { user } });
          }
        }
      })
      .catch((error) => {
        console.error("error during authentication: ", error);
      });
  };

  return (
    <ChakraProvider>
      <Flex align="center" justify="center" bg="#252525" w="100vw" h="100vh">
        <GoogleLoginButton clickHandler={authenticateUser} />
      </Flex>
    </ChakraProvider>
  );
}

export default Login;
