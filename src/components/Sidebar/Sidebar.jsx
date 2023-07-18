import React, { useState } from "react";
import { Box, Flex, Text, VStack, Button } from "@chakra-ui/react";

import TechnologyBlock from "@/components/Sidebar/components/TehcnologyBlock";

const Sidebar = ({ technologies, users, projects }) => {
  const [selectedTab, setSelectedTab] = useState("technologies");

  const handleClick = (tab) => () => {
    setSelectedTab(tab);
  };

  const renderBlock = () => {
    switch (selectedTab) {
      case "users":
        // return <UsersBlock users={users} />;
        return <div>users</div>;
      case "projects":
        // return <ProjectsBlock projects={projects} />;
        return <div>technologies</div>;
      case "technologies":
      default:
        return <TechnologyBlock technologies={technologies} />;
    }
  };

  return (
    <Flex h="100vh">
      <Box
        w="250px"
        bg="gray.200"
        p="4"
        borderRight="1px"
        borderColor="gray.300"
      >
        <VStack
          spacing="4"
          align="start"
          justifyContent="center"
          textAlign="center"
        >
          <Text fontWeight="bold" width="100%">
            Dashboard
          </Text>
          <Button
            width="100%"
            onClick={handleClick("users")}
            _hover={{
              background: "gray.50",
            }}
          >
            Users
          </Button>
          <Button
            width="100%"
            onClick={handleClick("projects")}
            _hover={{
              background: "gray.50",
            }}
          >
            Projects
          </Button>
          <Button
            width="100%"
            onClick={handleClick("technologies")}
            _hover={{
              background: "gray.50",
            }}
          >
            Technologies
          </Button>
        </VStack>
      </Box>

      <Box flex="1" py={6}>
        {renderBlock()}
      </Box>
    </Flex>
  );
};

export default Sidebar;
