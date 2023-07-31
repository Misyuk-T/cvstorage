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

    const transformedTechnologies = data.technologyStack.map(
      (technology) => technology.value,
    );
    const updatedData = {
      ...data,
      technologyStack: transformedTechnologies,
    };

    if (initialValues) {
      await updateProject(initialValues.id, updatedData);
    } else {
      await createProject(updatedData);
    }

    onComplete && onComplete();
    reset();
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteProject(initialValues.id);
    reset();
    onComplete && onComplete();

    setIsLoading(false);
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
          placeHolder="Name"
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
          label="Project Description"
          register={register}
          errors={errors}
          isTextarea={true}
          placeHolder="Description"
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
            Delete Project
          </Button>
        )}

        <Button
          isDisabled={!isValid || !isDirty}
          type="submit"
          isLoading={isLoading}
          loadingText="Creating"
          colorScheme="green"
        >
          {initialValues ? "Update Project" : "Create Project"}
        </Button>
      </Flex>
    </Box>
  );
};

export default ProjectForm;
