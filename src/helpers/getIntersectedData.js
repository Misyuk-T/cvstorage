export const getIntersectedTechnologies = (skillList, technologyStack = []) => {
  const technologyMap = new Map(
    technologyStack.map((tech) => [tech.technologyId, tech]),
  );

  const intersectedTechnologies = skillList
    ?.filter((skill) => technologyMap.has(skill.id.toString()))
    .map((skill) => ({
      ...skill,
      level: technologyMap.get(skill.id.toString()).level,
    }));

  return intersectedTechnologies || [];
};

export const getIntersectedProjects = (
  projectList,
  projects = [],
  technologies = [],
) => {
  const projectMap = new Map(
    projects.map((project) => [project.projectId, project]),
  );

  const intersectedProjects = projectList
    ?.filter((projectItem) => projectMap.has(projectItem.id.toString()))
    .map((item) => {
      const projectId = item.id.toString();
      const projectData = projectMap.get(projectId);

      const technologyNames = item.technologyStack.map((techId) => {
        const technology = technologies.find((tech) => tech.id === techId);
        return technology ? technology.name : "";
      });

      return {
        ...item,
        role: projectData.role,
        achievements: projectData.achievements,
        technologyStack: technologyNames,
      };
    });

  return intersectedProjects || [];
};
