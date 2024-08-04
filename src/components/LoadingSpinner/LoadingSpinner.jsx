import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = ({ size, thickness }) => {
    return (
        <Spinner size={size} thickness={thickness} />
    )
}

export default LoadingSpinner;