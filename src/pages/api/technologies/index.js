import Technologies from "models/Technologies";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const handler = async (req, res) => {
  const { method, body, headers } = req;

  Technologies.createTable();

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

    case "POST":
      const { name, type } = body;

      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (name && type) {
        try {
          const newTechnology = await Technologies.create(name, type);
          res.status(201).json(newTechnology);
        } catch (error) {
          console.error("Error creating technology:", error.message);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(400).json({ error: "Name and type are required" });
      }
      break;

    case "GET":
      try {
        const technologies = await Technologies.findAll();
        res.status(200).json(technologies);
      } catch (error) {
        console.error("Error fetching technologies:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
