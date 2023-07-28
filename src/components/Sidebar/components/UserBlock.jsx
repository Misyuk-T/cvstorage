import { useState } from "react";
import {
  Tab,
  Table,
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
} from "@chakra-ui/react";

import UserForm from "@/components/UserForm/UserForm";

const UsersBlock = ({ technologies, projects, users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  // console.log(technologies, projects, "here");
  // console.log(users, "users");
  console.log(selectedUser, "selectedUser");

  const handleSelect = (value, id = "") => {
    const selectedId = id || +value.item.key;
    const selectedItem = users.find((item) => item.id === selectedId);

    setSelectedUser(selectedItem);
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
          {selectedUser && (
            <UserForm
              technologies={technologies}
              projects={projects}
              initialValues={selectedUser}
            />
          )}

          <Table variant="simple">
            <Thead>
              <Tr fontWeight={600}>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th isNumeric>Position</Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>
              {users.map((user) => (
                <Tr
                  key={user.id}
                  onClick={() => handleSelect(null, user.id)}
                  cursor="pointer"
                  sx={{
                    transition: "background .2s",
                  }}
                  _hover={{
                    background: "gray.200",
                  }}
                >
                  <Td fontWeight={500}>
                    <Text fontFamily="Roboto Slab">{user.name}</Text>
                  </Td>
                  <Td>
                    <Text fontFamily="Roboto Slab">{user.email}</Text>
                  </Td>
                  <Td isNumeric>
                    <Text fontFamily="Roboto Slab">{user.position}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UsersBlock;
