import React from "react";
import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ListItem from "../components/ListItem/ListItem";

// styles
import "../styles/Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // grabbing user details
  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
    setLoading(false);
  }, [location.state]);

  // if user is null, navigate to login screen
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <ChakraProvider>
      <Flex align="center" bg="#252525" color="#8c7d75" h="100vh" justify="center" w="100vw" >
        {user ?
          // post-login user is verified\
          <ChakraProvider>
            <Flex justify="center">
              <Text fontSize="lg">Hi {user.firstName}.</Text>
            </Flex>
          </ChakraProvider>
        :
          // post-login user is not verified
          <LoadingSpinner size="xl" thickness="4px"/>}
      </Flex>
    </ChakraProvider>
  );
};

export default Home;
