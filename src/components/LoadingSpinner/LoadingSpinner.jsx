import { Spinner } from "@chakra-ui/react";

import { MAIN_COLOR } from "../../service/Constants";

const LoadingSpinner = ({ size, thickness }) => {
  return <Spinner color={MAIN_COLOR} size={size} thickness={thickness} />;
};

export default LoadingSpinner;
