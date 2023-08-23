import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Stack, Flex } from "@chakra-ui/react";

import {
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "@/actions/technologies";
import useTechnologiesStore from "@/store/technologiesStore";
import schema from "@/helpers/technologyValidation";
import { technologyTypes } from "@/helpers/constants";

import FormField from "@/components/UserForm/components/FormField";
import ReactSelectField from "@/components/UserForm/components/ReactSelectField";

const defaultValues = {
  name: "",
  type: "hardSkill",
};

const TechnologyForm = ({ initialValues = defaultValues, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || {},
  });

  const {
    addTechnology: addStoreTechnology,
    updateTechnology: updateStoreTechnology,
    deleteTechnology: deleteStoreTechnology,
  } = useTechnologiesStore();

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    try {
      const { name, type } = data;

      if (initialValues.id) {
        await updateTechnology(initialValues.id, name, type).then((data) => {
          updateStoreTechnology({ ...data, id: +data.id });
        });
      } else {
        await createTechnology({ name, type }).then((data) => {
          addStoreTechnology(data);
        });
      }

      onComplete && onComplete();
      setIsLoading(false);
      reset({
        name: "",
        type,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);

    try {
      await deleteTechnology(initialValues.id).then((data) => {
        deleteStoreTechnology(+data.id);
      });

      setIsDeleteLoading(false);
      reset();
      onComplete && onComplete();
    } catch (error) {
      setIsDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Stack spacing={4}>
        <Flex gap={5}>
          <FormField
            name="name"
            label="Technology Name"
            register={register}
            errors={errors}
            placeHolder="Name"
            isRequired
          />

          <ReactSelectField
            name="type"
            label="Technology Type"
            control={control}
            errors={errors}
            options={technologyTypes}
            isRequired
          />
        </Flex>

        <Flex gap={10} justifyContent="flex-end">
          {initialValues.id && (
            <Button
              colorScheme="red"
              onClick={handleDelete}
              variant="outline"
              isLoading={isDeleteLoading}
              isDisabled={isLoading}
            >
              Delete Technology
            </Button>
          )}

          <Button
            type="submit"
            colorScheme="green"
            isDisabled={!isValid || !isDirty || isDeleteLoading}
            loadingText={initialValues.id ? "Updating" : "Creating"}
          >
            {initialValues.id ? "Update Technology" : "Create Technology"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};

export default TechnologyForm;
