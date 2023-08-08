import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Switch,
} from "@chakra-ui/react";

import useProjectsStore from "@/store/projectsStore";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/actions/projects";
import schema from "@/helpers/projectValidation";

import FormField from "@/components/UserForm/components/FormField";
import TechnologyField from "./components/TechnologyField";

const defaultValues = {
  projectName: "",
  teamSize: 0,
  link: "",
  nda: false,
  description: "",
  technologyStack: [],
};

const ProjectForm = ({ initialValues, technologies, onComplete }) => {
  const {
    addProject: addStoreProject,
    updateProject: updateStoreProject,
    deleteProject: deleteStoreProject,
  } = useProjectsStore();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || defaultValues,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const transformedTechnologies = data.technologyStack.map(
      (technology) => technology.value,
    );

    console.log(data.nda);

    const updatedData = {
      ...data,
      nda: data.nda ? 1 : 0,
      technologyStack: transformedTechnologies,
      teamSize: parseInt(data.teamSize),
    };

    if (initialValues) {
      await updateProject(initialValues.id, updatedData).then((data) => {
        updateStoreProject({ ...data, id: +data.id });
      });
    } else {
      await createProject(updatedData).then((data) => {
        addStoreProject(data);
      });
    }

    onComplete && onComplete();
    reset();
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await deleteProject(initialValues.id).then((data) => {
      deleteStoreProject(+data.id);
    });
    reset();
    onComplete && onComplete();

    setIsLoading(false);
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  console.log(getValues("nda"), 'getValues("nda")');

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

        <Flex gap={5}>
          <Box w="100%">
            <FormField
              name="link"
              label="Project Link"
              register={register}
              placeHolder="Link"
              errors={errors}
              isRequired
            />
          </Box>

          <FormField
            name="teamSize"
            label="Team Size"
            register={register}
            placeHolder="Team Size"
            errors={errors}
            type="number"
            isRequired
          />

          <FormControl id="nda" w="min-content">
            <Stack alignItems="flex-end" justifyContent="flex-end">
              <FormLabel whiteSpace="nowrap" m={0}>
                NDA
              </FormLabel>
              <Switch mt={2} id="nda" {...register("nda")} />
            </Stack>
          </FormControl>
        </Flex>

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
