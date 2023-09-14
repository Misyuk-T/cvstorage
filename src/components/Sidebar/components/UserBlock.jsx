import React, { useState } from "react";
import Select from "react-select";
import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { scrollToTop } from "@/helpers/scrollTo";
import {
  transformTechnologiesToSelect,
  transformUserToSearch,
} from "@/helpers/transformData";
import UserForm from "@/components/UserForm/UserForm";
import SearchBox from "@/components/Sidebar/components/SearchBox";
import UserList from "@/components/Sidebar/components/UserList";

const UsersBlock = ({ technologies, projects, users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const formattedData = transformUserToSearch(users);
  const hardSkills = technologies.filter((tech) => tech.type === "hardSkill");
  const hardSkillsOptions = transformTechnologiesToSelect(hardSkills);

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value?.item.key;
    const selectedItem = users.find((item) => item.id === selectedId);

    scrollToTop();
    setSelectedUser(selectedItem);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    selectedTechnologies.every((selectedTech) =>
      [...user.experienceSkills, ...user.hardSkills].some(
        (tech) => tech.technologyId === selectedTech,
      ),
    ),
  );

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList mb={5}>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Observe</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserForm technologies={technologies} projects={projects} />
        </TabPanel>

        <TabPanel>
          <Text fontWeight={500} mb={4}>
            Select user for update:
          </Text>

          <Stack gap={5}>
            <Box>
              <SearchBox
                formattedData={formattedData}
                handleSelect={handleSelect}
              />
            </Box>

            <Box mb={8}>
              <Select
                isMulti
                options={hardSkillsOptions}
                value={selectedTechnologies.map((techId) =>
                  hardSkillsOptions.find((tech) => tech.value === techId),
                )}
                onChange={(selectedOptions) => {
                  handleClose();
                  setSelectedTechnologies(
                    selectedOptions.map((option) => option.value),
                  );
                }}
                placeholder="Filter by technologies"
              />
            </Box>
          </Stack>

          <UserList
            users={filteredUsers}
            onCloseForm={handleClose}
            onSelect={handleSelect}
            selectedUser={selectedUser}
          />

          {selectedUser && (
            <Box my={5}>
              <UserForm
                onComplete={handleClose}
                technologies={technologies}
                projects={projects}
                initialValues={selectedUser}
              />
            </Box>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UsersBlock;
