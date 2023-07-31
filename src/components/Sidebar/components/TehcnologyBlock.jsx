import { useState } from "react";
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

import { scrollToTop } from "@/helpers/scrollTo";
import { transformTechnologiesToSearch } from "@/helpers/transformData";

import TechnologyForm from "@/components/TechnologyForm/TechnologyForm";
import SearchBox from "@/components/Sidebar/components/SearchBox";

const TechnologyBlock = ({ technologies }) => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  const formattedData = transformTechnologiesToSearch(technologies);
  const sortedTechnologies = technologies.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const handleSelect = (value) => {
    const selectedId = +value.item.key;
    const selectedTechnology = technologies.find(
      (item) => item.id === selectedId,
    );

    scrollToTop();
    setSelectedTechnology(selectedTechnology);
  };

  const handleClose = () => {
    setSelectedTechnology(null);
  };

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList mb={5}>
        <Tab fontWeight={600}>Create</Tab>
        <Tab fontWeight={600}>Observe</Tab>
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

            <SearchBox
              formattedData={formattedData}
              handleSelect={handleSelect}
            />

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
                    width="fit-content"
                    fontFamily="Share Tech Mono"
                    border="1px solid"
                    borderColor="blue.600"
                    borderRadius={5}
                    color="blue.800"
                    background={isActive ? "gray.50" : "transparent"}
                    _hover={{
                      background: "gray.100",
                    }}
                  >
                    {technology?.name}
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
