import { Box, Button, Input, FormErrorMessage } from "@chakra-ui/react";

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

  return (
    <Box key={field.id}>
      <Input
        type="text"
        name={`experience[${index}].companyName`}
        placeholder="Company Name"
        {...register(`experience[${index}].companyName`)}
        isInvalid={companyNameError}
      />
      {companyNameError && (
        <FormErrorMessage>{companyNameError.message}</FormErrorMessage>
      )}

      <Input
        type="text"
        name={`experience[${index}].timePeriod`}
        placeholder="Time Period"
        {...register(`experience[${index}].timePeriod`)}
        isInvalid={timePeriodError}
      />
      {timePeriodError && (
        <FormErrorMessage>{timePeriodError.message}</FormErrorMessage>
      )}

      <Input
        type="text"
        name={`experience[${index}].description`}
        placeholder="Description"
        {...register(`experience[${index}].description`)}
        isInvalid={descriptionError}
      />
      {descriptionError && (
        <FormErrorMessage>{descriptionError.message}</FormErrorMessage>
      )}
      <Button onClick={() => removeExperience(index)}>Remove</Button>
    </Box>
  );
};

export default ExperienceField;
