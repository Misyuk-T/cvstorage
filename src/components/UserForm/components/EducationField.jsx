import { Box, Button, Input, FormErrorMessage } from "@chakra-ui/react";

const EducationField = ({
  index,
  field,
  removeEducation,
  register,
  errors,
}) => {
  const rankError = errors?.education?.[index]?.rank;
  const descriptionError = errors?.education?.[index]?.description;

  return (
    <Box key={field.id}>
      <Input
        type="text"
        name={`education[${index}].rank`}
        placeholder="Rank"
        {...register(`education[${index}].rank`)}
        isInvalid={rankError}
      />

      {rankError && <FormErrorMessage>{rankError.message}</FormErrorMessage>}
      <Input
        type="text"
        name={`education[${index}].description`}
        placeholder="Description"
        {...register(`education[${index}].description`)}
        isInvalid={descriptionError}
      />

      {descriptionError && (
        <FormErrorMessage>{descriptionError.message}</FormErrorMessage>
      )}
      <Button onClick={() => removeEducation(index)}>Remove</Button>
    </Box>
  );
};

export default EducationField;
