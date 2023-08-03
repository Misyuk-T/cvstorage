import React from "react";
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
import TechnologyItem from "@/components/Sidebar/components/TechnologyItem";

const TechnologyBlock = ({ technologies }) => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);

  const formattedData = transformTechnologiesToSearch(technologies);

  const sortedTechnologies = technologies.slice().sort((a, b) => {
    if (a.type !== b.type) {
      return a.type.localeCompare(b.type);
    }

    return a.name.localeCompare(b.name);
  });

  const handleClick = (value) => {
    console.log(value);
    if (selectedTechnology && !value) {
      setSelectedTechnology(null);
    } else {
      const selectedId = value.id || +value.item.key;
      const selectedTechnology = technologies.find(
        (item) => item.id === selectedId,
      );

      setSelectedTechnology(selectedTechnology);
    }

    scrollToTop();
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
              handleSelect={handleClick}
            />

            <Flex mt={5} flexWrap="wrap">
              {selectedTechnology ? (
                <TechnologyItem
                  technology={selectedTechnology}
                  onClick={() => handleClick(null)}
                  isActive={selectedTechnology}
                />
              ) : (
                sortedTechnologies.map((technology) => (
                  <TechnologyItem
                    key={technology.id}
                    technology={technology}
                    onClick={() => handleClick(technology)}
                    isActive={selectedTechnology}
                  />
                ))
              )}
            </Flex>

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
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TechnologyBlock;
