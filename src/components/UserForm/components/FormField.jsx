import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

const FormField = ({
  name,
  label,
  register,
  errors,
  placeHolder,
  isTextarea = false,
  isRequired,
  type = "text",
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
          type={type}
          name={name}
          resize="block"
          size="sm"
          {...register(name)}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeHolder}
          name={name}
          size="sm"
          {...register(name)}
        />
      )}
      {errors && (
        <Text color="red" fontSize="sm">
          {errors[name]?.message}
        </Text>
      )}
    </FormControl>
  );
};

export default FormField;
