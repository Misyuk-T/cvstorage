import { getAllProjects } from "src/actions/projects";

const ProjectList = ({ projects }) => {
  console.log(projects, "projects");

  return (
    <div>
      <h1>Project List</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.projectName}</h3>
          <p>Technology Stack: {project.technologyStack}</p>
          <p>Description: {project.description}</p>
          {/* Render other project information */}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const projects = await getAllProjects();
    return { props: { projects } };
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    return { props: { error: error.message, projects: [] } };
  }
}

export default ProjectList;
