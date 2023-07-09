import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const CustomInput = ({ name, label, register, errors }) => {
  return (
    <FormControl id={name} isRequired isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input type="text" name={name} {...register(name)} />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
