import React from "react";
import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import InventoryList from "../../components/InventoryList/InventoryList.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import ScreenTabs from "../../components/ScreenTabs/ScreenTabs.jsx";

// constants
import { SCREEN_TAB_NAMES } from "../../service/Constants.js";

// styles
import "../../styles/Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [user, setUser] = useState(null);

  const selectedTabName = SCREEN_TAB_NAMES[selectedTabIndex];
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

  useEffect(() => {
    // TODO: implement logic to render things based on tab index
  }, [selectedTabIndex]);

  return (
    <ChakraProvider>
      {user ? (
        <ChakraProvider>
          <Flex
            bg="#252525"
            color="8cd7d75"
            h="100vh"
            w="100vw"
            align="center"
            direction="column"
          >
            <Box>
              <ScreenTabs
                setSelectedTabIndex={setSelectedTabIndex}
                screenTabNames={SCREEN_TAB_NAMES}
              />
            </Box>
            {/* // post-login user is verified, conditional rendering based on selected tab */}
            <Box>
              {selectedTabIndex === 0 ? (
                <InventoryList account={user.email}/>
              ) : selectedTabIndex === 1 ? (
                <Text>{selectedTabName} SELECTED</Text>
              ) : (
                <Text>{selectedTabName} SELECTED</Text>
              )}
            </Box>
          </Flex>
        </ChakraProvider>
      ) : (
        // post-login user is not verified
        <LoadingSpinner size="xl" thickness="4px" />
      )}
    </ChakraProvider>
  );
};

export default Home;
