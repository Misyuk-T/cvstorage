import { useState } from "react";
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

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value.item.key;
    const selectedItem = projects.find((item) => item.id === selectedId);
    const technologyList = intersectTechnologies(selectedItem, technologies);

    setSelectedProject({
      ...selectedItem,
      technologyStack: transformTechnologiesToSelect(technologyList),
    });
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Update</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProjectForm technologies={technologies} />
        </TabPanel>

        <TabPanel>
          <SearchBox
            formattedData={formattedData}
            handleSelect={handleSelect}
          />

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
                {sortedProjects.map((project) => (
                  <Tr
                    key={project.id}
                    onClick={() => handleSelect(null, project.id)}
                    cursor="pointer"
                    sx={{
                      transition: "background .2s",
                    }}
                    _hover={{
                      background: "gray.200",
                    }}
                  >
                    <Td fontWeight={500}>
                      <Text fontFamily="Roboto Slab">
                        {project.projectName}
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        {getTechnologyNames(project, technologies).map(
                          (technology) => (
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
                              {technology.name}
                            </Text>
                          ),
                        )}
                      </Flex>
                    </Td>
                    <Td isNumeric>
                      <Text whiteSpace="initial" fontSize={12}>
                        {project.description}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProjectBlock;
