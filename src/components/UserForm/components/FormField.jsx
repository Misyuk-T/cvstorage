import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

const FormField = ({
  name,
  label,
  register,
  errors,
  placeHolder,
  isTextarea = false,
  isRequired,
}) => {
  return (
    <FormControl
      id={name}
      isRequired={isRequired}
      isInvalid={errors && errors[name]}
    >
      <FormLabel fontWeight={600}>{label}</FormLabel>
      {isTextarea ? (
        <Textarea
          placeholder={placeHolder}
          type="text"
          name={name}
          resize="block"
          {...register(name)}
        />
      ) : (
        <Input
          type="text"
          placeholder={placeHolder}
          name={name}
          {...register(name)}
        />
      )}
      {errors && <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;
