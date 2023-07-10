import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Button } from "@chakra-ui/react";

import { createProject } from "@/actions/projects";
import schema from "@/helpers/projectValidation";

import FormField from "@/components/UserForm/components/FormField";

const ProjectForm = ({ onProjectCreated }) => {
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

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const createdProject = await createProject(data);
      reset();
      onProjectCreated(createdProject);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="projectName"
        label="Project Name"
        register={register}
        errors={errors}
      />

      <FormField
        name="technologyStack"
        label="Technology Stack"
        register={register}
        errors={errors}
      />

      <FormField
        name="description"
        label="Description"
        register={register}
        errors={errors}
        isTextarea={true}
      />

      <Button type="submit" isLoading={isLoading} loadingText="Creating">
        Create Project
      </Button>

      {error && (
        <Box color="red.500" mt={4}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default ProjectForm;
