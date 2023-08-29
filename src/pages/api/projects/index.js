import { createTable, findAll, create } from "models/Projects";

import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const initializeApp = async () => {
  await createTable();
};

const handler = async (req, res) => {
  await initializeApp();

  switch (req.method) {
    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS, PATCH, DELETE, POST, PUT",
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
        const projects = await findAll();
        const formattedData = projects.map((item) => {
          const technologies = item.technologyStack;

          return {
            ...item,
            technologyStack: technologies ? JSON.parse(technologies) : [],
          };
        });

        res.status(200).json(formattedData);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        res
          .status(500)
          .json({ error: `Internal Server Error: ${error.message}` });
      }
      break;

    case "POST":
      const { projectName, technologyStack, description, teamSize, link, nda } =
        req.body;
      const headers = req.headers;

      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      try {
        const newProject = await create(
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
        res
          .status(500)
          .json({ error: `Internal Server Error: ${error.message}` });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
