import { Box, Button, Input, FormErrorMessage } from "@chakra-ui/react";

const SocialField = ({ index, field, removeSocial, register, errors }) => {
  const platformError = errors?.socials?.[index]?.platform;
  const urlError = errors?.socials?.[index]?.url;

  return (
    <Box key={field.id}>
      <Input
        type="text"
        name={`socials[${index}].platform`}
        placeholder="Platform"
        {...register(`socials[${index}].platform`)}
        isInvalid={platformError}
      />

      {platformError && (
        <FormErrorMessage>{platformError.message}</FormErrorMessage>
      )}
      <Input
        type="text"
        name={`socials[${index}].url`}
        placeholder="URL"
        {...register(`socials[${index}].url`)}
        isInvalid={urlError}
      />

      {urlError && <FormErrorMessage>{urlError.message}</FormErrorMessage>}
      <Button onClick={() => removeSocial(index)}>Remove</Button>
    </Box>
  );
};

export default SocialField;
