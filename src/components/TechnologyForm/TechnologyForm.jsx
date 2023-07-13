import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Stack, Box } from "@chakra-ui/react";

import { createTechnology } from "@/actions/technologies";
import schema from "@/helpers/technologyValidation";

import FormField from "@/components/UserForm/components/FormField";

const TechnologyForm = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await createTechnology(data);
      setIsLoading(false);
      reset();
      // onSubmit();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <FormField
          name="name"
          label="Technology Name"
          register={register}
          errors={errors}
        />

        <Button type="submit" isLoading={isLoading} loadingText="Submitting">
          Create Technology
        </Button>

        {error && (
          <Box color="red.500" mt={4}>
            {error}
          </Box>
        )}
      </Stack>
    </form>
  );
};

export default TechnologyForm;
