import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

const FormField = ({ name, label, register, errors, isTextarea = false }) => {
  return (
    <FormControl id={name} isRequired isInvalid={errors && errors[name]}>
      <FormLabel>{label}</FormLabel>
      {isTextarea ? (
        <Textarea type="text" name={name} {...register(name)} />
      ) : (
        <Input type="text" name={name} {...register(name)} />
      )}
      {errors && <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;
