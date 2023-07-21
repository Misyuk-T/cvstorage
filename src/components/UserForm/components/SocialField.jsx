import {
  Input,
  FormErrorMessage,
  Flex,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const SocialField = ({ index, field, removeSocial, register, errors }) => {
  const platformError = errors?.socials?.[index]?.platform;
  const urlError = errors?.socials?.[index]?.url;
  const existingError = platformError || urlError;

  const handleRemove = () => {
    removeSocial(index);
  };

  return (
    <Stack key={field.id}>
      <Flex w="100%" gap={3} mb={3}>
        <Input
          type="text"
          name={`socials[${index}].platform`}
          placeholder="Platform"
          {...register(`socials[${index}].platform`)}
          isInvalid={platformError}
          borderColor="gray.300"
          isRequired
        />

        <Input
          type="text"
          name={`socials[${index}].url`}
          placeholder="URL"
          {...register(`socials[${index}].url`)}
          isInvalid={urlError}
          borderColor="gray.300"
          isRequired
        />

        <IconButton
          colorScheme="red"
          flexShrink={0}
          onClick={handleRemove}
          icon={<DeleteIcon />}
          aria-label="delete"
        />
      </Flex>

      {existingError && (
        <FormErrorMessage>{existingError.message}</FormErrorMessage>
      )}
    </Stack>
  );
};

export default SocialField;
