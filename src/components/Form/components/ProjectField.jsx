import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const ProjectField = ({
  control,
  register,
  setValue,
  getValues,
  errors,
  removeProject,
  projectOptions,
  index,
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const projects = getValues("projects");
    const selectedProjectId = projects[index]?.projectId;
    const selectedProject = projectOptions.find(
      (project) => project.value === selectedProjectId,
    );
    setSelectedProject(selectedProject);
  }, [projectOptions, index, getValues]);

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
            options={projectOptions}
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
          <textarea
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
