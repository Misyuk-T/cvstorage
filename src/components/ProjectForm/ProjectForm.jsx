import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@chakra-ui/react";

import { createProject } from "@/actions/projects";
import { getAllTechnologies } from "@/actions/technologies";
import schema from "@/helpers/projectValidation";

import FormField from "@/components/UserForm/components/FormField";
import TechnologyField from "./components/TechnologyField";

const ProjectForm = ({ onProjectCreated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [technologyOptions, setTechnologyOptions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      technologyStack: [],
    },
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
      const createdProject = await createProject(updatedData);
      reset();
      onProjectCreated(createdProject);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchTechnologyOptions = async () => {
      try {
        const technologies = await getAllTechnologies();
        const options = technologies.map((technology) => ({
          value: technology.id,
          label: technology.name,
        }));
        setTechnologyOptions(options);
      } catch (error) {
        console.error("Error fetching technology options:", error);
      }
    };

    fetchTechnologyOptions();
  }, []);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="projectName"
        label="Project Name"
        register={register}
        errors={errors}
      />

      <TechnologyField
        control={control}
        register={register}
        technologyOptions={technologyOptions}
      />

      <FormField
        name="description"
        label="Description"
        register={register}
        errors={errors}
        isTextarea={true}
      />

      <Button
        isDisabled={!isValid}
        type="submit"
        isLoading={isLoading}
        loadingText="Creating"
      >
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
