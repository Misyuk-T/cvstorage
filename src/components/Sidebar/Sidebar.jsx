import React, { useState } from "react";
import { Box, Flex, Text, VStack, Button } from "@chakra-ui/react";

import TechnologyBlock from "@/components/Sidebar/components/TehcnologyBlock";
import ProjectBlock from "@/components/Sidebar/components/ProjectBlock";

const TABS = [
  { key: "users", label: "Users" },
  { key: "projects", label: "Projects" },
  { key: "technologies", label: "Technologies" },
];

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
        return <ProjectBlock projects={projects} technologies={technologies} />;
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

          {TABS.map((tab) => (
            <Button
              key={tab.key}
              width="100%"
              onClick={handleClick(tab.key)}
              background={selectedTab === tab.key ? "gray.50" : "gray.100"}
              _hover={{
                background: "gray.50",
              }}
            >
              {tab.label}
            </Button>
          ))}
        </VStack>
      </Box>

      <Box flex="1" py={6}>
        {renderBlock()}
      </Box>
    </Flex>
  );
};

export default Sidebar;
