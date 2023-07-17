import Projects from "models/Projects";

Projects.createTable();

const initializeApp = () => {
  Projects.createTable();
};

const handler = async (req, res) => {
  const projectName = req.body?.projectName,
    id = req.body?.id;

  await initializeApp();

  switch (req.method) {
    case "POST":
      if (projectName) {
        const { technologyStack, description } = req.body;

        try {
          await Projects.create(projectName, technologyStack, description);
          res.status(201).json({ message: "Project created successfully" });
        } catch (error) {
          console.error("Error creating project:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Project ID and name are required" });
      }
      break;

    case "GET":
      if (id) {
        try {
          const project = await Projects.findById(id);
          if (project) {
            res.status(200).json(project);
          } else {
            res.status(404).json({ error: "Project not found" });
          }
        } catch (error) {
          console.error("Error fetching project:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        try {
          const projects = await Projects.findAll();
          res.status(200).json(projects);
        } catch (error) {
          console.error("Error fetching projects:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      break;

    case "DELETE":
      if (id) {
        try {
          await Projects.deleteById(id);
          res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
          console.error("Error deleting project:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Project ID is required" });
      }
      break;

    case "PUT":
      if (id && projectName) {
        const { technologyStack, description } = req.body;

        try {
          await Projects.update(id, projectName, technologyStack, description);
          res.status(200).json({ message: "Project updated successfully" });
        } catch (error) {
          console.error("Error updating project:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "ID and project name are required" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
