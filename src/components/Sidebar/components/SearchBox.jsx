import React from "react";
import ReactSearchBox from "react-search-box";

import { Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBox = ({ formattedData, handleSelect }) => {
  return (
    <Box
      position="relative"
      sx={{
        input: {
          padding: "10px 10px 10px 40px",
          borderColor: "#CBD5E0",

          "& ~ span": {
            margin: "0 10px",
          },
        },
        "& .react-search-box-dropdown": {
          position: "absolute",
          width: "100%",
          top: "32px",
          zIndex: "101",
        },
      }}
    >
      <ReactSearchBox
        placeholder="Search by name..."
        data={formattedData}
        onSelect={handleSelect}
        inputHeight="40px"
        inputFontSize="16px"
        leftIcon={<SearchIcon />}
        iconBoxSize="20px"
        clearOnSelect={false}
      />
    </Box>
  );
};

export default SearchBox;
