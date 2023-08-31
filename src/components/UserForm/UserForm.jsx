import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useUsersStore from "@/store/usersStore";
import { createUser, deleteUser, updateUser } from "@/actions/user";
import schema from "@/helpers/userValidation";
import { scrollToTop } from "@/helpers/scrollTo";
import {
  cvTypeOptions,
  gradeOptions,
  workDirectionOptions,
} from "/src/helpers/constants";

import ReactSelectField from "@/components/UserForm/components/ReactSelectField";
import ProjectField from "./components/ProjectField";
import EducationField from "./components/EducationField";
import ExperienceField from "./components/ExperienceField";
import SocialField from "./components/SocialField";
import FormField from "./components/FormField";
import UserTechnologyStackField from "@/components/UserForm/components/UserTechnologyStackField";

const defaultValues = {
  name: "",
  position: "",
  email: "",
  description: "",
  isEnabled: 1,
  cvType: cvTypeOptions[0].value,
  motivation: "",
  grade: "",
  workDirection: "",
  socials: [],
  experience: [],
  education: [],
  projects: [],
  technologyStack: [],
};

const UserForm = ({
  technologies,
  projects,
  onComplete,
  initialValues = defaultValues,
}) => {
  const {
    addUser: addStoreUser,
    updateUser: updateStoreUser,
    deleteUser: deleteStoreUser,
  } = useUsersStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setValue,
    getValues,
    reset,
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

  const {
    fields: technologyFields,
    append: appendTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control,
    name: "technologyStack",
  });

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    const updatedData = {
      ...data,
    };

    try {
      const formData = new FormData();
      for (const key in updatedData) {
        if (Array.isArray(updatedData[key])) {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      }

      if (initialValues.id) {
        await updateUser(initialValues.id, formData).then((data) => {
          updateStoreUser({ ...data, id: +data.id });
        });
      } else {
        await createUser(formData).then((data) => {
          addStoreUser(data);
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    reset();
    scrollToTop();
    onComplete && onComplete();
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteUser(initialValues.id).then((data) => {
        deleteStoreUser(+data.id);
      });
      setIsDeleteLoading(false);
    } catch (error) {
      setIsDeleteLoading(false);
    }

    onComplete && onComplete();
  };

  useEffect(() => {
    reset({ ...initialValues, isEnabled: initialValues.isEnabled === 1 });
  }, [initialValues]);

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <Stack
          w="100%"
          px={10}
          pt={3}
          borderRadius={5}
          border="2px solid"
          borderColor="gray.300"
          position="relative"
        >
          <Text
            fontSize={17}
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
            py={4}
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
            />

            <ReactSelectField
              control={control}
              name="workDirection"
              label="Work Direction"
              options={workDirectionOptions}
            />

            <ReactSelectField
              control={control}
              name="cvType"
              label="CV Type"
              options={cvTypeOptions}
              defaultValue={cvTypeOptions[0]}
              disabled
            />

            <FormControl
              id="isEnabled"
              isInvalid={errors.isEnabled}
              width="100px"
            >
              <Stack width="100%" alignItems="center" justifyContent="center">
                <FormLabel whiteSpace="nowrap" mb={3}>
                  Active
                </FormLabel>
                <Switch pb={2} id="isEnabled" {...register("isEnabled")} />
              </Stack>
            </FormControl>
          </Flex>
        </Stack>

        <Stack
          w="100%"
          px={10}
          py={5}
          borderRadius={5}
          border="2px solid"
          borderColor="gray.300"
          position="relative"
        >
          <Text
            fontSize={17}
            backgroundColor="white"
            position="absolute"
            top={-4}
            p={1}
            px={2}
            fontWeight={600}
          >
            About
          </Text>
          <Flex gap={10} alignItems="flex-start">
            <Stack justifyContent="space-between" w="100%" gap={3}>
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

              <FormField
                name="description"
                label="Description"
                register={register}
                errors={errors}
                isTextarea={true}
                placeHolder="Short information about user"
                isRequired
              />
            </Stack>
          </Flex>
        </Stack>

        <Stack gap={8} mt={5}>
          <FormControl
            id="socials"
            isInvalid={errors.socials}
            isRequired={socialsFields.length > 0}
          >
            <Stack
              gap={3}
              p={5}
              pt={8}
              borderRadius={5}
              border="2px solid"
              borderColor="gray.300"
              position="relative"
            >
              <FormLabel
                fontSize={17}
                backgroundColor="white"
                position="absolute"
                top={-4}
                p={1}
                px={2}
                fontWeight={600}
              >
                information Block
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

              <Button
                size="sm"
                onClick={() => appendSocial({ platform: "", url: "" })}
              >
                Add information Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="technologyStack"
            isInvalid={errors.technologyStack}
            isRequired={technologyFields.length > 0}
          >
            <Stack
              gap={5}
              p={5}
              pt={8}
              borderRadius={5}
              border="2px solid"
              borderColor="gray.300"
              position="relative"
            >
              <FormLabel
                fontSize={17}
                backgroundColor="white"
                position="absolute"
                top={-4}
                p={1}
                px={2}
                fontWeight={600}
              >
                Technology Block
              </FormLabel>

              {technologyFields.length && (
                <Flex flexWrap="wrap" gap={5}>
                  {technologyFields.map((field, index) => (
                    <UserTechnologyStackField
                      key={field.id}
                      control={control}
                      selectedTechnologies={getValues("technologyStack")}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      removeTechnologies={() => removeTechnology(index)}
                      technologies={technologies}
                      index={index}
                      value={field}
                    />
                  ))}
                </Flex>
              )}

              <Button
                size="sm"
                onClick={() =>
                  appendTechnology({ technologyId: "", level: 50 })
                }
              >
                Add Technology Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="experience"
            isInvalid={errors.experience}
            isRequired={experienceFields.length > 0}
          >
            <Stack
              gap={5}
              p={5}
              pt={8}
              position="relative"
              borderRadius={5}
              border="2px solid"
              borderColor="gray.300"
            >
              <FormLabel
                fontSize={17}
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
                size="sm"
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
          </FormControl>

          <FormControl
            id="education"
            isInvalid={errors.education}
            isRequired={educationFields.length > 0}
          >
            <Stack
              gap={4}
              p={5}
              pt={8}
              borderRadius={5}
              border="2px solid"
              position="relative"
              borderColor="gray.300"
            >
              <FormLabel
                fontSize={17}
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
                size="sm"
                onClick={() => appendEducation({ rank: "", description: "" })}
              >
                Add Education Item
              </Button>
            </Stack>
          </FormControl>

          <Stack
            gap={5}
            p={5}
            pt={8}
            borderRadius={5}
            position="relative"
            border="2px solid"
            borderColor="gray.300"
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
              <FormLabel fontSize={17} m={0} fontWeight={600}>
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
                selectedProjects={getValues("projects")}
                projects={projects}
              />
            ))}
            <Button size="sm" onClick={() => appendProject({})}>
              Add Project Item
            </Button>
          </Stack>
        </Stack>

        <Stack
          gap={5}
          p={5}
          pt={6}
          borderRadius={5}
          border="2px solid"
          position="relative"
          borderColor="gray.300"
        >
          <FormLabel
            fontSize={17}
            backgroundColor="white"
            position="absolute"
            top={-4}
            p={1}
            px={2}
            fontWeight={600}
          >
            Achivements / Conclusion
          </FormLabel>
          <FormField
            name="motivation"
            register={register}
            errors={errors}
            isTextarea={true}
            placeHolder="Briefly explain motivation, career objectives or achivements"
          />
        </Stack>

        <Flex mt={5} gap={5}>
          {initialValues.id && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleDelete}
              isLoading={isDeleteLoading}
              width={initialValues.id ? "calc(50% - 10px)" : "100%"}
              isDisabled={isLoading}
            >
              Delete
            </Button>
          )}

          <Button
            type="submit"
            width={initialValues.id ? "calc(50% - 10px)" : "100%"}
            colorScheme="green"
            isLoading={isLoading}
            isDisabled={!isDirty || isDeleteLoading}
          >
            {initialValues.id ? "Update CV" : "Save CV"}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default UserForm;
