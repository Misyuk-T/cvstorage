import {
  Input,
  FormErrorMessage,
  Flex,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const EducationField = ({
  index,
  field,
  removeEducation,
  register,
  errors,
}) => {
  const rankError = errors?.education?.[index]?.rank;
  const descriptionError = errors?.education?.[index]?.description;

  const existingError = rankError || descriptionError;

  const handleRemove = () => {
    removeEducation(index);
  };

  return (
    <Stack>
      <Flex key={field.id} gap={3} mb={3}>
        <Input
          type="text"
          name={`education[${index}].rank`}
          placeholder="Rank"
          {...register(`education[${index}].rank`)}
          isInvalid={rankError}
          isRequired
        />

        <Input
          type="text"
          name={`education[${index}].description`}
          placeholder="Description"
          {...register(`education[${index}].description`)}
          isInvalid={descriptionError}
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

export default EducationField;
