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
  disabled = false,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name, defaultValue: defaultValue });
  const isClientSide = typeof window !== "undefined";

  return (
    <FormControl
      id={name}
      isInvalid={!!error}
      defaultValue={defaultValue}
      isRequired
    >
      <FormLabel>{label}</FormLabel>
      <Select
        isDisabled={disabled}
        name={name}
        defaultValue={defaultValue}
        options={options}
        instanceId={`id${name}`}
        value={options.find((option) => option.value === value) || null}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        menuPortalTarget={isClientSide && document.body}
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
      {error && (
        <FormErrorMessage position="absolute" fontSize="12px" bottom="-17px">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default ReactSelectField;
