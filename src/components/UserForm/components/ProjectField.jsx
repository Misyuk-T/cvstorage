import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
  Textarea,
} from "@chakra-ui/react";

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
    setValue(`projects[${index}].projectId`, "");
    setValue(`projects[${index}].achievements`, "");
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
      <FormLabel>Project</FormLabel>
      <Controller
        name={`projects[${index}].projectId`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            options={formattedOptions}
            value={selectedProject}
            onChange={(selectedOption) => handleProjectSelect(selectedOption)}
            isClearable
            placeholder="Select a project"
          />
        )}
      />
      {errors?.projects?.[index] && (
        <FormErrorMessage>
          {errors?.projects[index]?.projectId?.message}
        </FormErrorMessage>
      )}

      {selectedProject && (
        <>
          <FormLabel>Achievements</FormLabel>
          <Textarea
            {...register(`projects[${index}].achievements`)}
            defaultValue={selectedProject.achievements}
          />
        </>
      )}

      {selectedProject && (
        <Button onClick={handleDeleteProject}>Delete Project</Button>
      )}
    </FormControl>
  );
};

export default ProjectField;
