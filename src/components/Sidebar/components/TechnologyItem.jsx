import React from "react";

import { Text } from "@chakra-ui/react";

const TechnologyItem = ({ technology, onClick, isActive }) => {
  let backgroundColor;

  switch (technology.type) {
    case "hardSkill":
      backgroundColor = "gray.100";
      break;
    case "softSkill":
      backgroundColor = "purple.100";
      break;
    case "language":
      backgroundColor = "orange.100";
      break;
    default:
      backgroundColor = "white";
      break;
  }

  return (
    <Text
      onClick={onClick}
      cursor="pointer"
      my={1}
      mx={2}
      px={2}
      width="fit-content"
      fontFamily="Share Tech Mono"
      border="1px solid"
      borderRadius={5}
      background={backgroundColor}
      color="black"
      fontWeight={600}
      _hover={{
        background: isActive ? "red.300" : "green.100",
      }}
    >
      {technology?.name}
    </Text>
  );
};

export default TechnologyItem;
