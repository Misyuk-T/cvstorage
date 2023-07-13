import Technologies from "models/Technologies";

Technologies.createTable();

const handler = async (req, res) => {
  const { method, body } = req;
  const id = body.id;

  switch (method) {
    case "POST":
      const name = body.name;

      if (name) {
        try {
          await Technologies.create(name);
          res.status(201).json({ message: "Technology created successfully" });
        } catch (error) {
          console.error("Error creating technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Name are required" });
      }
      break;

    case "GET":
      if (id) {
        try {
          const technology = await Technologies.findById(id);
          if (technology) {
            res.status(200).json(technology);
          } else {
            res.status(404).json({ error: "Technology not found" });
          }
        } catch (error) {
          console.error("Error fetching technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        try {
          const technologies = await Technologies.findAll();
          res.status(200).json(technologies);
        } catch (error) {
          console.error("Error fetching technologies:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      break;

    case "DELETE":
      if (id) {
        try {
          await Technologies.deleteById(id);
          res.status(200).json({ message: "Technology deleted successfully" });
        } catch (error) {
          console.error("Error deleting technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Technology ID is required" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
