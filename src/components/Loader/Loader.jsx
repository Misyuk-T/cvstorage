import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box position="relative" w="100%" height="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        color="teal"
        size="xl"
        position="absolute"
        right="50%"
        top="50vh"
      />
    </Box>
  );
};

export default Loader;
