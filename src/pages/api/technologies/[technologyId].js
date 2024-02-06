import Technologies from "models/Technologies";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const handler = async (req, res) => {
  const { method, query, headers } = req;
  const id = query.technologyId;

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
          const updatedTechnology = await Technologies.update(id, name, type);
          res.status(200).json(updatedTechnology);
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
        const deletedTechnology = await Technologies.deleteById(id);
        res.status(200).json(deletedTechnology);
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
