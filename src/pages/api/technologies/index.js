import Technologies from "models/Technologies";
import { isValidClientSecret } from "@/helpers/isValidClientSecret";

const initializeApp = () => {
  Technologies.createTable();
};

const handler = async (req, res) => {
  await initializeApp();

  const { method, body, headers } = req;

  switch (method) {
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
