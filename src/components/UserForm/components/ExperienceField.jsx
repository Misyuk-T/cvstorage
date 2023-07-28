import {
  Input,
  Flex,
  Stack,
  Textarea,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const ExperienceField = ({
  index,
  field,
  removeExperience,
  register,
  errors,
}) => {
  const companyNameError = errors?.experience?.[index]?.companyName;
  const timePeriodError = errors?.experience?.[index]?.timePeriod;
  const descriptionError = errors?.experience?.[index]?.description;
  const existingError = descriptionError || timePeriodError || companyNameError;

  const handleRemove = () => {
    removeExperience(index);
  };

  return (
    <Stack key={field.id} mb={3}>
      <Flex gap={3} w="100%">
        <Stack gap={3} w="100%">
          <Flex gap={3}>
            <Input
              type="text"
              name={`experience[${index}].companyName`}
              placeholder="Company Name"
              {...register(`experience[${index}].companyName`)}
              isInvalid={companyNameError}
              isRequired
            />

            <Input
              type="text"
              name={`experience[${index}].timePeriod`}
              placeholder="Time Period"
              {...register(`experience[${index}].timePeriod`)}
              isInvalid={timePeriodError}
              isRequired
            />
          </Flex>

          <Textarea
            type="text"
            name={`experience[${index}].description`}
            placeholder="Description"
            {...register(`experience[${index}].description`)}
            isInvalid={descriptionError}
          />
        </Stack>

        <IconButton
          colorScheme="red"
          icon={<DeleteIcon />}
          flexShrink={0}
          onClick={handleRemove}
          aria-label="delete"
        />
      </Flex>

      {existingError && (
        <Text color="red" fontSize="sm">
          {existingError.message}
        </Text>
      )}
    </Stack>
  );
};

export default ExperienceField;
