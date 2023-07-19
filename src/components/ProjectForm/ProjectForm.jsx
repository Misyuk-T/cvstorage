import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Button, Flex, Stack } from "@chakra-ui/react";

import {
  createProject,
  deleteProject,
  updateProject,
} from "@/actions/projects";
import schema from "@/helpers/projectValidation";

import FormField from "@/components/UserForm/components/FormField";
import TechnologyField from "./components/TechnologyField";

const ProjectForm = ({ initialValues, technologies, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {},
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    const transformedTechnologies = data.technologyStack.map(
      (technology) => technology.value,
    );
    const updatedData = {
      ...data,
      technologyStack: transformedTechnologies,
    };

    try {
      if (initialValues) {
        await updateProject(initialValues.id, updatedData);
      } else {
        await createProject(updatedData);
      }
      onComplete && onComplete();
      reset();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteProject(initialValues.id);
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
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={5}>
        <FormField
          name="projectName"
          label="Project Name"
          register={register}
          errors={errors}
          isRequired
        />

        <TechnologyField
          control={control}
          register={register}
          technologyOptions={technologies}
        />

        <FormField
          name="description"
          label="Description"
          register={register}
          errors={errors}
          isTextarea={true}
          isRequired
        />
      </Stack>

      <Flex justifyContent="flex-end" gap={10} mt={4}>
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
          isDisabled={!isValid || !isDirty}
          type="submit"
          isLoading={isLoading}
          loadingText="Creating"
        >
          {initialValues ? "Update Project" : "Create Project"}
        </Button>
      </Flex>

      {error && (
        <Box color="red.500" mt={4}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default ProjectForm;
