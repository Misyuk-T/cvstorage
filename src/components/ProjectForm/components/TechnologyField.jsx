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
                fontSize: "14px",
                minHeight: "32px",
                height: "32px",
              }),
              valueContainer: (styles) => ({
                ...styles,
                minHeight: "32px",
                height: "32px",
                marginBottom: "4px",
              }),
              indicatorsContainer: (styles) => ({
                ...styles,
                minHeight: "32px",
                height: "32px",
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
