import { Box, Container } from "@chakra-ui/react";
import React from "react";

export const MainLayout: React.ComponentType = ({ children }) => {
  return (
    <Container marginTop={"10%"} maxW={"container.lg"}>
      <Box borderWidth={"1px"} borderRadius={"lg"}>
        {children}
      </Box>
    </Container>
  );
};
