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
  const isClientSide = typeof window !== "undefined";

  return (
    <FormControl id={name} isInvalid={!!error} isRequired>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        options={options}
        instanceId={`id${name}`}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        onBlur={onBlur}
        menuPortalTarget={isClientSide && document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 100 }),
          option: (styles) => ({
            ...styles,
            cursor: "pointer",
          }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
          }),
        }}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default ReactSelectField;
