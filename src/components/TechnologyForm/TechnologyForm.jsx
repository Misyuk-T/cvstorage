import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Stack, Box, Flex } from "@chakra-ui/react";

import {
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/actions/technologies";
import schema from "@/helpers/technologyValidation";

import FormField from "@/components/UserForm/components/FormField";

const TechnologyForm = ({ initialValues, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {},
  });

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      if (initialValues) {
        await updateTechnology(initialValues.id, data.name);
      } else {
        await createTechnology(data);
      }
      onComplete && onComplete();
      setIsLoading(false);
      reset();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteTechnology(initialValues.id);
      setIsLoading(false);
      reset();
      onComplete && onComplete();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <FormField
          name="name"
          label="Technology Name"
          register={register}
          errors={errors}
          placeHolder="React development"
          isRequired
        />

        <Flex gap={10} justifyContent="flex-end">
          {initialValues && (
            <Button
              colorScheme="red"
              onClick={handleDelete}
              variant="outline"
              isLoading={isLoading}
            >
              Delete Technology
            </Button>
          )}

          <Button
            type="submit"
            isDisabled={!isValid || !isDirty}
            isLoading={isLoading}
            loadingText="Submitting"
          >
            {initialValues ? "Update Technology" : "Create Technology"}
          </Button>
        </Flex>

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
