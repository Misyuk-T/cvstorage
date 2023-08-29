import {
  findById,
  deleteById,
  update as updateProject,
} from "/models/Projects";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const handler = async (req, res) => {
  const { method, query, headers } = req;
  const id = query.projectId;

  if (!isValidClientSecret(headers.authorization)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  switch (method) {
    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Accept",
      );
      res.status(204).end();
      break;

    case "GET":
      try {
        const project = await findById(id);
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
        const deletedProject = await deleteById(id);
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
        const updatedProject = await updateProject(
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
