import Projects from "models/Projects";

const handler = async (req, res) => {
  const { method, query } = req;
  const id = query.projectId;

  switch (method) {
    case "GET":
      try {
        const project = await Projects.findById(id);
        if (project) {
          res.status(200).json({
            ...project,
            technologyStack: JSON.parse(project.technologyStack),
          });
        } else {
          res.status(404).json({ error: "Project not found" });
        }
      } catch (error) {
        console.error("Error fetching project:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      try {
        const deletedProject = await Projects.deleteById(id);
        res.status(200).json(deletedProject);
      } catch (error) {
        console.error("Error deleting project:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "PUT":
      const { projectName, technologyStack, description, teamSize, link, nda } =
        req.body;

      try {
        const updatedProject = await Projects.update(
          id,
          projectName,
          technologyStack,
          description,
          teamSize,
          link,
          nda,
        );

        res.status(200).json(updatedProject);
      } catch (error) {
        console.error("Error updating project:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
