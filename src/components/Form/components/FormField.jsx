import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

const CustomInput = ({ name, label, register, errors, isTextarea = false }) => {
  return (
    <FormControl id={name} isRequired isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      {isTextarea ? (
        <Textarea type="text" name={name} {...register(name)} />
      ) : (
        <Input type="text" name={name} {...register(name)} />
      )}
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
