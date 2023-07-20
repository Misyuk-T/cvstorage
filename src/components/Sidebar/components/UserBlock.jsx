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
import UserForm from "@/components/UserForm/UserForm";

const intersectTechnologies = (project, technologies) => {
  const projectTechnologies = project.technologyStack;
  return technologies.filter((tech) => projectTechnologies.includes(tech.id));
};

const getTechnologyNames = (project, technologies) => {
  return project.technologyStack.map((techId) => {
    return technologies.find((tech) => tech.id === techId);
  });
};

const UsersBlock = ({ technologies, projects, users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(technologies, projects, "here");

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value.item.key;
    const selectedItem = projects.find((item) => item.id === selectedId);
    const technologyList = intersectTechnologies(selectedItem, technologies);

    setSelectedUser({
      ...selectedItem,
      technologyStack: transformTechnologiesToSelect(technologyList),
    });
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Observe</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserForm technologies={technologies} projects={projects} />
        </TabPanel>

        <TabPanel>
          <div>vfdvfd</div>
          {/*<SearchBox*/}
          {/*  formattedData={formattedData}*/}
          {/*  handleSelect={handleSelect}*/}
          {/*/>*/}

          {/*{selectedProject && (*/}
          {/*  <Box*/}
          {/*    mt={5}*/}
          {/*    p={10}*/}
          {/*    borderRadius={5}*/}
          {/*    border="1px solid"*/}
          {/*    borderColor="gray.300"*/}
          {/*  >*/}
          {/*    <ProjectForm*/}
          {/*      initialValues={selectedProject}*/}
          {/*      technologies={technologies}*/}
          {/*      onComplete={handleClose}*/}
          {/*    />*/}
          {/*  </Box>*/}
          {/*)}*/}

          {/*<TableContainer my={5}>*/}
          {/*  <Table variant="simple">*/}
          {/*    <Thead>*/}
          {/*      <Tr fontWeight={600}>*/}
          {/*        <Th>Project Name</Th>*/}
          {/*        <Th>Technology Stack</Th>*/}
          {/*        <Th isNumeric>Description</Th>*/}
          {/*      </Tr>*/}
          {/*    </Thead>*/}
          {/*  </Table>*/}
          {/*</TableContainer>*/}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UsersBlock;
