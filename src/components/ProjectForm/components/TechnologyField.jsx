import { Controller } from "react-hook-form";
import Select from "react-select";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

const TechnologyField = ({ control, technologyOptions, errors }) => {
  return (
    <FormControl mb={4}>
      <FormLabel>Technology</FormLabel>
      <Controller
        name="technologyStack"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            options={technologyOptions}
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
