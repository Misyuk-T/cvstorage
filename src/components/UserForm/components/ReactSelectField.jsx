import React from "react";
import { useController } from "react-hook-form";
import Select from "react-select";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

const ReactSelectField = ({
  control,
  name,
  label,
  options,
  defaultValue = null,
}) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ control, name, defaultValue });

  return (
    <FormControl id={name} isInvalid={!!error} isRequired>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        onBlur={onBlur}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 100 }) }}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default ReactSelectField;
