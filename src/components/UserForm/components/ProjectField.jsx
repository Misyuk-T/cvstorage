import { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import {
  FormControl,
  Textarea,
  Flex,
  Stack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { transformProjectsToSelect } from "@/helpers/transformData";

const getIntersectedProject = (id, projects) => {
  return projects.find((item) => item.id === +id);
};

const ProjectField = ({
  control,
  register,
  setValue,
  errors,
  removeProject,
  projects,
  index,
  value,
}) => {
  const initialProjects = getIntersectedProject(value, projects);
  const formattedData = initialProjects && {
    label: initialProjects.projectName,
    value: initialProjects.id.toString(),
  };

  const [selectedProject, setSelectedProject] = useState(formattedData);

  const formattedOptions = transformProjectsToSelect(projects);

  const handleProjectSelect = (selectedOption) => {
    setSelectedProject(selectedOption);
    setValue(`projects[${index}].projectId`, selectedOption?.value);
  };

  const handleDeleteProject = () => {
    removeProject(index);
    setSelectedProject(null);
  };

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
            defaultValue={selectedProject?.achievements}
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
        <Text color="red" fontSize="sm">
          {errors?.projects[index]?.projectId?.message}
        </Text>
      )}
    </FormControl>
  );
};

export default ProjectField;
