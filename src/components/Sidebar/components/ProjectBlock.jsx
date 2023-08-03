import React, { useState } from "react";
import {
  Box,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
} from "@chakra-ui/react";

import {
  transformProjectsToSearch,
  transformTechnologiesToSelect,
} from "@/helpers/transformData";
import { scrollToTop } from "@/helpers/scrollTo";

import ProjectForm from "@/components/ProjectForm/ProjectForm";
import SearchBox from "@/components/Sidebar/components/SearchBox";

const intersectTechnologies = (project, technologies) => {
  const projectTechnologies = project.technologyStack;
  return technologies.filter((tech) => projectTechnologies.includes(tech.id));
};

const getTechnologyNames = (project, technologies) => {
  return project.technologyStack.map((techId) => {
    return technologies.find((tech) => tech.id === techId);
  });
};

const ProjectBlock = ({ technologies, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const formattedData = transformProjectsToSearch(projects);
  const sortedProjects = projects.sort((a, b) =>
    a.projectName.localeCompare(b.projectName),
  );

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value.item.key;
    const selectedItem = projects.find((item) => item.id === selectedId);
    const technologyList = intersectTechnologies(selectedItem, technologies);

    if (selectedId === selectedProject?.id) {
      handleClose();
    } else {
      setSelectedProject({
        ...selectedItem,
        technologyStack: transformTechnologiesToSelect(technologyList),
        nda: selectedItem.nda === 1,
      });
    }

    scrollToTop();
  };

  const renderProject = (project) => {
    const isSelected = selectedProject?.id === project.id;

    return (
      <Tr
        key={project.id}
        onClick={() => handleSelect(null, project.id)}
        cursor="pointer"
        bg={isSelected ? "green.100" : ""}
        sx={{
          transition: "all .2s",
        }}
        _hover={{
          background: isSelected ? "red.100" : "gray.200",
        }}
      >
        <Td>
          <Text fontFamily="Roboto Slab" fontWeight={600}>
            {project.projectName}
          </Text>
        </Td>
        <Td>
          <Flex gap={2}>
            {getTechnologyNames(project, technologies).map(
              (technology, index) => {
                if (!technology) {
                  return <React.Fragment key={index} />;
                }

                return (
                  <Text
                    key={technology.id}
                    width="fit-content"
                    fontFamily="Share Tech Mono"
                    px={2}
                    border="1px solid"
                    borderColor="blue.600"
                    borderRadius={5}
                    background="gray.50"
                    color="blue.800"
                  >
                    {technology?.name}
                  </Text>
                );
              },
            )}
          </Flex>
        </Td>
        <Td isNumeric>
          <Text whiteSpace="initial" fontSize={12}>
            {project.description}
          </Text>
        </Td>
      </Tr>
    );
  };

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList mb={5}>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Observe</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProjectForm technologies={technologies} />
        </TabPanel>

        <TabPanel>
          <Text fontWeight={500} mb={4}>
            Select project for update:
          </Text>

          <SearchBox
            formattedData={formattedData}
            handleSelect={handleSelect}
          />

          <TableContainer my={5}>
            <Table variant="simple">
              <Thead>
                <Tr fontWeight={600}>
                  <Th>Project Name</Th>
                  <Th>Technology Stack</Th>
                  <Th isNumeric>Description</Th>
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {selectedProject
                  ? renderProject({
                      ...selectedProject,
                      technologyStack: selectedProject.technologyStack.map(
                        (technology) => +technology.value,
                      ),
                    })
                  : sortedProjects.map((project) => renderProject(project))}
              </Tbody>
            </Table>
          </TableContainer>

          {selectedProject && (
            <Box
              mt={5}
              p={10}
              borderRadius={5}
              border="1px solid"
              borderColor="gray.300"
            >
              <ProjectForm
                initialValues={selectedProject}
                technologies={technologies}
                onComplete={handleClose}
              />
            </Box>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProjectBlock;
