import { useState } from "react";
import ReactSearchBox from "react-search-box";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import TechnologyForm from "@/components/TechnologyForm/TechnologyForm";

const transformData = (initialData) => {
  return initialData.map((item) => ({
    key: item.id.toString(),
    value: item.name,
  }));
};

const TechnologyBlock = ({ technologies }) => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  const formattedData = transformData(technologies);

  const handleSelect = (value) => {
    const selectedId = +value.item.key;
    const selectedTechnology = technologies.find(
      (item) => item.id === selectedId,
    );

    setSelectedTechnology(selectedTechnology);
  };

  const handleClose = () => {
    setSelectedTechnology(null);
  };

  const sortedTechnologies = technologies.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Update</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TechnologyForm />
        </TabPanel>

        <TabPanel>
          <Box>
            <Text fontWeight={500} mb={4}>
              Select technology for update:
            </Text>

            <Box
              sx={{
                input: {
                  padding: "10px 10px 10px 40px",
                  borderColor: "#CBD5E0",

                  "& ~ span": {
                    margin: "0 10px",
                  },
                },
              }}
            >
              <ReactSearchBox
                placeholder="Search by technology name..."
                data={formattedData}
                onSelect={handleSelect}
                inputHeight="40px"
                inputFontSize="16px"
                leftIcon={<SearchIcon />}
                iconBoxSize="20px"
                clearOnSelect={false}
              />
            </Box>

            {selectedTechnology && (
              <Box
                mt={5}
                p={10}
                borderRadius={5}
                border="1px solid"
                borderColor="gray.300"
              >
                <TechnologyForm
                  initialValues={selectedTechnology}
                  onComplete={handleClose}
                />
              </Box>
            )}

            <Flex mt={5} flexWrap={"wrap"}>
              {sortedTechnologies.map((technology) => {
                const isActive = technology.id === selectedTechnology?.id;

                return (
                  <Text
                    key={technology.id}
                    onClick={() => setSelectedTechnology(technology)}
                    cursor="pointer"
                    my={1}
                    mx={2}
                    px={2}
                    border="1px solid black"
                    borderRadius={5}
                    background={isActive ? "gray.300" : "transparent"}
                    _hover={{
                      background: "gray.100",
                    }}
                  >
                    {technology.name}
                  </Text>
                );
              })}
            </Flex>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TechnologyBlock;
