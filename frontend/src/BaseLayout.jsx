/* eslint-disable react/prop-types */
import Menu from "./components/Menu.jsx";
import { Box, Flex } from "@chakra-ui/react";

const BaseLayout = ({ children }) => {
  return (
    <Flex>
      <Box w="15%">
        <Menu />
      </Box>
      <Box w="85%" bg="#F0F0F0" minH="100vh" py="50px" px="100px">
        {children}
      </Box>
    </Flex>
  );
};

export default BaseLayout;
