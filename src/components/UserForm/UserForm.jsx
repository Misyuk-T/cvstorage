import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Switch,
} from "@chakra-ui/react";

import { getAllProjects } from "@/actions/projects";
import { createUser, updateUser, deleteUser } from "@/actions/user";
import { getAllTechnologies } from "@/actions/technologies";
import schema from "@/helpers/userValidation";

import FormField from "./components/FormField";
import SocialField from "./components/SocialField";
import EducationField from "./components/EducationField";
import ExperienceField from "./components/ExperienceField";
import ProjectField from "./components/ProjectField";
import FileUploadField from "./components/FileUploadField";
import TechnologyField from "@/components/ProjectForm/components/TechnologyField";

const initialValues = {
  name: "",
  position: "",
  email: "",
  socials: [],
  technologyStack: [],
  description: "",
  isEnabled: false,
  experience: [],
  education: [],
  projects: [],
};
const objectValues = ["experience", "projects", "education", "socials"];

const UserForm = ({ onSubmit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [technologyOptions, setTechnologyOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const {
    fields: socialsFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socials",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const handleFileChange = (name, file) => {
    setSelectedFile({ name, file });
  };

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    setError(null);

    const transformedTechnologies = data.technologyStack.map(
      (technology) => technology.value,
    );
    const updatedData = {
      ...data,
      technologyStack: JSON.stringify(transformedTechnologies),
      media: selectedFile ? selectedFile.file : null,
    };

    try {
      const formData = new FormData();
      for (const key in updatedData) {
        if (objectValues.includes(key)) {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      }

      if (initialValues.id) {
        await updateUser(initialValues.id, formData);
      } else {
        await createUser(formData);
      }
      setIsLoading(false);
      // onSubmit(result);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deleteUser(initialValues.id);
      setIsLoading(false);
      //  onDelete(initialValues.id);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const projects = await getAllProjects();
      const options = projects.map((project) => ({
        value: project.id,
        label: project.projectName,
        stackTechnologies: project.technologyStack,
        description: project.description,
        achievements: "",
      }));
      setProjectOptions(options);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

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

  useEffect(() => {
    fetchProjects();
    fetchTechnologyOptions();
  }, []);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <FormField
          name="name"
          label="Name"
          register={register}
          errors={errors}
        />

        <FileUploadField
          name="media"
          register={register}
          onChange={handleFileChange}
        />

        <FormField
          name="email"
          label="Email"
          register={register}
          errors={errors}
        />
        <FormField
          name="position"
          label="Position"
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

        <TechnologyField
          control={control}
          technologyOptions={technologyOptions}
          errors={errors}
        />

        <FormControl id="isEnabled" isInvalid={errors.isEnabled}>
          <FormLabel>Enabled</FormLabel>
          <Switch
            id="isEnabled"
            defaultChecked={initialValues?.isEnabled || false}
            {...register("isEnabled")}
          />
          {errors.isEnabled && (
            <FormErrorMessage>{errors.isEnabled.message}</FormErrorMessage>
          )}
        </FormControl>

        {projectFields.map((field, index) => (
          <ProjectField
            key={field.id}
            index={index}
            control={control}
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors?.projects?.[index]}
            removeProject={removeProject}
            projectOptions={projectOptions}
          />
        ))}

        <Button onClick={() => appendProject({})}>Add Project</Button>

        <FormControl id="socials" isInvalid={errors.socials}>
          <FormLabel>Socials</FormLabel>
          <Stack spacing={2}>
            {socialsFields.map((field, index) => (
              <SocialField
                key={field.id}
                index={index}
                field={field}
                removeSocial={removeSocial}
                register={register}
                errors={errors}
              />
            ))}
          </Stack>
          <Button onClick={() => appendSocial({ platform: "", url: "" })}>
            Add Social
          </Button>
          {errors.socials && (
            <FormErrorMessage>{errors.socials.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="experience" isInvalid={errors.experience}>
          <FormLabel>Experience</FormLabel>
          <Stack spacing={2}>
            {experienceFields.map((field, index) => (
              <ExperienceField
                key={field.id}
                index={index}
                field={field}
                removeExperience={removeExperience}
                register={register}
                errors={errors}
              />
            ))}
          </Stack>
          <Button
            onClick={() =>
              appendExperience({
                companyName: "",
                timePeriod: "",
                description: "",
              })
            }
          >
            Add Experience
          </Button>
          {errors.experience && (
            <FormErrorMessage>{errors.experience.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="education" isInvalid={errors.education}>
          <FormLabel>Education</FormLabel>
          <Stack spacing={2}>
            {educationFields.map((field, index) => (
              <EducationField
                key={field.id}
                index={index}
                field={field}
                removeEducation={removeEducation}
                register={register}
                errors={errors}
              />
            ))}
          </Stack>
          <Button
            onClick={() => appendEducation({ rank: "", description: "" })}
          >
            Add Education
          </Button>
          {errors.education && (
            <FormErrorMessage>{errors.education.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" isLoading={isLoading} loadingText="Submitting">
          Save
        </Button>

        {initialValues.id && (
          <Button
            colorScheme="red"
            onClick={handleDelete}
            isLoading={isLoading}
            loadingText="Deleting"
          >
            Delete
          </Button>
        )}

        {error && (
          <Box color="red.500" mt={4}>
            {error}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default UserForm;
