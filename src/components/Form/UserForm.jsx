import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

import { createUser, updateUser, deleteUser } from "@/actions/user";
import { schema } from "@/helpers/userValidation";

import FormField from "./components/FormField";
import SocialField from "./components/SocialField";
import EducationField from "./components/EducationField";
import ExperienceField from "./components/ExperienceField";

const UserForm = ({ initialValues = {}, onSubmit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
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

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    setError(null);

    console.log(data, "data");

    try {
      if (initialValues.id) {
        await updateUser(initialValues.id, data);
      } else {
        await createUser(data);
      }
      setIsLoading(false);
      //  onSubmit(result);
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

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <FormField
          name="name"
          label="Name"
          register={register}
          errors={errors}
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
        />

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
