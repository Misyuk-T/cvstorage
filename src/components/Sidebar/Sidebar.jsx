import React, { useState } from "react";
import { Box, Flex, Text, VStack, Button } from "@chakra-ui/react";

import useTechnologiesStore from "@/store/technologiesStore";
import useUsersStore from "@/store/usersStore";
import useProjectsStore from "@/store/projectsStore";

import TechnologyBlock from "@/components/Sidebar/components/TehcnologyBlock";
import ProjectBlock from "@/components/Sidebar/components/ProjectBlock";
import UsersBlock from "@/components/Sidebar/components/UserBlock";

const TABS = [
  { key: "users", label: "Users" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
];

const Sidebar = () => {
  const { technologies } = useTechnologiesStore();
  const { users } = useUsersStore();
  const { projects } = useProjectsStore();

  const [selectedTab, setSelectedTab] = useState("");

  const hardTypeTechnologies = technologies.filter(
    (item) => item.type === "hardSkill",
  );

  const handleClick = (tab) => () => {
    setSelectedTab(tab);
  };

  const renderBlock = () => {
    switch (selectedTab) {
      case "skills":
        return <TechnologyBlock technologies={technologies} />;
      case "projects":
        return (
          <ProjectBlock
            projects={projects}
            technologies={hardTypeTechnologies}
          />
        );
      default:
        return (
          <UsersBlock
            users={users}
            projects={projects}
            technologies={technologies}
          />
        );
    }
  };

  return (
    <Flex h="100vh" w="100%">
      <Box
        w="250px"
        bg="gray.200"
        p="4"
        borderRight="1px"
        borderColor="gray.300"
        position="fixed"
        height="100vh"
      >
        <VStack
          spacing="4"
          align="start"
          justifyContent="center"
          textAlign="center"
        >
          <Text fontWeight="bold" fontSize="20" width="100%" mb={3}>
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
              border="1px solid"
              borderColor="gray.400"
            >
              {tab.label}
            </Button>
          ))}

          <Button
            width="100%"
            mt={5}
            as="a"
            href="/api/auth/logout"
            variant="outline"
            background="white"
            _hover={{
              background: "red.100",
            }}
            border="1px solid"
            borderColor="gray.400"
          >
            Sign Out
          </Button>
        </VStack>
      </Box>

      <Box flex="1" my={6} ml="250px">
        {renderBlock()}
      </Box>
    </Flex>
  );
};

export default Sidebar;
