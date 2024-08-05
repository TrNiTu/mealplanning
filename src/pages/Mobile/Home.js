import { ChakraProvider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

// styles
import "../../styles/Home.css";

const HomeMobile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // grabbing user details
  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  // if user is null, navigate to login screen
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }

    // if user is not on mobile device, navigate to desktop home screen
    if (!isMobile) navigate("/Desktop/Home", { state: { user }});
  }, [user, loading, navigate]);

  return (
    <ChakraProvider>
      {user ? (
        <Text>Hello, {user.firstName}. Welcome to the mobile site.</Text>
      ) : (
        <LoadingSpinner size="xl" thickness="4px" />
      )}
    </ChakraProvider>
  );
};

export default HomeMobile;
