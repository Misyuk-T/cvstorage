import Projects from "models/Projects";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const initializeApp = () => {
  Projects.createTable();
};

const handler = async (req, res) => {
  await initializeApp();

  switch (req.method) {
    case "GET":
      try {
        const projects = await Projects.findAll();
        const formattedData = projects.map((item) => {
          return {
            ...item,
            technologyStack: JSON.parse(item.technologyStack),
          };
        });

        res.status(200).json(formattedData);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      const { projectName, technologyStack, description, teamSize, link, nda } =
        req.body;

      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      try {
        const newProject = await Projects.create(
          projectName,
          technologyStack,
          description,
          teamSize,
          link,
          nda,
        );
        res.status(201).json(newProject);
      } catch (error) {
        console.error("Error creating project:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;