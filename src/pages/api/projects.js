import Projects from "models/Projects";

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
        console.error("Error fetching technologies:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      const { projectName, technologyStack, description } = req.body;

      try {
        await Projects.create(projectName, technologyStack, description);
        res.status(201).json({ message: "Project created successfully" });
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
