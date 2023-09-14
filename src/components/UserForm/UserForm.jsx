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
import SocialField from "./components/SocialField";
import FormField from "./components/FormField";
import UserTechnologyStackField from "@/components/UserForm/components/UserTechnologyStackField";

const defaultValues = {
  name: "",
  position: "",
  experience: "",
  description: "",
  isEnabled: 1,
  cvType: cvTypeOptions[0].value,
  grade: "",
  workDirection: "",
  socials: [],
  projects: [],
  softSkills: [],
  languages: [],
  hardSkills: [],
  experienceSkills: [],
};

const getFilteredSkills = (type, technologies) => {
  return technologies.filter((item) => {
    return item.type === type;
  });
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

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState();

  const {
    fields: socialsFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socials",
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
    fields: softSkillsFields,
    append: appendSoftSkill,
    remove: removeSoftSkill,
  } = useFieldArray({
    control,
    name: "softSkills",
  });

  const {
    fields: languagesFields,
    append: appendLanguageSkill,
    remove: removeLanguageSkill,
  } = useFieldArray({
    control,
    name: "languages",
  });

  const {
    fields: hardSkillsFields,
    append: appendHardSkill,
    remove: removeHardSkill,
  } = useFieldArray({
    control,
    name: "hardSkills",
  });

  const {
    fields: experienceSkillsFields,
    append: appendExperienceSkill,
    remove: removeExperienceSkill,
  } = useFieldArray({
    control,
    name: "experienceSkills",
  });

  const handleSelectSkill = (type) => {
    const selectedSkills = getValues(type);

    const availSkills = technologies.filter((tech) =>
      selectedSkills.every(
        (selectedTech) => selectedTech.technologyId !== tech.id.toString(),
      ),
    );

    setAvailableSkills(availSkills);
  };

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    try {
      if (initialValues.id) {
        await updateUser(initialValues.id, data).then((data) => {
          updateStoreUser({ ...data, id: +data.id });
        });
      } else {
        await createUser(data).then((data) => {
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
                  name="experience"
                  label="Experience"
                  register={register}
                  errors={errors}
                  placeHolder="2 years 6 month"
                  isRequired
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
                placeHolder="Information about user"
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
                Links
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
                Add Link Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="hardSkills"
            isInvalid={errors.hardSkills}
            isRequired={hardSkillsFields.length > 0}
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
                Hard Skills
              </FormLabel>

              {hardSkillsFields.length && (
                <Flex flexWrap="wrap" gap={5}>
                  {hardSkillsFields.map((field, index) => (
                    <UserTechnologyStackField
                      key={field.id}
                      control={control}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      removeTechnologies={() => removeHardSkill(index)}
                      onSelect={handleSelectSkill}
                      technologies={getFilteredSkills(
                        "hardSkill",
                        availableSkills || technologies,
                        getValues("hardSkills"),
                      )}
                      skillsType="hardSkills"
                      index={index}
                      value={field}
                    />
                  ))}
                </Flex>
              )}

              <Button
                size="sm"
                onClick={() => {
                  appendHardSkill({ technologyId: "", level: 50 });
                }}
              >
                Add Hard Skill Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="experienceSkills"
            isInvalid={errors.experienceSkills}
            isRequired={experienceSkillsFields.length > 0}
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
                Experience Skills
              </FormLabel>

              {experienceSkillsFields.length && (
                <Flex flexWrap="wrap" gap={5}>
                  {experienceSkillsFields.map((field, index) => (
                    <UserTechnologyStackField
                      key={field.id}
                      control={control}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      skillsType="experienceSkills"
                      removeTechnologies={() => removeExperienceSkill(index)}
                      onSelect={handleSelectSkill}
                      technologies={getFilteredSkills(
                        "hardSkill",
                        availableSkills || technologies,
                        getValues("experienceSkills"),
                      )}
                      index={index}
                      value={field}
                    />
                  ))}
                </Flex>
              )}

              <Button
                size="sm"
                onClick={() => {
                  appendExperienceSkill({ technologyId: "", level: 50 });
                }}
              >
                Add Experience Skill Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="languages"
            isInvalid={errors.languages}
            isRequired={languagesFields.length > 0}
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
                Languages
              </FormLabel>

              {languagesFields.length && (
                <Flex flexWrap="wrap" gap={5}>
                  {languagesFields.map((field, index) => (
                    <UserTechnologyStackField
                      key={field.id}
                      control={control}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      onSelect={handleSelectSkill}
                      removeTechnologies={() => removeLanguageSkill(index)}
                      technologies={getFilteredSkills(
                        "language",
                        availableSkills || technologies,
                        getValues("languages"),
                      )}
                      skillsType="languages"
                      index={index}
                      value={field}
                      showSlider
                    />
                  ))}
                </Flex>
              )}

              <Button
                size="sm"
                onClick={() => {
                  appendLanguageSkill({ technologyId: "", level: 50 });
                }}
              >
                Add Language Item
              </Button>
            </Stack>
          </FormControl>

          <FormControl
            id="softSkills"
            isInvalid={errors.softSkills}
            isRequired={softSkillsFields.length > 0}
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
                Soft Skills
              </FormLabel>

              {softSkillsFields.length && (
                <Flex flexWrap="wrap" gap={5}>
                  {softSkillsFields.map((field, index) => (
                    <UserTechnologyStackField
                      key={field.id}
                      control={control}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      onSelect={handleSelectSkill}
                      removeTechnologies={() => removeSoftSkill(index)}
                      technologies={getFilteredSkills(
                        "softSkill",
                        availableSkills || technologies,
                        getValues("softSkills"),
                      )}
                      skillsType="softSkills"
                      index={index}
                      value={field}
                    />
                  ))}
                </Flex>
              )}

              <Button
                size="sm"
                onClick={() => {
                  appendSoftSkill({ technologyId: "", level: 50 });
                }}
              >
                Add Soft Skill Item
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
                Projects
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
