import { Controller } from "react-hook-form";
import Select from "react-select";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import { transformTechnologiesToSelect } from "@/helpers/transformData";

const TechnologyField = ({ control, technologyOptions, errors }) => {
  const options = transformTechnologiesToSelect(technologyOptions);

  return (
    <FormControl isRequired>
      <FormLabel>Technology Stack</FormLabel>
      <Controller
        name="technologyStack"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti
            placeholder="Select..."
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 100 }),
              option: (styles) => ({
                ...styles,
                cursor: "pointer",
                fontSize: "14px",
              }),
              control: (styles) => ({
                ...styles,
                cursor: "pointer",
                padding: 0,
              }),
              valueContainer: (styles) => ({
                ...styles,
                marginBottom: "4px",
                margin: 0,
              }),
              indicatorsContainer: (styles) => ({
                ...styles,
              }),
            }}
          />
        )}
      />
      {errors?.technologies && (
        <FormErrorMessage>{errors?.technologies.message}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TechnologyField;
