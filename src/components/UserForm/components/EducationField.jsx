import {
  Input,
  Flex,
  IconButton,
  Stack,
  Textarea,
  Text,
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
    <Flex gap={3} w="100%" key={field.id}>
      <Stack w="100%" align="center" justify="space-between">
        <Flex gap={3} w="100%">
          <Input
            size="sm"
            type="text"
            name={`education[${index}].rank`}
            placeholder="Title"
            {...register(`education[${index}].rank`)}
            isInvalid={rankError}
            isRequired
          />
          <Input
            size="sm"
            type="text"
            name={`education[${index}].timePeriod`}
            placeholder="Time Period"
            {...register(`education[${index}].timePeriod`)}
          />
        </Flex>
        <Textarea
          size="sm"
          name={`education[${index}].description`}
          placeholder="Description"
          {...register(`education[${index}].description`)}
          isInvalid={descriptionError}
          isRequired
        />
      </Stack>

      <IconButton
        size="sm"
        colorScheme="red"
        flexShrink={0}
        onClick={handleRemove}
        icon={<DeleteIcon />}
        aria-label="delete"
      />

      {existingError && (
        <Text color="red" fontSize="sm">
          {existingError.message}
        </Text>
      )}
    </Flex>
  );
};

export default EducationField;
