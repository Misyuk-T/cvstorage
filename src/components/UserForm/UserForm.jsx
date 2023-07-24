import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createUser, deleteUser, updateUser } from "@/actions/user";
import schema from "@/helpers/userValidation";
import {
  cvTypeOptions,
  gradeOptions,
  workDirectionOptions,
} from "@/components/UserForm/mocks";

import FileUploadField from "./components/FileUploadField";
import TechnologyField from "@/components/ProjectForm/components/TechnologyField";
import ReactSelectField from "@/components/UserForm/components/ReactSelectField";
import ProjectField from "./components/ProjectField";
import EducationField from "./components/EducationField";
import ExperienceField from "./components/ExperienceField";
import SocialField from "./components/SocialField";
import FormField from "./components/FormField";

const defaultValues = {
  name: "",
  position: "",
  email: "",
  technologyStack: [],
  description: "",
  isEnabled: false,
  cvType: "",
  motivation: "",
  grade: "",
  workDirection: "",
};

const UserForm = ({
  technologies,
  projects,
  initialValues = defaultValues,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    setError(null);
    console.log(data);

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
        if (key === "media" && updatedData[key] === null) continue;

        if (Array.isArray(updatedData[key])) {
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
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <Stack
          w="100%"
          px={10}
          pt={3}
          borderRadius={5}
          border="2px solid"
          borderColor="gray.200"
          position="relative"
        >
          <Text
            fontSize={16}
            backgroundColor="white"
            position="absolute"
            top={-4}
            p={1}
            px={2}
            fontWeight={600}
          >
            System information
          </Text>
          <Flex
            py={5}
            w="100%"
            gap={5}
            alignItems="center"
            justifyContent="space-between"
          >
            <ReactSelectField
              control={control}
              name="grade"
              label="Grade"
              options={gradeOptions}
              defaultValue={gradeOptions[0].value}
            />

            <ReactSelectField
              control={control}
              name="workDirection"
              label="Work Direction"
              options={workDirectionOptions}
              defaultValue={workDirectionOptions[0].value}
            />

            <ReactSelectField
              control={control}
              name="cvType"
              label="CV Type"
              options={cvTypeOptions}
              defaultValue={cvTypeOptions[0].value}
            />

            <FormControl
              id="isEnabled"
              isInvalid={errors.isEnabled}
              width="fit-content"
            >
              <FormLabel whiteSpace="nowrap">Active</FormLabel>
              <Switch
                id="isEnabled"
                defaultChecked={initialValues?.isEnabled || true}
                {...register("isEnabled")}
              />
              {errors.isEnabled && (
                <FormErrorMessage>{errors.isEnabled.message}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Stack>
        <Flex gap={10} alignItems="flex-start">
          <Box mt="12px">
            <FileUploadField
              name="media"
              register={register}
              onChange={handleFileChange}
              imagePreview={imagePreview}
            />
          </Box>

          <Stack justifyContent="space-between" w="100%" gap={5}>
            <Flex gap={5} w="100%">
              <FormField
                name="name"
                label="Name"
                register={register}
                errors={errors}
                isRequired
                placeHolder="John Smith"
              />

              <FormField
                name="email"
                label="Email"
                register={register}
                errors={errors}
                isRequired
                placeHolder="example@exm.com"
              />

              <FormField
                name="position"
                label="Position"
                register={register}
                errors={errors}
                isRequired
                placeHolder="JS React developer"
              />
            </Flex>

            <TechnologyField
              control={control}
              technologyOptions={technologies}
              errors={errors}
            />
          </Stack>
        </Flex>
        <FormField
          name="description"
          label="Description"
          register={register}
          errors={errors}
          isTextarea={true}
          placeHolder="Short information about user"
          isRequired
        />

        <Stack gap={8} mt={5}>
          <FormControl
            id="socials"
            isInvalid={errors.socials}
            isRequired={socialsFields.length > 0}
          >
            <Stack
              gap={5}
              p={5}
              borderRadius={5}
              border="2px solid"
              borderColor="gray.200"
              position="relative"
            >
              <FormLabel
                fontSize={16}
                backgroundColor="white"
                position="absolute"
                top={-4}
                p={1}
                px={2}
                fontWeight={600}
              >
                Socials Block
              </FormLabel>

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

              <Button onClick={() => appendSocial({ platform: "", url: "" })}>
                Add Social Item
              </Button>
            </Stack>

            {errors.socials && (
              <FormErrorMessage>{errors.socials.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            id="experience"
            isInvalid={errors.experience}
            isRequired={experienceFields.length > 0}
          >
            <Stack
              gap={5}
              p={5}
              position="relative"
              borderRadius={5}
              border="2px solid"
              borderColor="gray.200"
            >
              <FormLabel
                fontSize={16}
                backgroundColor="white"
                position="absolute"
                top={-4}
                p={1}
                px={2}
                fontWeight={600}
              >
                Experience Block
              </FormLabel>
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
              <Button
                onClick={() =>
                  appendExperience({
                    companyName: "",
                    timePeriod: "",
                    description: "",
                  })
                }
              >
                Add Experience Item
              </Button>
            </Stack>

            {errors.experience && (
              <FormErrorMessage>{errors.experience.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            id="education"
            isInvalid={errors.education}
            isRequired={educationFields.length > 0}
          >
            <Stack
              gap={5}
              p={5}
              borderRadius={5}
              border="2px solid"
              position="relative"
              borderColor="gray.200"
            >
              <FormLabel
                fontSize={16}
                backgroundColor="white"
                position="absolute"
                top={-4}
                p={1}
                px={2}
                fontWeight={600}
              >
                Education Block
              </FormLabel>
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

              <Button
                onClick={() => appendEducation({ rank: "", description: "" })}
              >
                Add Education Item
              </Button>
            </Stack>

            {errors.education && (
              <FormErrorMessage>{errors.education.message}</FormErrorMessage>
            )}
          </FormControl>

          <Stack
            gap={5}
            p={5}
            borderRadius={5}
            position="relative"
            border="2px solid"
            borderColor="gray.200"
          >
            <FormControl
              isRequired={projectFields.length > 0}
              position="absolute"
              top={-4}
              p={1}
              px={2}
              width="fit-content"
              backgroundColor="white"
              m={0}
            >
              <FormLabel fontSize={16} m={0} fontWeight={600}>
                Projects Block
              </FormLabel>
            </FormControl>

            {projectFields.map((field, index) => (
              <ProjectField
                key={field.id}
                index={index}
                control={control}
                register={register}
                setValue={setValue}
                value={getValues(`projects[${index}].projectId`)}
                errors={errors?.projects?.[index]}
                removeProject={removeProject}
                projects={projects}
              />
            ))}
            <Button onClick={() => appendProject({})}>Add Project Item</Button>
          </Stack>
        </Stack>

        <FormField
          name="motivation"
          label="Motivation"
          register={register}
          errors={errors}
          isTextarea={true}
          placeHolder="..."
        />

        <Flex mt={5} gap={5}>
          {initialValues.id && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleDelete}
              isLoading={isLoading}
              width={initialValues.id ? "calc(50% - 10px)" : "100%"}
              loadingText="Deleting"
            >
              Delete
            </Button>
          )}

          <Button
            type="submit"
            width={initialValues.id ? "calc(50% - 10px)" : "100%"}
            colorScheme="green"
            isLoading={isLoading}
            loadingText="Submitting"
          >
            {initialValues.id ? "Update CV" : "Save CV"}
          </Button>
        </Flex>

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
