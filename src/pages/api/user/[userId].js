import { findById, deleteById, update } from "models/User";

import { isValidClientSecret } from "@/helpers/isValidClientSecret";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const { method, query, headers } = req;
  const id = query.userId;

  switch (method) {
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
        const user = await findById(id);

        if (user) {
          res.status(200).json({
            ...user,
            socials: JSON.parse(user.socials),
            experience: JSON.parse(user.experience),
            education: JSON.parse(user.education),
            projects: JSON.parse(user.projects),
            technologyStack: JSON.parse(user.technologyStack),
          });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "PUT":
      try {
        if (!isValidClientSecret(headers.authorization)) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const {
          name,
          email,
          position,
          socials,
          description,
          experience,
          education,
          projects,
          technologyStack,
          motivation,
          cvType,
          grade,
          workDirection,
          isEnabled,
        } = req.body;

        const updatedUser = await update(
          id,
          name,
          position,
          email,
          JSON.parse(socials),
          description,
          JSON.parse(experience),
          JSON.parse(education),
          JSON.parse(projects),
          JSON.parse(technologyStack),
          motivation,
          cvType,
          grade,
          workDirection,
          isEnabled === "true" ? 1 : 0,
        );

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "DELETE":
      if (!isValidClientSecret(headers.authorization)) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      try {
        await deleteById(id);

        res.status(200).json({ id });
      } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
};

export default handler;
