import { Controller } from "react-hook-form";
import Select from "react-select";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import { transformTechnologiesToSelect } from "@/helpers/transformData";

const TechnologyField = ({ control, technologyOptions, errors }) => {
  const options = transformTechnologiesToSelect(technologyOptions);

  return (
    <FormControl isRequired>
      <FormLabel>Technology</FormLabel>
      <Controller
        name="technologyStack"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isMulti
            placeholder="Select a technology"
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
