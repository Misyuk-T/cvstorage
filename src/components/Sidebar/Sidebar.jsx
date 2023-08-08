import React, { useEffect, useState } from "react";
import { Box, Flex, Text, VStack, Button } from "@chakra-ui/react";

import useTechnologiesStore from "@/store/technologiesStore";
import useUsersStore from "@/store/usersStore";
import useProjectsStore from "@/store/projectsStore";

import { getAllTechnologies } from "@/actions/technologies";
import { getAllUsers } from "@/actions/user";
import { getAllProjects } from "@/actions/projects";

import TechnologyBlock from "@/components/Sidebar/components/TehcnologyBlock";
import ProjectBlock from "@/components/Sidebar/components/ProjectBlock";
import UsersBlock from "@/components/Sidebar/components/UserBlock";

const TABS = [
  { key: "users", label: "Users" },
  { key: "projects", label: "Projects" },
  { key: "technologies", label: "Technologies" },
];

const Sidebar = () => {
  const { technologies, setTechnologies } = useTechnologiesStore();
  const { users, setUsers } = useUsersStore();
  const { projects, setProjects } = useProjectsStore();

  const [selectedTab, setSelectedTab] = useState("");

  const hardTypeTechnologies = technologies.filter(
    (item) => item.type === "hardSkill",
  );

  const handleClick = (tab) => () => {
    setSelectedTab(tab);
  };

  console.log("users", users);

  const renderBlock = () => {
    switch (selectedTab) {
      case "technologies":
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

  const fetchData = async () => {
    try {
      const technologiesData = await getAllTechnologies();
      const usersData = await getAllUsers();
      const projectsData = await getAllProjects();

      setTechnologies(technologiesData);
      setUsers(usersData);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex h="100vh">
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
        </VStack>
      </Box>

      <Box flex="1" my={6} ml="250px">
        {renderBlock()}
      </Box>
    </Flex>
  );
};

export default Sidebar;
