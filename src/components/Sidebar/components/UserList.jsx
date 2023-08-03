import { useState } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Table,
  Box,
} from "@chakra-ui/react";

import { workDirectionOptions } from "@/helpers/constants";
import { extractDate } from "@/helpers/date";

const UserList = ({ users, onCloseForm, onSelect, selectedUser }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const usersByWorkDirection = workDirectionOptions.map((option) =>
    users.filter((user) => user.workDirection === option.value),
  );

  const handleSelectTab = (index) => {
    setSelectedTab(index);
    onCloseForm();
  };

  const handleUserClick = (user) => {
    if (selectedUser?.id === user.id) {
      onCloseForm();
    } else {
      onSelect(null, user.id);
    }
  };

  const renderUserInformation = (user) => {
    const isSelected = selectedUser?.id === user.id;
    const isActive = user.isEnabled === 1;

    return (
      <Tr
        key={user.id}
        onClick={() => handleUserClick(user)}
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
          <Text fontWeight="600" fontSize="16px" fontFamily="Roboto Slab">
            {user.name}
          </Text>
        </Td>

        <Td>
          <Text fontFamily="Roboto Slab">{user.grade}</Text>
        </Td>
        <Td>
          <Text fontFamily="Roboto Slab">{user.cvType}</Text>
        </Td>
        <Td>
          <Text fontFamily="Roboto Slab">{extractDate(user.lastUpdated)}</Text>
        </Td>
        <Td>
          <Box
            ml={5}
            w={4}
            h={4}
            borderRadius="50%"
            bg={isActive ? "green.400" : "tomato"}
          />
        </Td>
      </Tr>
    );
  };

  return (
    <Tabs isFitted index={selectedTab} onChange={handleSelectTab}>
      <TabList>
        <Tab>All</Tab>
        {workDirectionOptions.map((option) => (
          <Tab key={option.value}>{option.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize="14px">User Name</Text>
                </Th>
                <Th>
                  <Text fontSize="14px">Grade</Text>
                </Th>
                <Th>
                  <Text fontSize="14px">CV Type</Text>
                </Th>
                <Th>
                  <Text fontSize="14px">Last Updated</Text>
                </Th>
                <Th>
                  <Text fontSize="14px">Active</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={14}>
              {selectedUser
                ? renderUserInformation(selectedUser)
                : users.map((user) => renderUserInformation(user))}
            </Tbody>
          </Table>

          {!users.length && (
            <Text fontSize="xl" textAlign="center" mt={10}>
              Empty Results...
            </Text>
          )}
        </TabPanel>

        {usersByWorkDirection.map((usersInDirection, index) => (
          <TabPanel key={workDirectionOptions[index].value}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Text fontSize="14px">User Name</Text>
                  </Th>
                  <Th>
                    <Text fontSize="14px">Grade</Text>
                  </Th>
                  <Th>
                    <Text fontSize="14px">CV Type</Text>
                  </Th>
                  <Th>
                    <Text fontSize="14px">Last Updated</Text>
                  </Th>
                  <Th>
                    <Text fontSize="14px">Active</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody fontSize={14}>
                {selectedUser
                  ? renderUserInformation(selectedUser)
                  : usersInDirection.map((user) => renderUserInformation(user))}
              </Tbody>
            </Table>

            {!usersInDirection.length && (
              <Text fontSize="xl" textAlign="center" mt={10}>
                Empty Results...
              </Text>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default UserList;
