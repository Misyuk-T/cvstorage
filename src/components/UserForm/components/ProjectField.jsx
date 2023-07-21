import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import {
  FormErrorMessage,
  FormControl,
  Textarea,
  Flex,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { transformProjectsToSelect } from "@/helpers/transformData";

const ProjectField = ({
  control,
  register,
  setValue,
  getValues,
  errors,
  removeProject,
  projects,
  index,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const formattedOptions = transformProjectsToSelect(projects);

  const handleProjectSelect = (selectedOption) => {
    setSelectedProject(selectedOption);
    setValue(`projects[${index}].projectId`, selectedOption?.value);
  };

  const handleDeleteProject = () => {
    removeProject(index);
    setSelectedProject(null);
  };

  useEffect(() => {
    const projects = getValues("projects");
    const selectedProjectId = projects[index]?.projectId;
    const selectedProject = formattedOptions.find(
      (project) => project.value === selectedProjectId,
    );
    setSelectedProject(selectedProject);
  }, [formattedOptions, index, getValues]);

  return (
    <FormControl
      id={`projects[${index}]`}
      isInvalid={errors?.projects?.[index]}
      mb={4}
    >
      <Flex gap={3}>
        <Stack w="100%" gap={3}>
          <Controller
            name={`projects[${index}].projectId`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={formattedOptions}
                value={selectedProject}
                onChange={(selectedOption) =>
                  handleProjectSelect(selectedOption)
                }
                isClearable
                placeholder="Select a project"
              />
            )}
          />

          <Textarea
            {...register(`projects[${index}].achievements`)}
            placeholder="Achievements"
            isRequired
            // defaultValue={selectedProject.achievements}
          />
        </Stack>
        <IconButton
          colorScheme="red"
          flexShrink={0}
          onClick={handleDeleteProject}
          icon={<DeleteIcon />}
          aria-label="delete"
        />
      </Flex>

      {errors?.projects?.[index] && (
        <FormErrorMessage>
          {errors?.projects[index]?.projectId?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default ProjectField;
