import { useState } from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { scrollToTop } from "@/helpers/scrollTo";
import { transformUserToSearch } from "@/helpers/transformData";

import UserForm from "@/components/UserForm/UserForm";
import SearchBox from "@/components/Sidebar/components/SearchBox";
import UserList from "@/components/Sidebar/components/UserList";

const UsersBlock = ({ technologies, projects, users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const formattedData = transformUserToSearch(users);

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value?.item.key;
    const selectedItem = users.find((item) => item.id === selectedId);

    scrollToTop();
    setSelectedUser(selectedItem);
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

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

          <Box mb={8}>
            <SearchBox
              formattedData={formattedData}
              handleSelect={handleSelect}
            />
          </Box>

          <UserList
            users={users}
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
