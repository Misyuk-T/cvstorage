import Technologies from "models/Technologies";

const handler = async (req, res) => {
  const { method, query } = req;
  const id = query.technologyId;

  switch (method) {
    case "GET":
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
      break;

    case "PUT":
      const { name, type } = req.body;

      if (name && type) {
        try {
          await Technologies.update(id, name, type);
          res.status(200).json({ message: "Technology updated successfully" });
        } catch (error) {
          console.error("Error updating technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Name and type are required" });
      }
      break;

    case "DELETE":
      try {
        await Technologies.deleteById(id);
        res.status(200).json({ message: "Technology deleted successfully" });
      } catch (error) {
        console.error("Error deleting technology:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
